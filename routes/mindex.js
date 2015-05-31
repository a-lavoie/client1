var express = require('express');
var router = express.Router();
var mlands = require('../server/models/lands');
var mongoose = require('mongoose');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.get('/api/exp', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

app = express();

router.get('/api/lands', function (req, res, next) {

    mlands.model.find( function(err, doc){ 
     res.send(doc);
 });

});

router.get('/api/land/:id', function (req, res, next) {
  mlands.model.findOne( {id: req.params.id }, function(err, doc){ 
      console.log('err=' + err + 'doc=' + doc);
      if ( err ){
       res.send(404);
   } else if ( doc != null ){
       res.send(doc);
   } else {
       res.send(404);
   }
});
});


router.post('/api/land/', function (req, res, next) {
    console.log("Receiving this data to save in lands: " + JSON.stringify(req.body));
    var data = req.body;
    var i = mlands.model( data );
    i._doc.updated = new Date().toISOString();
    var action = i.save(function(err, other){
     if (err) throw err;
     res.send(200);
 });
    console.log("Sending this data to save in lands" + JSON.stringify(req.body));
});


router.post('/api/land/:id', function (req, res, next) {

  var date = new Date().toISOString();
  var validFormatInput =  new Date(req.body.updated).toISOString();
  var reqObject = {
     updated: date,
     name : req.body.name,
     details : req.body.details,
     other : req.body.other,
     size : req.body.size
  };

  var action = mlands.model.findOne(
  {
     _id: mongoose.Types.ObjectId(req.body._id)
  },  
  function(err, found){  
     if (err) {
        res.send(500);
     } else if ( validFormatInput != new Date(found.updated).toISOString() ){
        var dataFoundOnServer = found._doc;
        dataFoundOnServer.updated = new Date(found.updated).toISOString();
        res.send(409, dataFoundOnServer);
     } else {
        // We validated that the instance exist.  It is containing a valid updated timestamp.
        var conditions = {_id: mongoose.Types.ObjectId(req.body._id), updated: validFormatInput };
        mlands.model.findOneAndUpdate(conditions, reqObject, {new: true}, function(err, raw){
           if (err){
              res.send(500);
           } else if ( raw == null ){
             // no instance was updated, unless just deleted or with a wrong timestamp (race condition)
              res.send(409);
           } else {
              console.log(raw);
              res.send(200, raw._doc);
           }
        });        

     }

  });

  var old=false;
  if ( old ){
      console.log("Receiving this data to save in lands: " + JSON.stringify(req.body));
      var query = { id: req.body.id };
      var oUpdateData = req.body;
      var options = {  upsert:true  };
      var action = mlands.model.findOne(
      {
        _id: mongoose.Types.ObjectId(req.body._id)
        //id:req.body.id
      },  
      function(err, found){
        // Si l'instance n'existe pas ou autre erreur
        var validFormatExisting = new Date(found.updated).toISOString();
        if (err){
          res.send(500);
        } else if ( validFormatExisting != validFormatInput ){
          console.log('out of sync');
          res.send(409);
          } else {
          // Alors creer nouvelle instance
         
             console.log(found);
             var dataFromDB = found._doc;
             dataFromDB.updated = date;
             dataFromDB.name = req.body.name;
             dataFromDB.details = req.body.details;
             dataFromDB.other = req.body.other;
             dataFromDB.size = req.body.size;
             // Sauvegarder (atomic)
             var conditions = {_id: mongoose.Types.ObjectId(req.body._id), updated: validFormatInput };
             mlands.model.update( conditions, dataFromDB, function(err, raw){
                if (err){
                 res.send(500);
                } else {
                 console.log(raw);
                 res.send(200, raw._doc);
                }
             });
          }
       });
     } 
});

router.delete('/api/land/:id', function (req, res, next) {

 var action = mlands.model.findOneAndRemove( {id: req.params.id}, function(err){
  if (err) { res.send(404); }
  res.send(200);
});
});


module.exports = router;
