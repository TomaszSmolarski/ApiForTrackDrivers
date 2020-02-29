const Transit = require('./model'); 
const User= require('../users/model'); 
const {createValidation, updateValidation} = require('./validation')
const {api_route, locationsList} = require("../../routing_functions/route_api")
const create = async (req,res)=>{
    const {error} = createValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    locations = await locationsList(req.body)
    const api_routing = await api_route(locations);
    if (api_routing.info.messages.length) return res.status(400).json(api_routing.info.messages[0])
    const total_distance = api_routing.route.distance;

    try{
    const user = await User.findOne({_id: req.user});
    const transit = new Transit({

        user_id: user,
        source_address: req.body.source_address,
        destination_address: req.body.destination_address,
        addresses_between: req.body.addresses_between,
        price: req.body.price,
        date: req.body.date,
        total_distance: total_distance
    });
    
    
        const savedTransit = await transit.save();
        res.status(201).json(savedTransit)

    }catch(err){
        res.status(404).json(err.message);
    }
};

const index = async (req,res)=>{
    try{
        const user = await User.findOne({_id: req.user});
        if(user){
        transits = await Transit.find({user_id: user._id})
        res.status(200).json(transits);
        }else{ return res.status(404).send("User not found")}
        }catch(err){
            res.json(err.message);
        }

};

const show = async (req,res)=>{
    try{ 
        const user = await User.findOne({_id: req.user});
        if(user){
        const transit = await Transit.findOne({_id: req.params.ID, user_id: user._id })
        if(transit) return res.status(200).json(transit);
        return res.status(404).send("Transit Not Found")
        }else{ return res.status(404).send("User not found")}
    }catch(err){
        res.json(err.message);
    }
};

const stat = async (req, res)=>{
    start_date = new Date(req.query.start_date);
    end_date = new Date(req.query.end_date);

    if(start_date == "Invalid Date" || end_date == "Invalid Date" || 
    end_date.getTime() - start_date.getTime()<0 ) 
    return res.status(400).send("Invalid Date type");
    const user = await User.findOne({_id: req.user});
    try{
    stats = await Transit.aggregate([
        { $match: {user_id: user._id, date: {$gte: start_date, $lte: end_date} } },
        { $group: {_id: null, total_distance: { $sum: "$total_distance" }, total_price: {$sum: "$price"} }}]
    )
    res.status(200).json(stats);
}catch(err){res.json(err.message);}
};

const update = async (req,res)=>{

    const {error} = updateValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const user = await User.findOne({_id: req.user});
        if(user){
        const transit = await Transit.findOne({_id:req.params.transitID,user_id: user._id}) 
        if (transit) {
        
            if(req.body.addresses_between.length){transit.addresses_between = req.body.addresses_between};
            if(req.body.source_address){transit.source_address = req.body.source_address};
            if(req.body.destination_address){transit.destination_address = req.body.destination_address};
            if(req.body.price){transit.price = req.body.price};
            if(req.body.date){transit.date = req.body.date};
            const locations = await locationsList(transit);
            const api_routing = await api_route(locations);
            if (api_routing.info.messages.length){return res.status(400).json(api_routing.info.messages[0])}
            const total_distance = api_routing.route.distance;
            transit.total_distance = total_distance;
            transit.save();
            res.json(transit);
        }else {
            return res.status(404).send("Transit not found");
        }
    }else {
        return res.status(404).send("User not found");
    }
        
    }catch(err){
        res.send(err.message);
    }
};

const destroy = async (req,res)=>{

    try{ 
        const user = await User.findOne({_id: req.user});
        removedTransit = await Transit.findOneAndUpdate({_id:req.params.transitID,user_id: user._id},           
            {$set: {    
            user_id: null}}
            )
        res.status(200).json(removedTransit);
    }catch(err){
        res.json(err.message);
    }
};


module.exports = {
    create, index, show, stat, update, destroy
};