const express = require("express");
const dbconfig = require("./config/db.config");
const unless = require("express-unless");

const auth = require("./middlewares/auth");
const error = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use("/users", require("./routes/users.routes"));
auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/users/register", methods: ["POST"] },
//       { url: "/users/login", methods: ["POST"] },
//     ],
//   })
// );
// app.use(errors.errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, dbconfig, () => {
  console.log("Server running on port:", PORT);
});
