const httpStatus = require('http-status-codes');
const port = 3000;
const dbUrl = 'mongodb://localhost:27017';
const username = 'jdoe2s';
const userCollection = 'students';
let express = require('express');
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;

function httpReqHandler(request, response) {
    let bodyJson = JSON.parse(request.body);
    let store = bodyJson['store'];
    let collectionName = bodyJson['get'];
    console.log(`received store '${store}', collection '${collectionName}'`);
    if (store === null) {
        response.status(httpStatus.BAD_REQUEST);
        response.write("'store' not defined in HTTP payload");
        response.end();
        return;
    }

    console.log(`connecting to Mongo database at '${dbUrl}'`);
    mongoClient.connect(dbUrl,  { useNewUrlParser: true }, function (err, db) {
        if (err !== null) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR);
            response.write(err.toString());
            response.end();
            return;
        }

        let dbo = db.db(store);
        let collection = dbo.collection(userCollection);
        let resBody = `selected collection '${userCollection}' from database '${store}'\n`;
        // single query
        collection.findOne({ 'username': username }, function (err, user) {
            if (err) console.error(err);
            console.log(`findOne: found user ${user.username}: first name ${user.first}, last name ${user.last}\n`);
        });

        // multiple query, without toArray() the forEach will be asynchronous
        collection.find({ 'username': username }).toArray(function (err, users) {
            if (err) throw err;
            users.forEach(function (user) {
                resBody += `user ${user.username}: first name ${user.first}, last name ${user.last}\n`;
            });

            // send response
            response.writeHead(httpStatus.OK, {
                'Content-Length': Buffer.byteLength(resBody),
                'Content-Type': 'text/plain' });
            response.write(resBody);
            response.end();
            console.log(`closing Mongo database connection ${dbUrl}`);
            db.close();
        });
    });
}

let app = express();
app.use(bodyParser.text());
app.post('/', httpReqHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));