import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Pedido",
    {
      ID_Pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      EstadoPedido: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Direccion: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PrecioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      ID_Rol: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      FechaPedido: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "pedidos",
      timestamps: false
    }
  );
