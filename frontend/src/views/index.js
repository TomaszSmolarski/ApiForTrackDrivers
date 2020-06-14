import React from 'react';
import {Layout, Avatar, Divider} from 'antd'
import {LoggedMenu, LogoutMenu} from '../AppMenu'
import trackLogo from "../icons/logo.png"
import Cookies from 'js-cookie';
import "./sider.css"
import './divider.css'

const {Content, Sider, Footer, Header} = Layout;


const WithMenuView = ({children, routeName}) => {
    return (
        <Layout style={{minHeight: '100vh', minWidth: '400px', overflow: "none"}}>
            <Sider
                style={{borderRightStyle: "inset", borderRightColor: "#ffffff", borderRightWidth: '1px'}}
                theme={"dark"}
                collapsible
                breakpoint="md"
                collapsedWidth={0}
            >
                <Layout style={{backgroundColor: "#131629", alignItems: "center"}}>
                    <Avatar size="large" src={trackLogo} style={{position: "relative", top: "11px"}}/>
                    <Divider/>
                </Layout>
                {Cookies.get('jwt2') ?
                    <LoggedMenu/> : <LogoutMenu/>}
            </Sider>
            <Layout style={{backgroundColor: "#595959"}}>
                <Header style={{
                    textAlign: 'center', color: "#ffffff", fontSize: 24, backgroundColor: "#131629",
                    borderBottomStyle: "inset", borderBottomColor: "#ffffff", borderBottomWidth: '1px'
                }}>
                    {routeName}
                </Header>
                <Content>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{
                    textAlign: 'center', color: "#ffffff", backgroundColor: "#131629",
                    borderTopStyle: "solid", borderTopColor: "#ffffff", borderTopWidth: '1px'
                }}>
                    API for Truck Drivers designed by Tomasz Smolarski
                </Footer>
            </Layout>
        </Layout>
    )
};

export {WithMenuView};
