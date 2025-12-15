const express = require("express");
const cors = require("cors");

const staffRoutes = require("./routes/staff");
const branchRoutes = require("./routes/branch");
const clientRoutes = require("./routes/client");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/staff", staffRoutes);
app.use("/branch", branchRoutes);
app.use("/client", clientRoutes);

const PORT = 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

module.exports = app;
