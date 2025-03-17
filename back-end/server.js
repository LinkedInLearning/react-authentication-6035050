const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const DB_FILE = 'database.json';

let database = {};

if (fs.existsSync(DB_FILE)) {
  database = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
} else {
  database = { users: [] };
}

export const saveDatabase = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf8');
};

app.listen(3000, () => console.log('Server running on port 3000'));
