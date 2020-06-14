import React, {useEffect, useState} from 'react'
import API from '../../services/api'
import {useParams, useHistory} from "react-router-dom";
import {Button, Card, Col, Divider, notification, Row} from "antd";
import {TransitForm} from "./TransitForm";
import {WithMenuView} from "../../views";
import Cookies from "js-cookie";


export const EditTransit = () => {
    const [transit, setTransit] = useState({
        locations: [{city: "", street: "", number: ""}, {city: "", street: "", number: ""}], date: "", price: 0
    });
    const {id} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState([false, false]);

    useEffect(() => {
        if (id) {
            API.get(`/transits/byID/${id}`)
                .then((response) => {
                    const newDate = response.data.date;

                    const source_address = response.data.source_address.split(" ", 3);
                    if (source_address.length === 1) {
                        source_address.push("");
                        source_address.push("")
                    } else if (source_address.length === 2) {
                        source_address.push("")
                    }

                    const destination_address = response.data.destination_address.split(" ", 3);
                    if (destination_address.length === 1) {
                        destination_address.push("");
                        destination_address.push("")
                    } else if (destination_address.length === 2) {
                        destination_address.push("")
                    }

                    let addresses_between = response.data.addresses_between;
                    addresses_between = addresses_between.map(value => {
                        const v = value.split(" ");
                        if (v.length === 1) {
                            v.push("");
                            v.push("")
                        } else if (v.length === 2) {
                            v.push("")
                        }
                        return {city: v[0], street: v[1], number: v[2]}
                    });

                    const locations = [
                        {city: source_address[0], street: source_address[1], number: source_address[2]},
                        ...addresses_between,
                        {city: destination_address[0], street: destination_address[1], number: destination_address[2]}

                    ];
                    setTransit({...response.data, date: newDate.slice(0, 10), locations: locations});
                })
                .catch(errInfo => {
                    history.push('/');
                })
        }
    }, [id, history]);

    const handleDelete = () => {
        setLoading([false, true]);
        API.delete(`/transits/${id}`)
            .then((response) => history.push('/list'))
            .catch((errInfo) => {
                if (errInfo.response.status === 401) {
                    Cookies.remove("jwt2");
                    history.push("/login");
                }
            });
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setTransit(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleLocationChange = (index, value) => {

        const locations = [...transit.locations];
        if (index === -1) {
            locations.push({city: "", street: "", number: ""})
        } else if (value === "remove" && locations.length > 2) {
            locations.splice(index, 1);
        } else {
            const type = Object.keys(value);
            locations[index][type[0]] = value[type[0]].trim();
        }
        setTransit(prevState => ({
            ...prevState, locations: locations
        }));
    };

    const handleEditTransit = () => {
        setLoading([true, false]);
        let newLocations = transit.locations.filter((value, index, arr) => value.city !== "");
        newLocations = newLocations.map(value => {
            if (value.street !== "") {
                return value.city + " " + value.street + " " + value.number
            }
            return value.city;
        });
        if (newLocations.length < 2) {
            notification['error']({
                message: 'Edit Error!',
                description: 'There must be at least 2 places'
            });
            return;
        }
        const newTransit = {
            source_address: newLocations.shift(),
            destination_address: newLocations.pop(),
            addresses_between: newLocations,
            date: transit.date,
            price: transit.price
        };

        API.patch(`/transits/${id}`, newTransit)
            .then(response => {
                history.push('/list')
            })
            .catch(errInfo => {
                if (errInfo.response.status === 401) {
                    Cookies.remove("jwt2");
                    history.push("/login");
                }
                if (errInfo.response.status === 400) {
                    notification['error']({
                        message: 'Adding Error!',
                        description: 'Bad credentials in form'
                    })
                }
            });
    };
    return (
        <WithMenuView routeName="Transit">
            <>
                <TransitForm
                    handleChange={handleChange}
                    transit={transit}
                    handleSubmit={handleEditTransit}
                    submitButtonText={"Edit Transit"}
                    handleLocationChange={handleLocationChange}
                    loading={loading[0]}
                />
                <Card>
                    <Divider>Total Distance</Divider>
                    <p>{transit.total_distance} miles</p>
                    <Divider/>
                    <Row>
                        <Col span={14} offset={5}>
                            <Button block type='primary' onClick={handleDelete} loading={loading[1]}>Delete</Button>
                        </Col>
                    </Row>
                </Card>
            </>
        </WithMenuView>
    )
};







