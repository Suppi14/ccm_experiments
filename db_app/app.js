let express = require('express');
let bodyParser = require('body-parser');
const port = 3000;

let app = express();
app.use(bodyParser.text());

function httpReqHandler(request, response) {
    const {headers, method, url} = request;
    console.log(request.body);
    console.log(JSON.parse(request.body)['get']);
    response.write('hello client!');
    response.end();
}

app.post('/', httpReqHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));