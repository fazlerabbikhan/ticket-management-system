export interface BaseUser {
  type: string;
  description: string;
}
export interface User extends BaseUser {
  id: number;
}