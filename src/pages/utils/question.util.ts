import config from "src/configs";
import { httpDelete, httpGet, httpPost, httpPut } from "src/configs/axios";
import {
  CreateQuestionParams,
  getQuestionParams,
} from "src/interfaces/question.type";

export const createQuestion = async (data: CreateQuestionParams) => {
  const res = await httpPost(config.apiPath.question, {
    ...data,
    ansers: data.ansers.filter((anser) => anser),
  });
  return res.data;
};

export const getQuestions = async (filter: getQuestionParams) => {
  const res = await httpGet(config.apiPath.question, filter);
  return res.data;
};

export const getQuestionUtil = async (id: string) => {
  const res = await httpGet(config.apiPath.question + "/" + id);
  return res.data;
};
export const editQuestionUtil = async (params: { id: number; value: any }) => {
  const res = await httpPut(
    config.apiPath.question + "/" + params.id,
    params.value
  );
  return res.data;
};

export const deleteQuestionUtil = async (params: { id: number }) => {
  const res = await httpDelete(config.apiPath.question + "/" + params.id);
  return res;
};
