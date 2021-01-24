const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
let globalStorage = [];

app.get("/register", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});

app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body)
        return response.sendStatus(400);
    console.log(request.body);
    if (globalStorage.length !== 0)
        response.send(
            `<body>${request.body.userName} - ${request.body.userAge} - - ${request.body.comment}<br>
                    All Comments - ${globalStorage[0].userComment}</body>`
        );
    else response.send(`<body>${request.body.userName} - ${request.body.userAge}</body> - ${request.body.comment}`)
    globalStorage.push({
        userName: request.body.userName,
        userAge: request.body.userAge,
        userComment: request.body.comment
    });
});

app.get("/", function (request, response) {
    response.set({'Set-Cookie': 'login=yes'});
    response.send("Главная страница");
});

app.listen(3000);

