// require express for endpoints
const express = require('express')
const app = express()
const router = express.Router()
const port = 4444

// require body-parser
const bodyParser = require('body-parser')

//initialize body-parser
app.use(bodyParser.json())


// setting up database connection
// Create instance of Mongoose and connect to our local
// MongoDB database at the directory specified earilier.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/GetItDone');


// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to get it done at /data/db/")
});

// setting up CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// requiring mongoose.Schema for module set up

const Schema = mongoose.Schema

const ToDoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  }
})

const ToDo = mongoose.model('ToDo', ToDoSchema)

// routes

app.get('/', (req, res) => {
  //res.send('hello')
  ToDo.find({})
    .then(todos => {
      res.json(todos)
    })
})


app.post('/add', (req, res) => {
  console.log(req.body)
    ToDo({
      task: req.body.task,
      complete: req.body.complete
    }).save()
      .then(todo => {
        res.json(todo)
      })
})


app.delete('/:objectId', (req, res) => {
  ToDo.findOneAndRemove({ "_id": req.params.objectId })
    .then(object => {
      res.json({ deleted: true });
    })
    .catch(err => {
      console.log(err);
      res.status(400)
        .json({ err });
    })
});
app.put('/:objectId', (req, res) => {
  let __todo = req.body;
  let update = {
    task: __todo.task,
    complete: __todo.complete,
  }

  let query = { "_id": req.params.objectId }

  ToDo.findOneAndUpdate(query, update, { new: true, runValidators: true })
    .then(updatedtodo => {
      res.json(updatedtodo);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ err });
    })

});

app.listen(4444, () => {
  console.log('die die die')

})