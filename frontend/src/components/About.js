import React from "react";
import {WithMenuView} from "../views";
import {Card, Col, Row} from "antd";

export const About = () => {
    return (
        <WithMenuView routeName="About">
            <>
                <Card>
                    <Row>
                        <Col>
                            About Page
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
