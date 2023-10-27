import { toast } from "react-toastify";
import config from "src/configs";
import { httpGet, httpPost } from "src/configs/axios";
import { VerifyParams } from "src/interfaces/auth.type";

export const authUtil = {
  getUser: async () => {
    try {
      const res = await httpGet(config.apiPath.userInfo);
      console.log("res", res.data);
      return res?.data;
    } catch (error) {}
  },

  signIn: async (value: { email: string; password: string }) => {
    const res = await httpPost(config.apiPath.signIn, {
      email: value.email,
      password: value.password,
    });

    return res.data;
  },

  signUp: async (value: { email: string; password: string }) => {
    try {
      const res = await httpPost(config.apiPath.signUp, {
        email: value.email,
        password: value.password,
      });

      return res;
    } catch (error) {
      console.log(error);
      toast.error("Tài khoản đã tồn tại!");
      return false;
    }
  },
  // changePassword: async (value: { email: string; password: string }) => {
  //   try {
  //     const res = await httpPost(config.apiPath.signUp, {
  //       email: value.email,
  //       password: value.password,
  //     });

  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Tài khoản đã tồn tại!");
  //     return false;
  //   }
  // },

  changePass: async (value: {
    email: string;
    password: string;
    oldPassword: string;
  }) => {
    try {
      const res = await httpPost(config.apiPath.changePassword, {
        email: value.email,
        password: value.password,
        oldPassword: value.oldPassword,
      });

      return res;
    } catch (error) {
      console.log(error);
      toast.error("Đổi thất bại! Kiểm tra lại thông tin nhập.");
      return false;
    }
  },
  resetPassword: async (value: { email: string; password: string }) => {
    try {
      const res = await httpPost(config.apiPath.resetPassword, {
        email: value.email,
        password: value.password,
      });

      return res;
    } catch (error) {
      toast.error("Đổi thất bại! Kiểm tra lại thông tin nhập.");
      return false;
    }
  },

  signUpMail: async (email: string) => {
    try {
      await httpPost(config.apiPath.signUpMail, {
        email,
        type: "signUp",
      });
      toast.success("Đã gửi mã xác nhận");
    } catch (error) {
      toast.error("Tài khoản đã tồn tại!");
    }
  },

  changePasswordMail: async (email: string) => {
    try {
      await httpPost(config.apiPath.changePasswordMail, {
        email,
        type: "changePassword",
      });
      toast.success("Đã gửi mã xác nhận");
    } catch (error) {
      toast.error("Gửi thất bại!");
    }
  },

  resetPasswordMail: async (email: string) => {
    try {
      await httpPost(config.apiPath.resetPasswordMail, {
        email,
        type: "resetPassword",
      });
      toast.success("Đã gửi mã xác nhận");
    } catch (error) {
      toast.error("Gửi thất bại!");
    }
  },

  mailVerify: async (options: VerifyParams) => {
    try {
      const data = await httpPost(config.apiPath.verify, {
        type: "signUp",
        ...options,
      });
      return data;
    } catch (error) {
      toast.error("Mã xác nhận không đúng");
    }
  },
};
