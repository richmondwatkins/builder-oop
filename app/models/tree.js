'use strict';
// var traceur = require('traceur');
// var User = traceur.require(__dirname + '/../models/user.js'); //pointing to the Class User is the models folder...class is always singular so in this case User
var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree {
  constructor(userId){               //constructor makes a brand new thing in this case a user
      this.userId = userId;
      this.height = 0;
      this.isHealthy = true;
      this.isChopped = false;
  }

  chop(){
    if(this.height > 24){
    this.isChopped = true;

    }
    else{
      this.isChopped = false;
    }
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  grow(){
    if(this.isChopped === true){
    this.height += 0;
  }
  else {
    this.height += _.random(0,2);
    this.isHealthy = _.random(0, 200) !== 71;
  }
}

  getClass(){     //this is an instance method
    var classes = [];

    if(this.height === 0){
        classes.push('seed');
    } else if(this.height < 12){
      classes.push('sapling');
    }else if(this.height < 24){
      classes.push('treenager');
    } else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }

    if(this.isChopped){
      classes.push('chopped');
    }
    return classes.join(' ');
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
      var tree = new Tree(userId);
      trees.save(tree, ()=>fn(tree));

  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e, objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });

  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree= _.create(Tree.prototype, tree);
      fn(tree);
  });
}



}
  module.exports = Tree; //exports out the class
