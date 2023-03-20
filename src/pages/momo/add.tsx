import { Field, Form, Formik, FormikProps } from "formik";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import GetOtp from "~/components/basic/Form/GetOtp";
import LoginMomo from "~/components/basic/Form/LoginMomo";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";

const AddMomo: NextPage = () => {
  const [isGetOtp, setIsGetOtp] = useState(true);
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <div className="flex h-full w-full">
          <div className="h-full w-full p-2 sm:p-6">
            <div className="card rounded-box flex-grow bg-base-300 p-3 sm:p-10">
              <div className="text-xl font-bold">Thêm tài khoản Ví Momo</div>
              <div className="mt-4 flex gap-x-2">
                {isGetOtp ? <GetOtp setGetOtp={setIsGetOtp} /> : <LoginMomo />}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default AddMomo;
