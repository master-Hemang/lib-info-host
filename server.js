const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
var passport = require('passport');
var authenticate = require('./authenticate');
const cors = require('cors');
const dotenv= require('dotenv');
dotenv.config();


// Loading routers
const bookRouter = require('./routes/api/bookRouter');
const userRouter = require('./routes/api/userRouter');
const issueRouter = require('./routes/api/issueRouter');
const app= express();
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config 

// Connect to mongo database
const db=process.env.DB;
mongoose.connect(db);
.then(()=> {console.log("MongoDB Connected");})
.catch(err => console.log(err));

app.use(passport.initialize());

// Use routes
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.use('/api/issues',issueRouter);

/*
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
*/
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started running on port ${port}`));
