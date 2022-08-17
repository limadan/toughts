const port = 3000
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const db = require('./db/connection.js');
const app = express()

//Models
const Tought = require('./models/Tought');
const User = require('./models/User');

//import Routes

const ToughtsRoutes = require('./routes/ToughtsRoutes')
const AuthRoutes = require('./routes/AuthRoutes')

const AuthController = require('./controllers/AuthController')
const ToughtsController = require('./controllers/ToughtsController.js')

//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

app.use(flash())

app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

//Routes





app.use('/toughts', ToughtsRoutes)
app.use('/', AuthRoutes);

app.get('/', ToughtsController.showToughts)

db.sync().then(()=>{
    app.listen(3000, ()=>{
        console.log(`Servidor rodando! Porta: ${port}`);
    })
}).catch((err)=>{
    console.log("Não foi possível se conectar ao banco de dados.")
    throw err;
})