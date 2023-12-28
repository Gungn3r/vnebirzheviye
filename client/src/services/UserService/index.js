import { BaseService } from '../BaseService';

class UserService extends BaseService {
  async login(values) {
    return await this.instance.post('/user/login', values);
  }

  async register(values) {
    return await this.instance.post('/user/registration', values);
  }
}

export default new UserService()