var express = require('express');
var fs = require('fs');
var CryptoJS = require('crypto-js');
//var cors = require('cors')

//app.use(cors())
var router = express.Router();

var saltKey = "unknownPleasures";

router.get('/', function(req, res, next) {
  
  fs.readFile('users.json', (err, data) => 
  {
    if (err)
    {
      throw err;
    }
    var users = JSON.parse(data);
    res.send(users);
  })

});

router.post('/', function(req, res, next) {
  fs.readFile('users.json', (err, data) => 
  {
    if (err)
    {
      throw err;
    }
    let users = JSON.parse(data);
    let newId;

    if ( users == "")
    {
      newId = 1;
    }
    else
    {
      newId = (users[(users.length - 1)].id + 1)
    }

    let password = CryptoJS.AES.encrypt(req.body.password, saltKey).toString();

    newUser = 
    {
      "id": newId,
      "userName": req.body.userName,
      "mail": req.body.mail,
      "password": password,
      "subscription": req.body.subscription
    }

    users.push(newUser);
    let saveUsers = JSON.stringify(users, null, 2);

    fs.writeFile('users.json', saveUsers, (err, data) =>
    {
      if (err)
      {
        throw err;
      }
    });

    res.send("Ny använade sparad");
  })

});

router.post('/login', function(req, res) {
  fs.readFile('users.json', (err, data) => {

    if(err)
    {
      throw err;
    }

    let users = JSON.parse(data);
    let login = false;
    let userId = null;
    let subscription = false;
    
    //let filtedUsers = users.filter(a => a.userName == req.body.userName)
    for(let i = 0; i<users.length; i++)
    {
  
      if (users[i].userName == req.body.userName)
      {
        
        let decryptedPassord = CryptoJS.AES.decrypt(users[i].password, saltKey).toString(CryptoJS.enc.Utf8);
        if(decryptedPassord == req.body.password)
        {
          login = true;
          userId =users[i].id;
          subscription = users[i].subscription;
        }
      }
    
    }

    res.send({login, userId, subscription});
    
  })
})

router.put('/:id', function(req, res, next) {
  
    fs.readFile('users.json', (err, data) => {
      if(err) throw err;
      
      let users = JSON.parse(data);
      let user = users.find(a => a.id == req.params.id);
      user.subscription = req.body.subscription;

      let updatedUsers = JSON.stringify(users, null, 2); 

      fs.writeFile('users.json', updatedUsers, (err, data) => 
      { 
          if(err) throw err;
          res.send({ message: "User has beend updated!", sucessful: true });
      });
    });

});

module.exports = router;
