require("dotenv").config();

const express = require("express");
const app = express();
const port = 5400;

const cors = require("cors");
app.use(cors());

// db connection
const dbConnection = require("./db/config");

// user routes middleware file import
const userRoutes = require("./routes/userRoutes");

// question routes middleware file import
const questionRoute = require("./routes/questionRoutes");

// question routes middleware file import
const answerRoute = require("./routes/answerRoutes");

// like route middleware file import
const likeRoute = require("./routes/likeRoute");

// import rateLimitMiddleware
const limiter = require("./middleware/rateLimitMiddleware");

// json middleware to extract json data
app.use(express.json());

// user routes middleware file
app.use("/api/user", userRoutes);

// apply rate-limiting middleware to the login route
app.use("/api/user/login", limiter);

// question routes middleware
app.use("/api/question", questionRoute);

// answer routes middleware file
app.use("/api/answer", answerRoute);

// like routes
app.use("/api/answer/:answerId", likeRoute);



async function start() {
  try {
    // Test the database connection with a simple query
    const [rows] = await dbConnection.execute("SELECT 1 + 1 AS solution");
    console.log("Database connected successfully. Test query result:", rows[0].solution);
    
    // Start the server
    await app.listen(port);
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}
start();
