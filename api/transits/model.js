const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {api_route, locationsList} = require("../../routing_functions/route_api")

const TransitSchema = mongoose.Schema({

    user_id: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true

    },
    source_address: {
        type: String,
        required: true    
    },
    addresses_between: {
        type: [String],
        require: false
    },
    destination_address: {
        type: String,
        required: true    
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    total_distance: {
        type: Number,
        min: 0
    }
}
, {
    toJSON: {
        transform: (obj, ret) => {
            delete ret['__v'];          
            delete ret['user_id'];
            
        }
    },
    toObject: {
        transform: (obj, ret) => {
            delete ret['__v'];           
            delete ret['user_id'];
            
        }
    }
});

module.exports = mongoose.model('transit',TransitSchema);