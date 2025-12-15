const express = require("express");
const router = express.Router();
const { execute } = require("../db");

// Hire new staff
router.post("/hire", async (req, res) => {
  const b = req.body;

  // Validation
  if (!b.staffno || b.staffno.trim() === "") {
    return res.status(400).json({ error: "Staff No cannot be empty" });
  }

  try {
    await execute(
      `BEGIN staff_hire_sp(
            :p_staffno,
            :p_fname,
            :p_lname,
            :p_position,
            :p_sex,
            TO_DATE(:p_dob, 'YYYY-MM-DD'),
            :p_salary,
            :p_branchno,
            :p_telephone,
            :p_mobile,
            :p_email
      ); END;`,
      {
        p_staffno: b.staffno,
        p_fname: b.fname,
        p_lname: b.lname,
        p_position: b.position,
        p_sex: b.sex,
        p_dob: b.dob,
        p_salary: b.salary,
        p_branchno: b.branchno,
        p_telephone: b.telephone,
        p_mobile: b.mobile,
        p_email: b.email
      }
    );

    res.json({ message: "Staff hired successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List all staff
router.get("/all", async (_req, res) => {
  try {
    const result = await execute("SELECT * FROM dh_staff ORDER BY staffno");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update staff
router.put("/:staffno", async (req, res) => {
  const staffno = req.params.staffno;
  const { salary, telephone, email } = req.body;

  try {
    await execute(
      `BEGIN staff_update_sp(
        :p_staffno,
        :p_salary,
        :p_telephone,
        :p_email
      ); END;`,
      {
        p_staffno: staffno,
        p_salary: salary,
        p_telephone: telephone,
        p_email: email
      }
    );

    res.json({ message: "Staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
