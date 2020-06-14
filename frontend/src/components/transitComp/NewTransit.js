import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import API from "../../services/api";
import {notification} from "antd";
import {TransitForm} from "./TransitForm";
import {WithMenuView} from "../../views";
import Cookies from "js-cookie";


export const NewTransit = (props) => {

    const [transit, setTransit] = useState({
        locations: [{city: "", street: "", number: ""}, {city: "", street: "", number: ""}], date: "", price: 0
    });
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = () => {
        let newLocations = transit.locations.filter((value, index, arr) => value.city !== "");
        newLocations = newLocations.map(value => {
            if (value.street !== "") {
                return value.city + " " + value.street + " " + value.number
            }
            return value.city;
        });
        const newTransit = {
            locations: newLocations,
            date: transit.date,
            price: transit.price
        };

        if (newTransit.locations.length < 2) {
            notification['error']({
                message: 'Adding Error!',
                description: 'There must be at least 2 places'
            });
            return;
        }
        setLoading(true);
        API.post('/transits', newTransit)
            .then(response => {
                history.push('/list')
            })
            .catch(errInfo => {
                if (errInfo.response.status === 401) {
                    Cookies.remove("jwt2");
                    history.push("/login");
                }
                if (errInfo.response.status === 400) {
                    notification['error']({
                        message: 'Adding Error!',
                        description: 'Bad credentials in form'
                    })
                }
            });
        setLoading(false);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setTransit(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleLocationChange = (index, value) => {

        const locations = [...transit.locations];
        if (index === -1) {
            locations.push({city: "", street: "", number: ""})
        } else if (value === "remove" && locations.length > 2) {
            locations.splice(index, 1);
        } else {
            const type = Object.keys(value);
            locations[index][type[0]] = value[type[0]].trim();
        }
        setTransit(prevState => ({
            ...prevState, locations: locations
        }));
    };

    return (
        <WithMenuView routeName="New Transit">
            <>
                <TransitForm
                    handleChange={handleChange}
                    transit={transit}
                    handleSubmit={handleSubmit}
                    submitButtonText={"Add Transit"}
                    handleLocationChange={handleLocationChange}
                    loading={loading}
                />
            </>
        </WithMenuView>
    )
};
