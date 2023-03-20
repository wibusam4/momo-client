import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { config } from ".";
export const MomoAction = {
  getById: async (method: string, url: string, token?: string) => {
    const response = await axios(config(method, url, token))
      .then((result) => {
        return result.data.message;
      })
      .catch((err) => {
        return err.data;
      });
    return response;
  },

  addMomo: async (values: any, token: string) => {
    if (values.phone === "") {
      toast.error("Vui lòng nhập số điện thoại!");
      return false;
    }
    const data = {
      action: "GET-OTP",
      phone: values.phone,
    };
    const response = await axios(config("post", "user/momo", token, data))
      .then((result) => {
        toast.success(result.data.message);
        return true;
      })
      .catch((err) => {
        const error = err.response.data.message;
        if (error) toast.error(error);
        else toast.error("Có lỗi xảy ra!");
        return false;
      });
  },

  deleteMomo: async (values: any, token: string) => {
    if (values.id === "") {
      toast.error("Bạn bị ban!");
      return false;
    }
    const response = Swal.fire({
      title: `Bạn muốn xóa số điện thoại 0${values.phone} `,
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios(
          config("put", "user/momo", token, { id: values.id })
        )
          .then((result) => {
            toast.success(result.data.message);
            return true;
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
        return response;
      }
    });
    return response;
  },
};
