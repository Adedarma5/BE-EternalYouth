import { Sequelize } from "sequelize";

const db = new Sequelize ('eternal_youth', 'root', 'katasandi',{
    host: "localhost",
    dialect: "mysql"
});

export default db;