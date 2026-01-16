import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Usuario",
    {
      ID_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Celular: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      Cedula: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      Direccion: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      Correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      Contrasena: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      ID_Rol: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      EstadoUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "usuarios",
      timestamps: false
    }
  );
