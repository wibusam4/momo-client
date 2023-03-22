import axios from "axios";
import { GetServerSideProps, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import ChangePass from "~/components/basic/Form/ChangePass";
import InforUser from "~/components/basic/InforUser";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";
import { Account } from "~/model/User.model";

interface RootObject {
  user: Account;
}
const User: React.FC<RootObject> = ({ user }) => {
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <div className="flex w-full">
          <div className="w-full p-2 lg:p-6">
            <div className="rounded-box0 card flex-grow bg-base-300 p-3 lg:p-7">
              <div className="text-xl font-bold">Thông tin tài khoản</div>
              <div>
                <div className="mt-4 flex w-full flex-wrap gap-y-2">
                  <div className="w-full p-2 lg:w-2/6">
                    <div className="rounded bg-base-100 p-4 ">
                      <div className="flex items-center gap-x-2 border-b border-base-content py-2">
                        <img
                          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.name}`}
                          alt=""
                          className="rounded-full"
                        />
                        <p className="text-xl font-semibold uppercase">
                          {user.name}
                        </p>
                      </div>
                      <InforUser label="Người dùng" value={user.name} />
                      <InforUser label="Số dư" value={`${user.money}đ`} />
                      <InforUser label="Chức vụ" value={user.role} />
                      <InforUser
                        label="Số lượng tài khoản Momo"
                        value={user.limit}
                      />
                    </div>
                  </div>
                  <div className="w-full p-2 lg:w-4/6">
                    <div className="rounded bg-base-100 p-4">
                      <div className="flex items-center gap-x-2 border-b border-base-content py-2">
                        <p className="text-xl font-semibold uppercase">
                          Đổi mật khẩu
                        </p>
                      </div>
                      <div className="flex flex-col-reverse xl:flex-row ">
                        <ChangePass />
                        <div className="mx-auto py-2 lg:p-10 box-border">
                          <div className="flex w-full items-center justify-center">
                            <img
                              className="w-[220px] rounded-md object-cover"
                              alt="Icewall Tailwind HTML Admin Template"
                              src="/assets/images/girl.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);

  const config = {
    method: "get",
    url: "https://sieuthiapi.site/backend/user/infor",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
  };
  const user = await axios(config)
    .then((result) => {
      return result.data.message;
    })
    .catch((error) => {
      console.log(error);
    });
  return { props: { user } };
};
