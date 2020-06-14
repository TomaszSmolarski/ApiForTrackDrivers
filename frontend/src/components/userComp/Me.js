import React, {useEffect, useState} from 'react'
import API from '../../services/api'
import {Button, Card, Divider, Form, Input} from "antd";
import {useHistory} from 'react-router-dom'
import {WithMenuView} from "../../views";
import Cookies from "js-cookie";


export const Me = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [user, setUser] = useState({name:"", createdAt:""});

    useEffect(() => {

        API.get('users/me')
            .then((response) => {

                setUser(response.data);
            })
            .catch((errInfo) => {
                if (errInfo.response.status === 401) {
                    Cookies.remove("jwt2");
                    history.push("/login");
                }
            })
    }, [history]);


    const handleOnFinish = (values) => {

        API.patch(`/users`, {password: values.password})
            .then((result) => {
                history.push("/");
            })
            .catch((errInfo) => {
                if (errInfo.response.status === 401) {
                    Cookies.remove("jwt2");
                    history.push("/login");
                }
            })
    }

    return (
        <WithMenuView routeName="Me">
            <Card>
                <Divider>Name</Divider>
                <p>{user.name}</p>
                <Divider>Date of create account</Divider>
                <p>{user.createdAt.slice(0,10)}</p>
                <Form form={form} onFinish={handleOnFinish}>
                    <Form.Item name='password'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your new password!'
                                   },
                                   {
                                       min: 6,
                                       message: 'Password must be minimum 6 characters.'
                                   },
                               ]}>
                        <Input type='password' placeholder='New Password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Change password</Button>
                    </Form.Item>
                </Form>
            </Card>
        </WithMenuView>
    );
};
