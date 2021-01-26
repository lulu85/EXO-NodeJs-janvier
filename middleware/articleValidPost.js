module.exports = (req,res,next)=>{
    if (!req.files || !req.body.title ){
        return res.redirect('/')
    }
    next()
}