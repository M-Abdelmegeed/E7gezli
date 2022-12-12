const express = require("express"); // express application
require("dotenv").config(); // use the env variables
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/index.routes"); // used to handle routes
const bodyParser=require('body-parser');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8080;
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cors({
  origin:["https://agile-final.herokuapp.com/doctor-form","https://agile-final.herokuapp.com"]
}));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(router);
const uri=process.env.MONGO_DB_CONNECTION;
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology:true })
       .then(() => {
         console.log('MongoDB connection successful');
         app.listen(PORT)
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
new Database();

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
//   });

app.get('/', function (req, res) {
res.send('Hello World');
 })

app.use((req, res) => {
    res.status(404).send("Error: routes doesn't exist (-_-)");
  });



