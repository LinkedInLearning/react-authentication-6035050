const express = require('express');

const app = express();
app.use(express.json());

// Endpoints go here

app.listen(3000, () => console.log('Server running on port 3000'));