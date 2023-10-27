import config from "src/configs";
import { httpDelete, httpGet, httpPost } from "src/configs/axios";
import { CreateAccountType } from "src/interfaces/account.type";

export const accountUtil = {
  createAccount: async (options: CreateAccountType) => {
    const res = await httpPost(config.apiPath.user, options);
    return res.data;
  },
  getAccount: async (options: { search: string; role: string }) => {
    const res = await httpGet(config.apiPath.user, options);
    return res.data;
  },
  deleteAccount: async (id: number) => {
    const res = await httpDelete(config.apiPath.user + "/" + id);
    return res.data;
  },
};
