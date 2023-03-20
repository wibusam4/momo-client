import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikProps } from "formik";
import Auth from "~/components/basic/layout/Auth";
import { FormSignin } from "~/model/User.model";
import { AuthAction } from "~/actions/Auth.action";
import { useState } from "react";

const Signin = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const value = await AuthAction.login(values);
    if (value) {
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <Auth isLogin={true}>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(props: FormikProps<FormSignin>) => {
              return (
                <Form className="flex flex-col gap-4">
                  <Field
                    className="input mt-8 w-full"
                    name="username"
                    placeholder="username"
                  />

                  <Field
                    className="input w-full"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                  />

                  <button
                    className={`btn-primary btn mt-4 hover:scale-105 ${isLoading ? "loading" : ""}`}
                    type="submit"
                  >
                    Đăng Nhập
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

export default Signin;
