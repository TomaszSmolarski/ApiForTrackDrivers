import React, {useState} from 'react'
import API from '../../services/api'
import {Card, Divider, notification} from "antd";
import {LocationsForm} from "./LocationsForm";
import {WithMenuView} from '../../views'

export const RouteF = () => {
    const [apiData, setApiData] = useState({source_address: ""});
    const [locations, setLocations] = useState([{city: "", street: "", number: ""}, {
        city: "",
        street: "",
        number: ""
    }]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        let newLocations = locations.filter((value, index, arr) => value.city !== "");
        newLocations = newLocations.map(value => {
            if (value.street !== "") {
                return value.city.trim() + " " + value.street.trim() + " " + value.number.trim()
            }
            return value.city;
        });

        if (newLocations[0] === "" || newLocations[1] === "" || newLocations.length === 0) {
            notification['error']({
                message: 'Routing Error!',
                description: 'There must be at least 2 places'
            });
            return;
        }
        setLoading(true);

        API.get('/route?locations=' + JSON.stringify(newLocations))
            .then((response) => {
                setApiData(response.data);
                setLoading(false);
            }, (error) => {
                setLoading(false);
                if (error.response.status === 400) {
                    notification['error']({
                        message: 'Route Error!',
                        description: 'Bad credentials'
                    })
                }
            });
    };

    const handleChange = (index, value) => {
        const values = [...locations];
        if (index === -1) {
            values.push({city: "", street: "", number: ""})
        } else if (value === "remove" && locations.length > 2) {
            values.splice(index, 1);
        } else {
            const type = Object.keys(value);
            values[index][type[0]] = value[type[0]];
        }
        setLocations(values);
    };

    return (
        <WithMenuView routeName="Route">
            <>
                <LocationsForm handleChange={handleChange} handleSubmit={handleSubmit} locations={locations}
                               loading={loading}/>

                {apiData.source_address.length > 0 &&
                <Card title='Result'>
                    <Divider>Source address</Divider>
                    <p>{apiData.source_address}</p>
                    <Divider>Addresses between</Divider>
                    {apiData.addresses_between.length > 0 &&
                    <>
                        <ol>
                            {apiData.addresses_between.map((address, index) =>
                                <li key={address + index}>{address}</li>)}
                        </ol>
                    </>
                    }
                    <Divider>Destination address</Divider>
                    <p>{apiData.destination_address}</p>
                    <Divider>Predicted price</Divider>
                    <p>{apiData.predicted_price}$</p>
                    <Divider>Total distance</Divider>
                    <p>{apiData.total_distance} miles</p><br/>
                </Card>
                }
            </>
        </WithMenuView>
    )
};
