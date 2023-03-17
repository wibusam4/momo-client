import axios from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { FormOtp } from "~/model/Momo";

const LoginSchema = Yup.object().shape({
  phone: Yup.string().required("Không được để trống"),
});

interface GetOtpProps {
  setGetOtp: any;
}
const GetOtp: React.FC<GetOtpProps> = ({ setGetOtp }) => {
  const { data: session } = useSession();
  const handleSubmit = async (values: FormOtp) => {
    if (values.phone === "") {
      return toast.error("Vui lòng nhập số điện thoại!", {
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
      action: "GET-OTP",
      phone: values.phone,
    };
    const config = {
      method: "post",
      url: "http://localhost:5000/api/user/momo",
      headers: {
        authorization: `Bearer ${session?.token}`,
      },
      data: data,
    };
    await axios(config)
      .then((result) => {
        toast.success("Lấy OTP thành công!");
        setGetOtp(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        phone: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props: FormikProps<FormOtp>) => {
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
              />
            </div>

            <button
              className={`btn-primary btn mt-4 max-w-xl hover:scale-105`}
              type="submit"
            >
              Lấy OTP
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GetOtp;
