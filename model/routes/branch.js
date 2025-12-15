const express = require("express");
const router = express.Router();
const { execute } = require("../db");

//Get branch address by branchno
router.get("/address/:branchno", async (req, res) => {
  const branchno = req.params.branchno;

  try {
    const result = await execute(
      "SELECT street || ', ' || city AS address FROM dh_branch WHERE branchno = :b",
      { b: branchno }
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ address: "Branch not found" });
    }

    res.json({ address: result.rows[0].ADDRESS || result.rows[0].address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all branches
router.get("/all", async (_req, res) => {
  try {
    const result = await execute("SELECT * FROM dh_branch ORDER BY branchno");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update branch 
router.put("/:branchno", async (req, res) => {
  const branchno = req.params.branchno;
  const { street, city, postcode } = req.body;

  try {
    await execute(
      `BEGIN branch_update_sp(
        :p_branchno,
        :p_street,
        :p_city,
        :p_postcode
      ); END;`,
      {
        p_branchno: branchno,
        p_street: street,
        p_city: city,
        p_postcode: postcode
      }
    );

    res.json({ message: "Branch updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Open a new branch 
router.post("/open", async (req, res) => {
  const { branchno, street, city, postcode } = req.body;

  try {
    await execute(
      `BEGIN new_branch(
        :p_branchno,
        :p_street,
        :p_city,
        :p_postcode
      ); END;`,
      {
        p_branchno: branchno,
        p_street: street,
        p_city: city,
        p_postcode: postcode
      }
    );

    res.json({ message: "Branch opened successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
