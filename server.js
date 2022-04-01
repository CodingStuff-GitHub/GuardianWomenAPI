const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')

const app = express();

// heroku link
app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended: true
}))
// use dotenv files
dotenv.config({
    path: './config/config.env'
});

connectDB().then(r => {
    console.log('DB connected')
}).catch(e => {
    console.log(e)
})


app.use('/api/WomenSafety/auth', require('./routes/guardian'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
