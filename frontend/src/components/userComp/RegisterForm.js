import React from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Divider, Form, Input, notification} from "antd";
import API from '../../services/api'
import {WithMenuView} from "../../views";

export const RegisterForm = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleOnFinish = (values) => {
        API.post('/users/register', values)
            .then(response => {
                history.push('/login')
            })
            .catch(errInfo => {
                if (errInfo.response.status === 409) {
                    notification['error']({
                        message: 'Registration Error!',
                        description: 'The username already exists'
                    })
                } else {
                    notification['error']({
                        message: 'Registration Error!',
                        description: 'Bad credentials. Please register again.'
                    })
                }
            })
    };

    return (
        <WithMenuView routeName="Register">
            <>
                <Card title='Registration Form'>
                    <Form form={form} onFinish={handleOnFinish}>
                        <Divider>Username</Divider>
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username with at least 6 signs!',
                                           min: 6
                                       },
                                   ]}>
                            <Input placeholder='Username'/>
                        </Form.Item>
                        <Divider>Email</Divider>
                        <Form.Item name='email'
                                   rules={[
                                       {
                                           type: 'email',
                                           required: true,
                                           message: 'Please input your email!'
                                       }
                                   ]}>
                            <Input placeholder='Email'/>
                        </Form.Item>
                        <Divider>Password</Divider>
                        <Form.Item name='password'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!'
                                       },
                                       {
                                           pattern: "^(?=.*[a-z])(?=.*[A-Z]).{6,}$",
                                           message: 'Small and big letters, 6 chars or longer'
                                       },
                                   ]}>
                            <Input type='password' placeholder='Password'/>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Register</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </>
        </WithMenuView>
    )
};
