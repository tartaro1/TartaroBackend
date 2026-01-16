import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "ContenidoInformativo",
    {
      ID_Contenido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      Titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Contenido: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: "contenido_informativo",
      timestamps: false
    }
  );
