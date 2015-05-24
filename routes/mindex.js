var express = require('express');
var router = express.Router();
var mlands = require('../server/models/lands');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.get('/api/exp', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

app = express();
app.locals.lands = [ 
{
    'id': 1,
    'name': 'Infosys Technologies',
    'size': 125000,
    'details': 'Encore d autres détails',
    'updated': new Date().toISOString(),
    'other': 'Bangalore'
},
{
    'id': 2,
    'name': 'Cognizant Technologies',
    'size': 125,
    'details': 'This is details',
    'updated': new Date().toISOString(),
    'other': 'Bangalore'
}
];

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
    var modified=false; 

    // var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

    if (modified){
       console.log("Receiving this data to save in lands: " + JSON.stringify(req.body));
       var found = 0;
       var landFound = 404;
       var lands = app.locals.lands;
       for (var i = 0; i < lands.length; i++) {
           if (lands[i].id == req.body.id) {
               found = i;
               lands[found] = req.body;
               landFound = lands[found];
               landFound.updated = new Date().toISOString();
               break;
           }
       }
    } else {
       console.log("Receiving this data to save in lands: " + JSON.stringify(req.body));
       var query = { id: req.body.id };
       var oUpdateData = req.body;
       var options = {  upsert:true  };
       //var action = mlands.model.update( 
       //   query, 
       //   oUpdateData, 
       //   options,
       //   function(err, o){
       //      console.log(o);
       //      console.log(err);
       //      //res.send(action);
       //   }
       //);
       // Verifier que l'instance existe en bd
       console.log("Sending this data to save in lands" + JSON.stringify(req.body));
       var action = mlands.model.findOne(
              {
                  id:req.body.id
                  
              },  
              function(err, found){
                 // Si l'instance n'existe pas ou autre erreur
                 if (err){
                    res.send(500);
                 } else {
                    // Alors creer nouvelle instance
                    var date = new Date().toISOString();
                    console.log(found);
                    found.updated = date;
                    found.name = req.body.name;
                    found.details = req.body.details;
                    found.other = req.body.other;
                    found.size = req.body.size;
                    // Sauvegarder (atomic)
                    found.save(function(err, raw){
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

function findLandIndex( id ) {
    var found = -1;
    var lands = app.locals.lands;
    for (var i = 0; i < lands.length; i++) {
        if (lands[i].id == id){
            found = i;
            break;
        }
    }
    return found;
}


router.delete('/api/land/:id', function (req, res, next) {

    var old=false;
    if ( old ){
       console.log("Receiving this data to delete in lands: " + JSON.stringify(req.body));
       var result = 404;
       var lands = app.locals.lands;
       var land = findLandIndex(req.params.id);
       if (land >= 0) {
           lands.splice(land, 1);
           result=200;
       }
       console.log("Sending this result lands: " + result);
       res.sendStatus(result);
    } else {
       var action = mlands.model.findOneAndRemove( {id: req.params.id}, function(err){
          if (err) { res.send(404); }
          res.send(200);
       });
    }
});


router.post('/api/land', function (req, res, next) {
    var land;

    console.log("Receiving this data to save in lands: " + JSON.stringify(req.body)); 

    function findHighestId() {
        var found = 0;
        var lands = app.locals.lands;
        for (var i = 0; i < lands.length; i++) {
            if (lands[i].id > found) found = lands[i].id;
        }
        return found;
    }

    var highestId = findHighestId();
    land = req.body;
    land.id = highestId + 1;
    land.updated = new Date().toISOString();
    app.locals.lands.push(land);

    console.log("Sending this data to save in lands" + JSON.stringify(land));
    res.send(land);
});


module.exports = router;
