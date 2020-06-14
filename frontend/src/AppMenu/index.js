import {Col, Layout, Menu, Row} from "antd";
import {Link} from "react-router-dom";
import React from "react";
import {
    FormOutlined,
    HomeOutlined,
    BorderOuterOutlined,
    LoginOutlined,
    LogoutOutlined,
    InfoCircleOutlined,
    UserOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';

const menuItem = (icon, path, text) => {
    return (
        <Menu.Item key={path}>
            <Link to={path}>
                <Layout style={{backgroundColor: "#ffffff", color: "#000000"}}>
                    <Row>
                        <Col xs={{offset: 1}} lg={{offset: 1}}>
                            <span>{icon}</span>
                        </Col>
                        <Col>
                            <span>{text}</span>
                        </Col>
                    </Row>
                </Layout>
            </Link>
        </Menu.Item>
    )
};

const LoggedMenu = () => {
    return (
        <Menu theme={'dark'}>
            {menuItem(<HomeOutlined/>, "/", "Home")}
            {menuItem(<UserOutlined/>, "/me", "Me")}
            {menuItem(<BorderOuterOutlined/>, "/list", "Transits")}
            {menuItem(<FormOutlined/>, "/route", "Route")}
            {menuItem(<InfoCircleOutlined/>, "/about", "About")}
            {menuItem(<LogoutOutlined/>, "/logout", "Logout")}
        </Menu>
    )
};
const LogoutMenu = () => {
    return (
        <Menu theme={'dark'}>
            {menuItem(<HomeOutlined/>, "/", "Home")}
            {menuItem(<FormOutlined/>, "/route", "Route")}
            {menuItem(<InfoCircleOutlined/>, "/about", "About")}
            {menuItem(<LoginOutlined/>, "/login", "Login")}
            {menuItem(<PlusCircleOutlined/>, "/register", "Register")}
        </Menu>
    )
};

export {LoggedMenu, LogoutMenu}
