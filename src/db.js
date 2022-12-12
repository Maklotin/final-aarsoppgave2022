import { createConnection } from "mysql";

const db = createConnection({
    host: "10.2.2.144",
    user: "root",
    passord: "",
    database: "speedtestbrukere"
  })

export default db;