/**
 * define model interface `I***Model`
 */
export interface IUserModel {
  token: string | null;
  refreshToken: string | null;
  id: number | null;
  name: string;
  userRole: number | null;
}

/**
 * define a model initial object `***ModelInitial`
 */
export const UserModelInitial: IUserModel = {
  token: null,
  refreshToken: null,
  id: null,
  name: '',
  userRole: null,
}
