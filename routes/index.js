var express = require('express');
var router = express.Router();

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

    res.send(app.locals.lands);

});
router.get('/api/land/:id', function (req, res, next) {

    var found = 404;
    var lands = app.locals.lands;
    for (var i = 0; i < lands.length; i++) {
        if (lands[i].id == req.params.id) {
            found = lands[i];
            break;
        }
    }
    res.send(found);
});


router.post('/api/land/:id', function (req, res, next) {

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

    console.log("Sending this data to save in lands" + JSON.stringify(req.body));
    res.send(landFound);
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
