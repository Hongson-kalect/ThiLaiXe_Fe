import config from "src/configs";
import { httpGet, httpPost } from "src/configs/axios";
import { SetProfileParams, UserProfileType } from "src/interfaces/profile.type";

export const profileUtil = {
  getUserProfile: async (id: number) => {
    if (!id) return null;
    const res = await httpGet(config.apiPath.user + "/" + id);
    return res.data;
  },
  setUserProfile: async (data: SetProfileParams) => {
    const res = await httpPost(config.apiPath.user + "/profile", data);
    return res.data;
  },
};
