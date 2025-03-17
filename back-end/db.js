export let database = {};

const DB_FILE = 'database.json';

if (fs.existsSync(DB_FILE)) {
  database = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
} else {
  database = { users: [] };
}

export const saveDatabase = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf8');
};
