const express = require ('express')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose  = require('mongoose');
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const connectFlash = require('connect-flash')
const {stripTags} = require('./helpers/hbs')


//controller
//article
const articlePostController = require('./controllers/articlePost')
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const homePage = require('./controllers/homePage')

// users

const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

//mongodb
const app = express()
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true,useUnifiedTopology: true})

//express-session

const mongoStore = MongoStore(expressSession)

//connect flash
app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
//connect-mongo
    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))


//body-parser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(fileupload())

const auth = require('./middleware/auth')
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')

//Handlebars
const Handlebars = require("handlebars");
const MomentHandler = require('handlebars.moment')
MomentHandler.registerHelpers(Handlebars)

//express static
app.use(express.static('public'))


//Route
app.engine('hbs', exphbs({
    helpers: {
    stripTags: stripTags
    },
    defaultLayout: 'main',extname: 'hbs',handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine','hbs')
app.use('*', (req,res,next) =>{
    res.locals.user = req.session.userId
    console.log(res.locals.user);
    next()
})

//middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)

app.get('/', homePage)

// Article
app.get('/article/add',auth, articleAddController)
app.get('/articles/:id', articleSingleController)
app.post('/articles/post', auth, articleValidPost, articlePostController ) 

//users
app.get('/user/create', redirectAuthSuccess, userCreate )
app.post('/user/register',redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess,userLoginAuth)
app.get('/user/logout',  userLogout)

//contact 
app.get('/contact', (req,res)=>{
    res.render('contact')
})    

//error404
app.use((req,res)=>{
    res.render('error404')
})

app.listen(3000, ()=>{
    console.log('Open server 3000');
})