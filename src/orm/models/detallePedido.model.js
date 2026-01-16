import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "DetallePedido",
    {
      ID_DetallePedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ID_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PrecioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      Descuento: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "detallepedido",
      timestamps: false
    }
  );
