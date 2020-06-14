import {Button, Result} from "antd";
import React from "react";

const error404 = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button href={'/'} type="primary">Back Home</Button>}
        />
    )
};

const error500 = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button href={'/'} type="primary">Back Home</Button>}
        />
    )
};

export {error404, error500};
