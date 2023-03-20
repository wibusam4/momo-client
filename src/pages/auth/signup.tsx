import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikProps } from "formik";
import Auth from "~/components/basic/layout/Auth";
import { FormSignup } from "~/model/User.model";
import { AuthAction } from "~/actions/Auth.action";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const value = await AuthAction.register(values);
    if (value) {
      router.push("/auth/signin");
    }
    setLoading(false);
  };
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <Auth isLogin={false}>
          <Formik
            initialValues={{
              name: "",
              username: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(props: FormikProps<FormSignup>) => {
              return (
                <Form className="flex flex-col gap-4">
                  <Field
                    className="input mt-8 w-full"
                    name="name"
                    placeholder="Tên người dùng"
                  />
                  <Field
                    className="input w-full"
                    name="username"
                    placeholder="Tên đăng nhập"
                  />

                  <Field
                    className="input w-full"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                  />
                  <Field
                    className="input w-full"
                    name="passwordConfirm"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                  />

                  <button
                    className={`btn-primary btn mt-4 hover:scale-105 ${
                      isLoading ? "loading" : ""
                    }`}
                    type="submit"
                  >
                    Đăng Kí
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Auth>
      </Main>
    </>
  );
};

export default Signup;
