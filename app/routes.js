var UserData = require('./models/UserData');
var InterviewDetails = require('./models/InterviewDetails');
var EmpData = require('./models/EmpData');

var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
        storage: storage,
        fileFilter : function(req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');

module.exports = function (app) {

    app.post('/api/login', function (req, res) {
         UserData.find({
            username: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    app.post('/api/signup', function (req, res) {

        UserData.find({
            username: req.body.username,
            email:req.body.email
        }, function(err,user) {
            if(user.length>0)
                res.json("Username-Email Combination Already Exists");
            else{
                UserData.create({
                    username: req.body.username,
                    password: req.body.password,
                    email:req.body.email
                }, function (err, todo) {
                    if (err)
                        res.send(err);
                    res.json("success");
                });
            }
        })
    });

    app.post('/api/updateDetails', function (req, res) {

        InterviewDetails.create({
                group: req.body.group,
                location: req.body.location,
                dateOf:req.body.dateOf
            }, function (err, todo) {
                if (err)
                    res.json("Update Failed. Try Again");
                res.json("Details Updated");
        });
    });
    app.post('/upload', function(req, res) {
        var exceltojson; //Initialization
        console.log('hello');
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            //start convert process
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                exceltojson({
                    input: req.file.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 

                    for (var i = 0; i < result.length; i++) {
                        EmpData.create({
                            eid: result[i]['eid'],
                            ename:result[i]['ename'],
                            edesg:result[i]['edesg'],
                            egroup:result[i]['egroup']
                        }, function (err, todo) {
                            
                    });
                    }

                    res.json({error_code:0,err_desc:null, data: result});
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        });
    });
};