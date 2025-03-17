const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

if (fs.existsSync(DB_FILE)) {
  db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
} else {
  db = { users: [] };
}

const saveDb = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
};

module.exports = {
  db,
  saveDb,
}