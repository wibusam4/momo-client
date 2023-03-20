import { Field, Form, Formik, FormikProps } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MomoAction } from "~/actions/Momo.action";
import { FormOtp } from "~/model/Momo.model";

interface GetOtpProps {
  setGetOtp: any;
}
const GetOtp: React.FC<GetOtpProps> = ({ setGetOtp }) => {
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleSubmit = async (values: FormOtp) => {
    setLoading(true);
    const data = await MomoAction.addMomo(values, session?.token);
    setLoading(false);
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
              className={`btn-primary btn mt-4 max-w-xl hover:scale-105 ${
                isLoading ? "loading" : ""
              }`}
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
