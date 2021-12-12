export interface IPersonaData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
}

export class PersonaData implements IPersonaData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
  constructor() {}
}
