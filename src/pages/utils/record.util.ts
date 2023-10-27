import config from "src/configs";
import { httpGet } from "src/configs/axios";
import { profileUtil } from "./profile.util";
import { toast } from "react-toastify";

export const recordUtil = {
  getRecord: async (params: { id: string }) => {
    try {
      const res = await httpGet(config.apiPath.record + "/" + params.id);
      return res.data;
    } catch (error) {
      toast("Không tìm thấy lịch sử.");
    }
  },

  getRecords: async (params: { id: number; search: string }) => {
    const res = await profileUtil.getUserProfile(params.id);
    if (res?.record?.length < 1) return [];
    console.log(res);
    const result = res.record.map((item: any) => {
      return {
        id: item.id,
        email: res.email,
        examId: item.examId,
        examType: item.examType,
        ansers: item.ansers,
        score: item.score,
        createdAt: item.createdAt,
      };
    });
    return result;
  },
};
