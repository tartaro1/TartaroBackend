import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Proveedor",
    {
      ID_Proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      Direccion: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      Telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      Correo: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      tableName: "proveedores",
      timestamps: false
    }
  );
