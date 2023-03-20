import { Field, Form, Formik, FormikProps } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AuthAction } from "~/actions/Auth.action";
import { FormChangePass } from "~/model/User.model";

const ChangePass: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleSubmit = async (values: FormChangePass) => {
    setLoading(true);
    const data = await AuthAction.changePass(values, session?.token);
    setLoading(false);
  };
  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(props: FormikProps<FormChangePass>) => {
        const { touched, errors } = props;
        return (
          <Form className="flex-1 max-w-xl mt-6 xl:mt-0">
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Mật khẩu hiện tại</span>
              </label>
              <Field
                className="w-full rounded border p-2 focus:outline-base-300"
                name="currentPassword"
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Mật khẩu mới</span>
              </label>
              <Field
                className="w-full rounded border p-2 focus:outline-base-300"
                name="newPassword"
                type="password"
                placeholder="Mật khẩu mới"
              />
            </div>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Xác nhận mật khẩu mới</span>
              </label>
              <Field
                className="w-full rounded border p-2 focus:outline-base-300"
                name="confirmPassword"
                type="password"
                placeholder="Mật khẩu xác nhận"
              />
            </div>

            <button
              className={`btn-error btn mt-4 max-w-xl hover:scale-105 ${
                isLoading ? "loading" : ""
              }`}
              type="submit"
            >
              Đổi mật khẩu
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangePass;
