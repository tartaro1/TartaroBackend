import bcrypt from "bcrypt";
import { config } from "dotenv";
import { Op } from "sequelize";
import { UsuariosRepository } from "../repositories/usuarios.repository.js";

config();

export class DealersService {
  constructor({ usuariosRepository } = {}) {
    this.usuariosRepository = usuariosRepository || new UsuariosRepository();
  }

  async list({ email } = {}) {
    const where = { ID_Rol: 3 };

    if (email) {
      where.Correo = {
        [Op.like]: `%${email}%`
      };
    }

    return this.usuariosRepository.findAll({ where });
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
      ID_Rol: input.ID_Rol ?? 3,
      EstadoUsuario: input.EstadoUsuario ?? input.Estado ?? "Activo"
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

    if (!data.ID_Rol) {
      data.ID_Rol = 3;
    }

    return this.usuariosRepository.updateById(id, data);
  }

  async delete(id) {
    return this.usuariosRepository.deleteById(id);
  }
}
