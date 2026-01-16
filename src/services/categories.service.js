import { CategoriasRepository } from "../repositories/categorias.repository.js";

export class CategoriesService {
  constructor({ categoriasRepository } = {}) {
    this.categoriasRepository = categoriasRepository || new CategoriasRepository();
  }

  async list() {
    return this.categoriasRepository.findAll();
  }

  async getById(id) {
    return this.categoriasRepository.findById(id);
  }

  async create(input) {
    return this.categoriasRepository.create(input);
  }

  async update(id, input) {
    return this.categoriasRepository.updateById(id, input);
  }

  async delete(id) {
    return this.categoriasRepository.deleteById(id);
  }
}
