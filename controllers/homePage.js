//post 
const Post = require('../database/models/Article')

module.exports =  async (req,res)=>{

    const posts = await Post.find({}) 

    console.log(req.session);
    
        res.render("index",{posts}
        )}