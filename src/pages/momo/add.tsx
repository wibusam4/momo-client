import { Field, Form, Formik, FormikProps } from "formik";
import { type NextPage } from "next";
import Link from "next/link";
import * as Yup from "yup";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";

const LoginSchema = Yup.object().shape({
  phone: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});

interface FormAuth {
  phone: string;
  password: string;
}

const AddMomo: NextPage = () => {
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <div className="flex h-full w-full">
          <div className="h-full w-full p-2 sm:p-6">
            <div className="card rounded-box  h-full flex-grow bg-base-300 p-3 sm:p-10">
              <div className="text-xl font-bold">Thêm tài khoản Ví Momo</div>
              <div className="mt-4 flex gap-x-2">
                <Formik
                  initialValues={{
                    phone: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    //handleSubmit(values);
                  }}
                >
                  {(props: FormikProps<FormAuth>) => {
                    const { touched, errors } = props;
                    return (
                      <Form className="flex w-full flex-col gap-2">
                        <div className="form-control w-full max-w-xl">
                          <label className="label">
                            <span className="label-text">
                              Số điện thoại
                            </span>
                          </label>
                          <Field
                            className="input w-full"
                            name="phone"
                            placeholder="Số điện thoại"
                          />
                          {errors.phone && touched.phone ? (
                            <div className="alert alert-error mt-2 rounded p-2 text-white">
                              <div>
                                <span>{errors.phone}</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="form-control w-full max-w-xl">
                          <label className="label">
                            <span className="label-text">
                              Mật khẩu ví momo
                            </span>
                          </label>
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
                        </div>
                        <button
                          className={`btn-primary btn mt-4 hover:scale-105 max-w-xl`}
                          type="submit"
                        >
                          Lấy OTP
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default AddMomo;
