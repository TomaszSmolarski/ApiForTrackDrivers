const {api_route} = require("../../routing_functions/route_api");
const Transit = require("../transits/model");

const show = async (req,res)=>{

        transits = await Transit.aggregate([
        { $match: {} },
        { $group: {_id: null, total_distance: { $sum: "$total_distance" }, total_price: {$sum: "$price"} }}]
    )

    const locations = req.body;
    const api_routing = await api_route(locations);
    if (api_routing.info.messages.length) return res.status(400).json(api_routing.info.messages[0])
    const total_distance = api_routing.route.distance;
    const price = total_distance*transits[0]["total_price"]/transits[0]["total_distance"];
    if(price=="NaN") price=total_distance*4;
    try{

    const route = {
        source_address: locations["locations"].shift(),
        destination_address: locations["locations"].pop(),
        addresses_between: locations["locations"],
        total_distance: total_distance,
        predicted_price: price
    };
    res.json(route);
    }catch(err){
        res.status(400).json(err.message);}
};

module.exports = {show};