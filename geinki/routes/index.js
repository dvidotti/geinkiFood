const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
let bcryptSalt = 10;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const {username, password} = req.body;

  if (username === '' || password === '') {
    res.render('signup', { message: "Usuário e/ou Senha vazios" });
    return;
  }

  User.findOne({username})
    .then((user) => {
      if (user) {
        res.render('signup', {message: 'O ususário já existe'})
        return;
      } else {
        let salt = bcrypt.genSaltSync(bcryptSalt)
        let hash = bcrypt.hashSync(password, salt)
        User.create({
          username,
          password: hash
        })
          .then(user => {
            console.log(user.username, 'Criado com sucesso')
            res.redirect('/login')
          })
          .catch(error => console.log(error))
      }
    })
    .catch(err => console.log(err))
});


router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const {username, password} = req.body;
  
  if (username === '' || password === '') {
    res.render('login', { message: "Usuário e/ou Senha vazios" });
    return;
  }

  User.findOne({username})
    .then(user => {
      if (!user) {
        res.render('login', { message: "Usuário e/ou Password incorretos" });
        return;
      } 

        if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user._id;
        res.redirect('/admin')
      } else {
        res.render('login', { message: "Usuário e/ou Password incorretos" });
        return;
      }
    })
    .catch(error => {
      next(error);
    })
});


module.exports = router;
