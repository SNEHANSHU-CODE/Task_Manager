const express = require("express");
const app = express();
const port = 8080;
const connector = require("./connector");

const cors = require("cors");
//Cross-Origin Resource Sharing for client and server communication
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Import and use each route file
app.use("/task", require("./Router/taskRouter"));
app.use("/auth", require("./Router/authRouter"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
