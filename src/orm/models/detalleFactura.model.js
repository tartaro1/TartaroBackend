import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "DetalleFactura",
    {
      ID_DetalleFactura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Factura: {
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
      tableName: "detallefactura",
      timestamps: false
    }
  );
