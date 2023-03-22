import axios from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { FormMomo } from "~/model/Momo.model";

const LoginMomo = () => {
  const { data: session } = useSession();
  const handleSubmit = async(values: FormMomo) => {
    if (values.phone === "") {
      toast.error("Vui lòng nhập số điện thoại!", {
        style: {
          border: "1px solid white",
          backgroundColor: "red",
          color: "white",
        },
        iconTheme: {
          primary: "white",
          secondary: "red",
        },
      });
    }
    const data = {
      action: "CHECK-OTP",
      phone: values.phone,
      password: values.password,
      otp: values.otp
    };
    const config = {
      method: "post",
      url: "https://sieuthiapi.site/backend/user/momo",
      headers: {
        authorization: `Bearer ${session?.token}`,
      },
      data: data,
    };
    await axios(config)
      .then((result) => {
        toast.success("Đăng nhập thành công!");
        useRouter().push("/momo");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
        otp: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props: FormikProps<FormMomo>) => {
        const { touched, errors } = props;
        return (
          <Form className="flex w-full flex-col gap-2">
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Số điện thoại</span>
              </label>
              <Field
                className="input w-full"
                name="phone"
                placeholder="Số điện thoại"
                autoComplete="off"
              />
            </div>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Mật khẩu</span>
              </label>
              <Field
                className="input w-full"
                name="password"
                placeholder="Mật khẩu"
                type="password"
              />
            </div>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">OTP</span>
              </label>
              <Field
                className="input w-full"
                name="otp"
                placeholder="OTP"
              />
            </div>


            <button
              className={`btn-primary btn mt-4 max-w-xl hover:scale-105`}
              type="submit"
            >
              Đăng nhập
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginMomo;
