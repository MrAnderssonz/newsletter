var express = require('express');
var fs = require('fs');

var router = express.Router();

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
    var users = JSON.parse(data);

    newUser = 
    {
      "id": req.body.id,
      "userName": req.body.userName,
      "mail": req.body.mail,
      "subscription": req.body.subscription
    }

    users.push(newUser);
    var saveUsers = JSON.stringify(users, null, 2);

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
module.exports = router;
