'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js'); //pointing to the Class User is the models folder...class is always singular so in this case User
var Tree = traceur.require(__dirname + '/../models/tree.js');


exports.login= (req, res)=>{
  User.login(req.body.username, user=>{  //the user call back function is 'fn' in the module file user.js
    res.render('users/dashboard', {user:user}); //passing in the user to render               //basically this give user the username which passes it over to the modules/user/js file where it runs the function and this is called back here
  });
};


exports.udpate = (req, res)=>{
    Tree.findByUserId(req.params.treeId, user=>{
      user.chop();
      user.save(()=>{
        res.render('users/dashboard', {user:user});
      });
    });
  };
  
  // res.render('users/dashboard', {title: 'Node.js: Help'});
