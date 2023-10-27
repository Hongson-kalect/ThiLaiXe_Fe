import { toast } from "react-toastify";
import config from "src/configs";
import { httpDelete, httpGet, httpPost } from "src/configs/axios";
import { GetExamparam } from "src/interfaces/exam.type";

export const examTypeOptions = [
  {
    value: "a1",
    label: "Bằng A",
  },
  {
    value: "b1",
    label: "Bằng B1",
  },
  {
    value: "b2",
    label: "Bằng B2",
  },
  {
    value: "c",
    label: "Bằng C",
  },
  {
    value: "def",
    label: "Bằng D, E, F",
  },
];

export const questionListForType = {
  a1: { t1: 8, t2: 0, t3: 1, t4: 1, t5: 0, t6: 7, t7: 7, require: 1 },
  b1: { t1: 8, t2: 0, t3: 1, t4: 1, t5: 1, t6: 9, t7: 9, require: 1 },
  b2: { t1: 9, t2: 1, t3: 1, t4: 2, t5: 1, t6: 10, t7: 10, require: 1 },
  c: { t1: 9, t2: 1, t3: 1, t4: 2, t5: 1, t6: 14, t7: 11, require: 1 },
  def: { t1: 9, t2: 1, t3: 1, t4: 2, t5: 1, t6: 16, t7: 14, require: 1 },
};

export const examUtil = {
  createExam: async (data: any) => {
    return await httpPost(config.apiPath.exam, data);
  },

  autoCreate: async (data: { type: string; name: string }) => {
    return await httpPost(config.apiPath.exam + "/ramdom", data);
  },
  getExam: async (data: any) => {
    const res = await httpGet(config.apiPath.exam, data);
    return res.data;
  },

  getExamById: async (id: string | number) => {
    const res = await httpGet(config.apiPath.exam + "/" + id);
    return res.data;
  },

  getExamByType: async (type: string) => {
    const res = await httpGet(config.apiPath.exam + "/" + type + "/random");
    return res.data;
  },

  deleteExam: async (id: number) => {
    try {
      const res = await httpDelete(config.apiPath.exam + "/" + id);
      toast.success("Xóa thành công");
      return res.data;
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  },

  submitAnser: async (data: {
    anser: number[];
    examId: number;
    questionId: number[];
  }) => {
    const res = await httpPost(config.apiPath.exam + "/submit", data);
    return res.data;
  },

  submitAndSaveAnser: async (data: {
    anser: number[];
    examId: number;
    questionId: number[];
  }) => {
    const res = await httpPost(config.apiPath.exam + "/submit/save", data);
    return res.data;
  },
};
