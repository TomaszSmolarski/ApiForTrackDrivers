import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import API from '../../services/api'
import {Button, Card, Col, DatePicker, Divider, Modal, Row} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.less';
import './rangePicker.css';
import {WithMenuView} from "../../views";
import Cookies from "js-cookie";
import {ArrowRightOutlined} from '@ant-design/icons';

const {RangePicker} = DatePicker;


const TransitItem = ({transit}) => {
    const transitDate = new Date(transit.date);
    const date = `${transitDate.getDate()}-${transitDate.getMonth()}-${transitDate.getFullYear()}`;
    const [visible, setVisible] = useState(false);

    return (
        <>

            <Col xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}} md={{span: 12, offset: 0}}
                 lg={{span: 8, offset: 0}} xxl={{span: 6, offset: 0}}>
                <Button style={{height: "auto", wordWrap: "break-word", whiteSpace: "normal", color: "forestgreen"}}
                        block onClick={() => setVisible(true)}>
                    {transit.source_address.split(" ", 1)}
                    <ArrowRightOutlined/> {transit.destination_address.split(" ", 1)}
                    <p style={{color: "red"}}>{date}</p>
                </Button>
            </Col>


            <Modal
                okButtonProps={{href: `/transit/${transit._id}`}}
                title="Transit"
                visible={visible}
                onCancel={() => setVisible(false)}
                okText="Edit"
                cancelText="Cancel"
            >
                <p>Source address: {transit.source_address}</p>
                {transit.addresses_between.length > 0 &&
                <>
                    <p>Addresses between:</p>
                    <ol>
                        {transit.addresses_between.map((address, index) =>
                            <li key={address + index}>{address}</li>)}
                    </ol>
                </>
                }
                <p>Destination address: {transit.destination_address}</p>
                <p>Date: {date}</p>
                <p>Price: {transit.price}$</p>
                <p>Distance: {transit.total_distance} miles</p>
            </Modal>
        </>
    )
};


const useStats = ({min_date, max_date}) => {
    const [stats, setStats] = useState();
    const [transits, setTransits] = useState([]);
    const history = useHistory();

    useEffect(() => {
        API.get('/transits/stats', {params: {start_date: min_date, end_date: max_date}})
            .then((response) => {
                setStats(response.data.stats[0]);
                setTransits(response.data.transits);
            }).catch((errInfo => {
            if (errInfo.response.status === 401) {
                Cookies.remove("jwt2");
                history.push("/login");
            }
        }));
    }, [min_date, max_date, history]);

    return (
        {
            stats: stats,
            transits: transits
        }
    );
};


export const TransitsList = () => {
    const [dateRange, setDateRange] = useState();
    const [dates, setDates] = useState([]);
    const history = useHistory();
    const dateFormat = 'YYYY-MM-DD';
    const {stats, transits} = useStats({min_date: dates[0], max_date: dates[1]});

    useEffect(() => {
        API.get('/transits')
            .then((response) => {
                const apiDates = response.data.dates[0];
                if (typeof (apiDates) !== 'undefined') {
                    setDateRange(apiDates);
                    setDates([apiDates.min_date, apiDates.max_date]);
                }
            })
            .catch((errInfo => {
                if (errInfo.response.status === 401) {
                    localStorage.removeItem("logged");
                    history.go();
                }
            }))
    }, [history]);

    const disabledDate = current => {
        const tooLate = current > moment(dateRange.max_date);
        const tooEarly = current < moment(dateRange.min_date);
        return tooEarly || tooLate;
    };

    return (
        <WithMenuView routeName="Transits">
            <>
                <Card>
                    <Row>
                        <Col span={14} offset={5}>
                            <Button type={'primary'} block href={`/transit/new`} style={{overflowWrap: "normal"}}>add
                                new transit</Button>
                        </Col>
                    </Row>
                    {typeof (dateRange) !== 'undefined' &&
                    <>
                        <Divider>
                            Transits Date Range
                        </Divider>
                        <RangePicker

                            allowClear={false}
                            disabledDate={disabledDate}
                            value={[moment(dates[0], dateFormat), moment(dates[1], dateFormat)]}
                            format={dateFormat}
                            onCalendarChange={(dates, dateStrings) => {
                                setDates(dateStrings);
                            }}
                        />
                        <Divider/>
                    </>}
                    {dates.length > 0 &&
                    <>
                        {transits.length > 0 &&
                        <Row>
                            {transits.map(transit => <TransitItem key={transit._id} transit={transit}/>)}
                        </Row>}
                        {typeof (stats) !== 'undefined' &&
                        <>
                            <Divider>Total distance</Divider>
                            <p>{stats.total_distance} miles</p>
                            <Divider>Total price</Divider>
                            <p>{stats.total_price}$</p>
                            <Divider>Price per mile</Divider>
                            <p>{stats.total_price / stats.total_distance}$</p>
                        </>}
                    </>}
                </Card>
            </>
        </WithMenuView>
    )

};
