'use strict';

var traceur = require('traceur');
var Tree = traceur.require(__dirname + '/../models/tree.js'); //pointing to the Class User is the models folder...class is always singular so in this case User
// var User = traceur.require(__dirname + '/../models/user.js');


exports.plant= (req, res)=>{
  Tree.plant(req.body.userId, tree=>{
    res.render('trees/tree', {tree:tree});
  });
};


exports.forest= (req, res)=>{
  Tree.findAllByUserId(req.query.userId, trees=>{
    res.render('trees/forest', {trees:trees});

  });
};



exports.grow= (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.grow();
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });
  });
};


exports.chop= (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.chop();
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });
  });
};


// exports.chop = (req, res)=> {
//   var treeId = Mongo.ObjectID(req.params.treeId);
//
//   trees.findOne({_id: treeId}, (e, tree)=>{
//     users.findOne({_id: tree.userId}, (e, user)=>{
//       user.wood += tree.height / 2;
//       users.save(user, (e, count)=>{
//         res.render('game/tree', {user: user}, (e, html)=>{
//           res.send(html);
//         });
//       });
//     });
//   });
// };
