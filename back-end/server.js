const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { db, saveDb } = require('./db');

const app = express();
app.use(express.json());

app.post('/api/sign-up', async (req, res) => {
  const { email, password } = req.body;

  // Make sure there is no user with the email already in the database
  const matching_user = db.users.find(user => user.email === email);
  if (matching_user) {
    return res.sendStatus(409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const id = uuidv4();

  const startingInfo = {
    hairColor: '',
    favoriteFood: '',
    bio: '',
  }

  db.users.push({
    id,
    email,
    passwordHash,
    info: startingInfo,
    isVerified: false,
  })

  saveDb();

  res.json({ id });
});

app.listen(3000, () => console.log('Server running on port 3000'));