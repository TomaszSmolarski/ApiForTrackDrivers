import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button, Card, Divider, Form, Input, notification} from "antd";
import API from '../../services/api'
import {WithMenuView} from "../../views";
import Cookies from "js-cookie";

export const LoginForm = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    Cookies.remove("jwt2");
    const handleOnFinish = (values) => {

        API.post('/users/login', values)
            .then(response => {
                history.push('/');
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Login Error!',
                    description: 'Bad credentials. Please login again.'
                })
            })
    };
    return (
        <WithMenuView routeName="Login">
            <>
                <Card title='Login Form'>
                    <Form form={form} onFinish={handleOnFinish}>
                        <Divider>Username</Divider>
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!'
                                       },
                                   ]}>
                            <Input placeholder='Username'/>
                        </Form.Item>
                        <Divider>Password</Divider>
                        <Form.Item name='password'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!'
                                       },
                                   ]}>
                            <Input type='password' placeholder='Password'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Login</Button>
                        </Form.Item>
                    </Form>
                    <Link to="/register">
                        sign up
                    </Link>
                </Card>
            </>
        </WithMenuView>
    )
}
