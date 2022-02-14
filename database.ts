import { Sequelize } from "sequelize";

require("dotenv").config();

export default new Sequelize(process.env.DATABASE_URL || "", {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
