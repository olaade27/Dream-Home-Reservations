const express = require("express");
const router = express.Router();
const { execute } = require("../db");

// Register new client
router.post("/register", async (req, res) => {
  const { clientno, fname, lname, telephone, email } = req.body;

  try {
    await execute(
      `BEGIN client_register_sp(
        :p_clientno,
        :p_fname,
        :p_lname,
        :p_telno,
        :p_email
      ); END;`,
      {
        p_clientno: clientno,
        p_fname: fname,    // FIXED
        p_lname: lname,    // FIXED
        p_telno: telephone,
        p_email: email
      }
    );

    res.json({ message: "Client registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all clients
router.get("/all", async (_req, res) => {
  try {
    const result = await execute(
      "SELECT clientno, fname, lname, telno, email FROM DBS501_253V1A15.dh_client ORDER BY clientno"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update client phone / email
router.put("/:clientno", async (req, res) => {
  const clientno = req.params.clientno;
  const { telephone, email } = req.body;

  try {
        await execute(
            `BEGIN client_update_sp(
                :p_clientno,
                :p_telno,
                :p_email
            ); END;`,
            {
                p_clientno: clientno,
                p_telno: telephone,
                p_email: email
            }
        );

    res.json({ message: "Client updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
