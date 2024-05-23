const express = require('express');
const db = require('./config/database');
const courseRoutes = require('./routes/courseRoutes');
const userRouter = require('./routes/userRouter');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

db();
// body parser
app.use(express.json());
app.use(express.urlencoded({extended : false }))
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static('public'))
// routes
app.get('/', (req, res) => {
    res.render('Pages/index')
})
app.get('/instructorDashboard', (req, res) => {
    res.render('Pages/instructorDashboard')
})
    
app.use('/courses', courseRoutes);
app.use('/user', userRouter)

// listen server
app.listen(port, (error) =>{
    if(error)throw error;
        console.log('server is started on http://localhost:3000');
})