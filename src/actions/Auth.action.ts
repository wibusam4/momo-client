import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { config } from ".";
export const AuthAction = {
  login: async (value: any) => {
    if (value.username == "") {
      toast.error("Vui lòng nhập tài khoản!");
      return false;
    }
    if (value.password == "") {
      toast.error("Vui lòng nhập tài khoản!");
      return false;
    }
    const response = signIn("credentials", {
      ...value,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success("Đăng nhập thành công!");
          return true;
        } else {
          toast.error("Tài khoản hoặc mật khẩu không chính xác!");
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
    return response;
  },

  register: async (values: any) => {
    if (values.name == "") {
      toast.error("Vui lòng nhập tên!");
      return false;
    }
    if (values.username == "") {
      toast.error("Vui lòng nhập tài khoản!");
      return false;
    }
    if (values.password == "") {
      toast.error("Vui lòng nhập tài khoản!");
      return false;
    }
    if (values.passwordConfirm == "") {
      toast.error("Vui lòng nhập mật khẩu xác nhận!");
      return false;
    }
    if (values.password != values.passwordConfirm) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return false;
    }
    const response = await axios(config("post", "user/register", "", values))
      .then((result) => {
        toast.success("Đăng kí thành công!");
        return true;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return false;
      });

    return response;
  },

  changePass: async (values: any, token:string) => {
    if (
      !values.currentPassword ||
      !values.newPassword ||
      !values.confirmPassword
    ) {
      toast.error("Điền đủ thông tin!");
      return false;
    }
  },
};
