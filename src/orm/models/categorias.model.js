import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Categoria",
    {
      ID_Categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      EstadoCategoria: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "categorias",
      timestamps: false
    }
  );
