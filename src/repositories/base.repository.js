export class BaseRepository {
  constructor({ model, primaryKeyField }) {
    this.model = model;
    this.primaryKeyField = primaryKeyField;
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async create(data, options = {}) {
    return this.model.create(data, options);
  }

  async updateById(id, data, options = {}) {
    const instance = await this.findById(id, options);
    if (!instance) return null;
    return instance.update(data, options);
  }

  async deleteById(id, options = {}) {
    const instance = await this.findById(id, options);
    if (!instance) return false;
    await instance.destroy(options);
    return true;
  }
}
