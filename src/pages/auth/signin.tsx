import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Auth from "~/components/basic/layout/Auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});
interface SigninProps {}
interface FormAuth {
  username: string;
  password: string;
}
const Signin: React.FC<SigninProps> = () => {
  const router = useRouter();
  const handleSubmit = async (value: any) => {
    signIn("credentials", {
      ...value,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success("Đăng nhập thành công!");
          router.push("/");
        } else {
          toast.error("Tài khoản hoặc mật khẩu không chính xác!");
        }
      })
      .catch((err) => {
        toast.success(err, {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "red",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      });
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
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(props: FormikProps<FormAuth>) => {
              const { touched, errors } = props;
              return (
                <Form className="flex flex-col gap-4">
                  <Field
                    className="input mt-8 w-full"
                    name="username"
                    placeholder="username"
                  />
                  {errors.username && touched.username ? (
                    <div className="alert alert-error mt-2 rounded p-2 text-white">
                      <div>
                        <span>{errors.username}</span>
                      </div>
                    </div>
                  ) : null}

                  <Field
                    className="input w-full"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                  />
                  {errors.password && touched.password ? (
                    <div className="alert alert-error mt-2 rounded p-2 text-white">
                      <div>
                        <span>{errors.password}</span>
                      </div>
                    </div>
                  ) : null}
                  <button
                    className={`btn-primary btn mt-4 hover:scale-105`}
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
