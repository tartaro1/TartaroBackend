import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "CopiaSeguridad",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FechaHora: {
        type: DataTypes.DATE,
        allowNull: false
      },
      NombreBD: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      VersionBD: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      Tipo: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      Ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      Informacion: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      tableName: "copiasseguridad",
      timestamps: false
    }
  );
