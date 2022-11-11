const client = require("../client") 
const express = require("express") 
const cors = require("cors");

const app = express()  

var corOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getBoardBaseInfos",  (req, res) => {
    console.log('start')
    client.getBoardBaseInfos(null, (err, data) => {
        if (!err) {
            console.log(data)
            res.status(200).send(data) 
        }else{
            console.log(err)
            response.status(500).send( 'fail' );
        }
    });
})
app.get("/getBoardDetail/:seq", (req, res) => {
    const seq = req.params.seq
    client.getBoardDetail ({ seq: seq }, (err, data) => {
        if (!err) {
            console.log(data)
            res.status(200).send(data) 
        }else{
            console.log(err)
            response.status(500).send( 'fail' );
        }
    });
})
app.put("/updateBoard", (req, res) => {
    const updateBoard = {
        seq: req.body.seq,
        title: req.body.title,
        content: req.body.content
    }
    client.updateBoard(updateBoard, (err, data) => {
        if (!err) {
            console.log(data)
            res.status(200).send(data) 
        }else{
            console.log(err)
            response.status(500).send( 'fail' );
        }
    })
})
app.post("/insertBoard", (req, res) => {
    const insertBoard = {
        title: req.body.title,
        content: req.body.content
    }
    client.insertBoard(insertBoard, (err, data) => {
        if (!err) {
            console.log(data)
            res.status(200).send(data) 
        }else{
            console.log(err)
            response.status(500).send( 'fail' );
        }
    })
})

app.delete("/removeBoard", (req, res) => {
    client.removeBoard({ seq: req.body.seq }, (err, _) => {
        if (!err) {
            res.status(200).send("success") 
        }else{
            console.log(err)
            response.status(500).send( 'fail' );
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})

