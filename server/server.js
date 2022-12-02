const express = require("express");

const app = express();
const port = 5001;

app.use(express.static("server/public"))
app.use(express.urlencoded());

function doIt(array) {
    let answer = 0;
    if(array.operation==='+'){
        answer=Number(array.num1)+Number(array.num2);
        console.log(answer)
        array.sol=answer
    } else if (array.operation==='-'){
        answer=Number(array.num1)-Number(array.num2);
        console.log(answer)
        array.sol=answer
    } else if (array.operation==='*'){
        answer=Number(array.num1)*Number(array.num2);
        console.log(answer)
        array.sol=answer
    } else if (array.operation==='/'){
        answer=Number(array.num1)/Number(array.num2);
        console.log(answer)
        array.sol=answer
    }
}


const calculations = []

app.listen(port, () => {
    console.log('listening on port, ', port)
    console.log("calculations", calculations);
});

app.get("/calculations", function (req, res) {
    console.log("request for /calculations was made");
    res.send(calculations);
});

app.post("/calculations", function(req, res) {
    console.log("in post request", req.body);
    console.log(doIt(req.body))
    calculations.push(req.body);
    res.sendStatus(201);
})
 
