import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Op } from "sequelize";
import { UsuariosRepository } from "../repositories/usuarios.repository.js";

config();

export class UsersService {
  constructor({ usuariosRepository } = {}) {
    this.usuariosRepository = usuariosRepository || new UsuariosRepository();
  }

  async list({ email } = {}) {
    if (!email) return this.usuariosRepository.findAll();

    return this.usuariosRepository.findAll({
      where: {
        Correo: {
          [Op.like]: `%${email}%`
        }
      }
    });
  }

  async getById(id) {
    return this.usuariosRepository.findById(id);
  }

  async create(input) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 2);
    const hashedPassword = await bcrypt.hash(input.Contrasena, saltRounds);

    const data = {
      ...input,
      Contrasena: hashedPassword,
      EstadoUsuario: input.EstadoUsuario ?? input.Estado ?? input.estadoUsuario ?? "Activo"
    };

    return this.usuariosRepository.create(data);
  }

  async update(id, input) {
    const data = { ...input };

    if (typeof data.Contrasena === "string" && data.Contrasena.length > 0) {
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 2);
      data.Contrasena = await bcrypt.hash(data.Contrasena, saltRounds);
    } else {
      delete data.Contrasena;
    }

    if (data.Estado && !data.EstadoUsuario) {
      data.EstadoUsuario = data.Estado;
      delete data.Estado;
    }

    return this.usuariosRepository.updateById(id, data);
  }

  async delete(id) {
    return this.usuariosRepository.deleteById(id);
  }

  async login({ Correo, Contrasena }) {
    const users = await this.usuariosRepository.findAll({
      where: {
        Correo
      },
      limit: 1
    });

    const user = users[0] || null;
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(Contrasena, user.Contrasena);
    if (!match) {
      throw new Error("Password incorrect");
    }

    const payload = {
      Correo: user.Correo,
      Rol: user.ID_Rol
    };

    const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });

    return { token, role: user.ID_Rol };
  }
}
