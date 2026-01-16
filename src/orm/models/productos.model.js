import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Producto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NombreProducto: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      ID_Categoria: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Marca: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      ID_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      PrecioVenta: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false
      },
      Calificacion: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      Disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      imagen: {
        type: DataTypes.BLOB("long"),
        allowNull: true
      }
    },
    {
      tableName: "productos",
      timestamps: false
    }
  );
