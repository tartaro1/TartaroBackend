import { ProveedoresRepository } from "../repositories/proveedores.repository.js";

export class ProvidersService {
  constructor({ proveedoresRepository } = {}) {
    this.proveedoresRepository = proveedoresRepository || new ProveedoresRepository();
  }

  async list() {
    return this.proveedoresRepository.findAll();
  }

  async getById(id) {
    return this.proveedoresRepository.findById(id);
  }

  async create(input) {
    return this.proveedoresRepository.create(input);
  }

  async update(id, input) {
    return this.proveedoresRepository.updateById(id, input);
  }

  async delete(id) {
    return this.proveedoresRepository.deleteById(id);
  }
}
