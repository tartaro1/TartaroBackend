import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Cargo",
    {
      ID_Rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      EstadoRol: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: "cargo",
      timestamps: false
    }
  );
