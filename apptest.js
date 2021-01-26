const mongoose = require('mongoose')
const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test', {useNewUrlParser: true,useUnifiedTopology: true})
/*
Article.findById("6007fb632ac04f1068a24e48", (err,articles)=>{
    console.log(err,articles);
})
*/
/*
Article.find({
    title: "Spiderman"
},(err,articles)=>{
    console.log(err,articles);
})
*/
/*
Article.create({
    title: "Spiderman",
    intro : "test d'introduction",
    content: "Critique sur le film Spiderman"
},(error,post)=>{
    console.log(error,post);
}
)
*/