import { Dayjs } from 'dayjs';

export interface userModel {
  avatarUrl?: string;
  createdAt?: string;
  email?: string;
  fullName?: string;
  ratioCold?: number;
  ratioElec?: number;
  ratioHot?: number;
  updatedAt?: string;
  __v?: number;
  _id?: number;
}

export interface DataType {
  createDate?: Dayjs | null | undefined;
  edit?: any;
  _id?: string;
  hotWater: number;
  coldWater: number;
  electric: number;
  addPayment?: number[];
  user?: {
    _id: string;
    fullName: string;
    email: string;
    hash: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt?: string;
  updatedAt?: string | moment.Moment;
  __v?: number;
}
