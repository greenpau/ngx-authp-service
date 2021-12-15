export interface IUserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
  origin?: string;
  raw?: object;
}

export class UserData implements IUserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
  origin?: string;
  raw?: object;
  constructor(data: object = {}) {
    this.raw = data;
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'email':
          this.email = value;
          break;
        case 'sub':
          this.id = value;
          break;
        case 'name':
          this.name = value;
          break;
        case 'roles':
          this.roles = value;
          break;
        case 'picture':
          this.avatar = value;
          break;
        case 'origin':
          this.origin = value;
          break;
        default:
          break;
      }
    }
  }
}
