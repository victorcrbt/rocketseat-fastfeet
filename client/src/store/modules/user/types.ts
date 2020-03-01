export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  profile: User | null;
}
