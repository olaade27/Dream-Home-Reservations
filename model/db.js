const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: "dbs501_253v1a15",            // <- Oracle username
  password: "17380279",  // <- password
  connectString: "myoracle12c.senecacollege.ca:1521/oracle12c" // <- lab’s string
};

async function execute(sql, binds = {}, options = {}) {
  let conn;
  options.outFormat = oracledb.OUT_FORMAT_OBJECT;
  try {
    conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(sql, binds, options);
    if (options.autoCommit) {
      // committed
    }
    return result;
  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) { console.error(e); }
    }
  }
}

module.exports = { execute, oracledb };
