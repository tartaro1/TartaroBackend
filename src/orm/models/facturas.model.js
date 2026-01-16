import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Factura",
    {
      ID_Factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ID_Metodo_Pago: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ID_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      EstadoFactura: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Impuesto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      tableName: "facturas",
      timestamps: false
    }
  );
