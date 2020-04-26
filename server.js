const express = require('express');
const app = express();

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
