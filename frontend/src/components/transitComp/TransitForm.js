import React from 'react'
import {Button, Card, Col, Divider, Form, Input, Row} from "antd";
import {LocationsForm} from "../routeComp/LocationsForm";


export const TransitForm = ({
                                handleChange, handleSubmit, transit,
                                submitButtonText, handleLocationChange, loading
                            }) => {

    const [form] = Form.useForm();
    return (
        <>
            <LocationsForm handleChange={handleLocationChange} locations={transit.locations} loading={loading}/>
            <Card>
                <Form form={form} onFinish={handleSubmit}>
                    <Divider>Date</Divider>
                    <Form.Item key="date"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input date!'
                                   },
                               ]}>
                        <Input placeholder="date"
                               name="date"
                               type="date"
                               value={transit.date}
                               onChange={handleChange}
                        />
                    </Form.Item>
                    <Divider>Price</Divider>
                    <Form.Item key="price"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input price!'
                                   },
                               ]}>
                        <Input placeholder="price"
                               name="price"
                               type="number"
                               value={transit.price}
                               onChange={handleChange}
                        />

                    </Form.Item>
                    <Divider/>
                    <Row>
                        <Col span={14} offset={5}>
                            <Button block type='primary' htmlType='submit' loading={loading}>{submitButtonText}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
};
