const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {DBConnection} = require('./DB/Connection');
const ClassController = require('./Controllers/ClassController');
const VanController = require('./Controllers/VanController');
const StudentController = require('./Controllers/StudentController');
const DashboardController = require('./Controllers/DashboardController');
const LoginsController = require('./Controllers/LoginsController');
const TFBatchController = require('./Controllers/TFBatchController');
const VFBatchController = require('./Controllers/VFBatchController');
const VanHOAController = require('./Controllers/VanHOAController');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/Class', ClassController);
app.use('/api/Van',VanController);
app.use('/api/Student', StudentController);
app.use('/api/Dashboard', DashboardController);
app.use('/api/Logins', LoginsController);
app.use('/api/TFBatch', TFBatchController);
app.use('/api/VFBatch', VFBatchController);
app.use('/api/VanHOA', VanHOAController);

/* app.use(express.static(__dirname+'/dist/dashboard'));

app.get('/*', (req, res, next) =>{
    res.sendfile(path.join(__dirname, '/dist/dashboard/index.html'));
}); */

app.listen(port, () => console.log(`Server started on port ${port}`));

//exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
