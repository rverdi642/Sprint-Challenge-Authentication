const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const { authenticate, genToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


  // implement user registration
  function register(req, res)  {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 3);
    creds.password = hash;

    db('users')
    .insert(creds)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = genToken(user);
          res.status(201).json({id: user.id,token});
        });
    })
    .catch(err => res.status(500).json({message: "Severe Error"}));
    // .catch(function(error) {
    //   res.status(500).json({ error });
    // });
  }
//}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
      .where({username: creds.username})
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(creds.password, user.password)) {
              const token = generateToken(user);
              res.status(200).json(token)
          } 
          else {
              return res.status(400).json({Message: 'Wrong credentials'})
          }
      })
      .catch(error => {
          res.status(500).json(error)
      })
}




function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
