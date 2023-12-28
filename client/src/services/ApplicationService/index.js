import { BaseService } from '../BaseService';

class ApplicationService extends BaseService {
  async create(values) {
    return await this.instance.post('/application/create', values);
  } 

  async getAll() {
    return await this.instance.get('/application/all');
  }

  async getOne(id) {
    return await this.instance.get(`/application/${id}`);
  }

  async confirm(id) {
    return await this.instance.get(`application/${id}/user/confirm`);
  }

}

export default new ApplicationService()