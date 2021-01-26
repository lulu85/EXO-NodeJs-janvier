const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,'Le nom est obligatoire']
    },
    email: {
        type: String,
        required: [true,'Le mail est obligatoire'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Le mot de pass est obligatoire']
    },   
})

UserSchema.pre('save', function (next){
    const user = this
    
    bcrypt.hash(user.password, 10, (err,encrypted) =>{
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)