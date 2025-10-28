export interface AuthStates {
  me: MeType | null;
}

export interface AuthActions {
  setMe: (me: MeType | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export type MeType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  user_type: {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    is_admin: boolean;
  };
};
