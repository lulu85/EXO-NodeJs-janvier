const User = require('../database/models/User')


module.exports = (req,res,next)=>{

    // connecte toi dans la base de donnée
    User.findById(req.session.userId, (err,user)=>{
        if(err || !user) {
            return res.redirect('/')
        }
        next()
    })
    // vérifie le user

    // si il est dans la base de donnée

    // sinon tu le rediriges

}