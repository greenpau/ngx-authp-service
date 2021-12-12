export interface IUserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
}

export class UserData implements IUserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
  constructor() {}
}
