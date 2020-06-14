import React from "react";
import {Card, Col, Row} from 'antd';
import {WithMenuView} from "../views";

export const Home = () => {
    return (
        <WithMenuView routeName="Home">
            <>
                <Card>
                    <Row>
                        <Col>
                            Home Page
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Truck API
                        </Col>
                    </Row>
                </Card>
            </>
        </WithMenuView>
    );
}
