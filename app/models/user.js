'use strict';

var users = global.nss.db.collection('users');
var _ = require('lodash');
var Mongo = require('mongodb');

class User {
  constructor(username){    //constructor makes a brand new thing in this case a user
      this.username = username;
      this.wood = 0; //not passed in because it is 0
      this.cash = 0; //not passed in because it is zero
  }


  static login(username, fn){ //adding static makes it a class method

  username = username.trim().toLowerCase();
  users.findOne({username: username}, (e, user)=>{   //looks to see if user exists in database...use a callback function once it determines if a user was found or not
      if(user){
        fn(user);      //have to put it back into fn since fn is getting called back into routes/users.js...we are providing the function in routes/users.js with the user
      }else{
        user = new User(username);  //calls the constructor
        users.save(user, (e, u)=>{  //saves the new user  no paramters are being used so you can pull them out
          fn(user);   //put it back into fn since fn is the one getting called back to routes/users.js
        });
      }
   });
 }


  static findByUserId(userId, fn){
   userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
  });
}

}


module.exports = User; //exports out the class
