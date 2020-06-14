let request = require('request-promise');

api_route = async (locations) => {
    const url = process.env.API_URL + "?key=" +
        process.env.API_KEY + "&json=" + JSON.stringify(locations);
    try {
        const res = await request(url);
        return JSON.parse(res);
    } catch (err) {
        console.log(err);
        return -1
    }


};

locationsList = (transit) => {
    const list = [
        transit.source_address,
        ...transit.addresses_between,
        transit.destination_address
    ];
    return {
        locations: list
    };
};
module.exports = {api_route, locationsList};
