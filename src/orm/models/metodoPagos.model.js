import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "MetodoPago",
    {
      ID_Metodo_Pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      CodigoSeguridad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      TipoTarjeta: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      NumeroTarjeta: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      Transacion: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true
      },
      FechaHora: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "metodopagos",
      timestamps: false
    }
  );
