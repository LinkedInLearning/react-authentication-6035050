const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  jwt.sign({
    id,
    email,
    info: startingInfo,
    isVerified: false,
  }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  }, (err, token) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ token });
  })
});

app.post('/api/log-in', async (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find(user => user.email === email);
  if (!user) return res.sendStatus(401);

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);

  if (passwordIsCorrect) {
    const { id, email, info, isVerified } = user;
    jwt.sign({
      id,
      email,
      info,
      isVerified,
    }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    }, (err, token) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json({ token });
    })
  } else {
    res.sendStatus(401);
  }
})

app.listen(3000, () => console.log('Server running on port 3000'));