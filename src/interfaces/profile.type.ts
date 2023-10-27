import { RecordType } from "./record.type";

export type ProfileType = {
  id: number;
  firstName: string;
  lastName: string;
  date_of_birth: string;
  place_of_birth: string;
  phone: string;
  address: string;
};

export type UserProfileType = {
  email: string;
  id?: number;
  username?: string;
  role?: string;
  createdAt?: string;
  profile: null | ProfileType;
  record: RecordType[];
};

export type SetProfileParams = {
  id: number;
  profileId: number;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  date_of_birth?: string;
  place_of_birth?: string;
  phone?: string;
  address?: string;
};
