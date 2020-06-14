const {api_route} = require("../../routing_functions/route_api");
const Transit = require("../transits/model");

const show = async (req, res) => {
    let transits = await Transit.aggregate([
        {$match: {}},
        {$group: {_id: null, total_distance: {$sum: "$total_distance"}, total_price: {$sum: "$price"}}}]
    );
    var a = req.query.locations;
    a = a.replace(/'/g, '"');
    a = JSON.parse(a);

    const locations = {
        locations: a
    };
    console.log(locations);

    const api_routing = await api_route(locations);
    if (api_routing.info.messages.length) return res.status(400).json(api_routing.info.messages[0]);
    const total_distance = api_routing.route.distance;
    let price = total_distance * transits[0]["total_price"] / transits[0]["total_distance"];
    if (price === "NaN") price = total_distance * 4;
    if (total_distance === 0) return res.status(400).send("Wrong places distance = 0");
    try {

        const route = {
            source_address: locations["locations"].shift(),
            destination_address: locations["locations"].pop(),
            addresses_between: locations["locations"],
            total_distance: total_distance,
            predicted_price: price
        };
        await res.json(route);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

module.exports = {show};
