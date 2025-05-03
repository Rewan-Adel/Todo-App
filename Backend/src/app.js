const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const { notFoundError } = require('./middleware/error.messages.middleware');

const authRoute = require('./route/auth.route');
const taskRoute = require('./route/task.route');
const userRoute = require('./route/user.route');

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const corsOptions = {
    origin: 'https://todo-app-nine-lovat-94.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//db connection
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log('DB Connection Error', err);
});


app.use('/api/auth', authRoute);
app.use('/api/task', taskRoute);
app.use('/api/user', userRoute);

app.all('*', (req, res) => {
    return notFoundError(`Can't find ${req.originalUrl} on this server!`, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.log('Server Error', err.message);

});
