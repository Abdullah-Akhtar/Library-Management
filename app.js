const express = require("express")
const app = express();
const port = 3000;
const authRoute = require("./routes");
const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/books";


mongoose.set("strictQuery", true);
app.use(express.json());

////////////////////////////////////////
//////////Database Connection//////////
//////////////////////////////////////
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Succesfully");
    app.listen(port, console.log(`Server is listening on ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set('debug', true);

app.use(authRoute);
