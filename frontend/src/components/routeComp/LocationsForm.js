import React from 'react'
import {Button, Card, Col, Divider, Form, Input, Row} from "antd";


export const LocationsForm = ({handleChange, handleSubmit, locations, loading}) => {
    const [form] = Form.useForm();

    const handleAddFields = () => {
        if (locations.length < 20)
            handleChange(-1, "add");
    };

    const handleRemoveFields = index => {
        handleChange(index, "remove");
    };
    return (
        <>
            <Card>
                <div>
                    <Form form={form}>
                        {locations.map((inputField, index) => (
                            <Card key={`${index}+div`}>
                                <Divider>Place {index}</Divider>
                                <Row>
                                    <Col xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}}
                                         md={{span: 8, offset: 0}}>
                                        <Form.Item key={`${index}+city`}>
                                            <Input placeholder={`City ${index}`}
                                                   type="text"
                                                   id={index}
                                                   value={locations[index].city}
                                                   onChange={(event) => handleChange(event.target.id,
                                                       {city: event.target.value})}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}}
                                         md={{span: 8, offset: 0}}>
                                        <Form.Item key={`${index}+Street`}>

                                            <Input placeholder={`Street ${index}`}
                                                   type="text"
                                                   id={index}
                                                   value={locations[index].street}
                                                   onChange={(event) => handleChange(event.target.id, {street: event.target.value})}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={{span: 24, offset: 0}} sm={{span: 24, offset: 0}}
                                         md={{span: 8, offset: 0}}>
                                        <Form.Item key={`${index}+number`}>

                                            <Input placeholder={`Street ${index} Number`}
                                                   type="number"
                                                   id={index}
                                                   value={locations[index].number}
                                                   onChange={(event) => handleChange(event.target.id, {number: event.target.value})}
                                            />

                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button type='button' onClick={() => handleRemoveFields(index)}>-</Button>
                            </Card>
                        ))}
                        <Button type='button' onClick={() => handleAddFields()}>+</Button>
                        <Divider/>
                        {typeof handleSubmit !== "undefined" &&
                        <Row>
                            <Col xs={{span: 14, offset: 5}} lg={{span: 6, offset: 9}}>
                                <Button block type='primary' onClick={handleSubmit} loading={loading}>Submit</Button>
                            </Col>
                        </Row>
                        }
                    </Form>
                </div>
            </Card>
        </>
    )
};
