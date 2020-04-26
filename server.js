const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to mongoDB database
connectDB();

app.get('/api/sample', (req, res) => {
  const sampleData = [
    {
      id: 1,
      firstName: 'Brahma'
    },
    {
      id: 2,
      firstName: 'Vishnu'
    },
    {
      id: 3,
      firstName: 'Maheswar'
    }
  ];
  res.json(sampleData);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
