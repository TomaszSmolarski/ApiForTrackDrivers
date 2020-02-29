var request = require('request-promise');

api_route = async (locations)=>{

const url = process.env.API_URL+"?key="+
process.env.API_KEY+"&json="+JSON.stringify(locations); 
try{
    const res = await request(url)
    return JSON.parse(res);
}catch(err){console.log(err); return -1}


}
locationsList = (transit)=>{
    const list = [...transit.addresses_between];
    list.unshift(transit.source_address)
    list.push(transit.destination_address)
        const locations = {
            locations: list
        }
    return locations;
}

module.exports = {api_route,locationsList};