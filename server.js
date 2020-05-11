const express = require('express');
const connectDB = require('./config/db');

//Route files
const auth = require('./routes/auth.route');
const posts = require('./routes/posts.route');
const users = require('./routes/users.route');

const app = express();

//Connect to mongoDB database
connectDB();

//Init Middlewares
app.use(express.json({ extended: false }));

//Mount routes
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
