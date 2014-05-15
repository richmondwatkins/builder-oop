'use strict';

var traceur = require('traceur');
var Tree = traceur.require(__dirname + '/../models/tree.js'); //bringing in Tree Class
var users = global.nss.db.collection('users'); //users collection

exports.plant = (req, res)=>{
  Tree.plant(req.body.userId, tree=>{
    res.render('trees/tree', {tree:tree});
  });
};

exports.forest = (req, res)=>{
  Tree.findAllByUserId(req.query.userId, forest=>{
    res.render('trees/forest', {trees:forest});
  });
};

exports.grow = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    tree.grow();
    tree.save(()=>{
      res.render('trees/tree', {tree:tree});
    });
  });
};

exports.chop = (req, res)=>{
  Tree.findByTreeId(req.params.treeId, tree=>{
    users.findOne({_id:tree.userId}, (e, user)=>{
      var wood = tree.height / 2;
      user.wood += wood;

      users.save(user, ()=>{
        tree.isHealthy = false;
        tree.isChopped = true;
        tree.height = 0;

        tree.save(()=>{
          res.render('trees/tree', {tree:tree});
        });
      });
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
