const httpStatus = require('http-status-codes');
const port = 3000;
const dbUrl = 'mongodb://localhost:27017';
const userCollectionName = 'students';
let express = require('express');
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;

function handleDbConnection(db, bodyJson, response){
    let store = bodyJson['store'];
    let dbo = db.db(store);

    if (bodyJson['get'])
    {
        let collectionName = bodyJson['get'];
        if (store === null) {
            response.status(httpStatus.BAD_REQUEST);
            response.write("'store' not defined in HTTP payload");
            return;
        }
        // let collection = dbo.collection(collectionName);
        // send response
        let resBody = `received 'get' request for collection '${collectionName}' from DB '${store}'`;
        response.writeHead(httpStatus.OK, {
            'Content-Length': Buffer.byteLength(resBody),
            'Content-Type': 'application/json; charset=utf-8',
            'Transfer-Encoding': 'chunked'});
        response.write(resBody);
        response.end();
        return;
    }

    if (bodyJson['set'])
    {
        const setData = bodyJson['set'];
        const username = setData['user'];
        if (username === null) {
            response.status(httpStatus.BAD_REQUEST);
            response.write("'user' not defined in 'set' request");
            response.end();
            return;
        }
        const targetCollectionName = setData['key'];
        if (targetCollectionName === null) {
            response.status(httpStatus.BAD_REQUEST);
            response.write("'key' not defined in 'set' request");
            response.end();
            return;
        }
        let userCollection = dbo.collection(userCollectionName);

        // TODO(minhnh) handle warning for duplicate users
        userCollection.findOne({ 'username': username }, {'username': 1, '_id' : 1 }, function (err, user) {
            if (err) {
                response.status(httpStatus.INTERNAL_SERVER_ERROR);
                response.write(err);
                response.end();
                return;
            }
            console.log(`findOne: found user ${user.username} with id ${user._id}\n`);

            console.log(`updating collection '${targetCollectionName}' from DB '${store}'`);
            let targetCollection = dbo.collection(targetCollectionName);
            targetCollection.updateOne( { 'studentId': user._id}, {$set: {data: setData}}, { upsert: true },
                function (err, record) {
                    if (err)
                        console.log(err);
                    db.close();
                });

            // send response
            response.writeHead(httpStatus.OK, {
                'Content-Type': 'application/json; charset=utf-8',
                'Transfer-Encoding': 'chunked'});
            response.write('saved');
            response.end();
            return;
        });
    }

    // // multiple query, without toArray() the forEach will be asynchronous
    // collection.find({ 'username': username }).toArray(function (err, users) {
    //     if (err) throw err;
    //     users.forEach(function (user) {
    //         resBody += `user ${user.username}: first name ${user.first}, last name ${user.last}\n`;
    //     });
    // });

}

function httpReqHandler(request, response) {
    let bodyJson = JSON.parse(request.body);

    console.log(`connecting to Mongo database at '${dbUrl}'`);
    mongoClient.connect(dbUrl,  { useNewUrlParser: true }, function (err, db) {
        if (err !== null) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR);
            response.write(err.toString());
            response.end();
            return;
        }
        handleDbConnection(db, bodyJson, response);
        console.log(`closing Mongo database connection ${dbUrl}`);
    });
}

let app = express();
app.use(bodyParser.text());
app.post('/', httpReqHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));