import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    }, 
}, {
        timestamps: true,
        collection: 'managementdata'
    
})

export const User = mongoose.models.managementdata || mongoose.model('managementdata', userSchema);


