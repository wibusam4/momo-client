import axios from "axios";
import { GetServerSideProps, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";

interface Momo {
  id: string;
  phone: string;
  name: string;
  timeLogin: Date;
  balance: string;
}
interface RootObject {
  res: Momo[];
}
const Momo: React.FC<RootObject> = ({ res }) => {
  console.log(res);

  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <div className="flex h-full w-full">
          <div className="h-full w-full p-2 sm:p-6">
            <div className="card rounded-box  h-full flex-grow bg-base-300 p-3 sm:p-10">
              <div className="text-xl font-bold">
                Danh sách tài khoản Ví Momo
              </div>
              <div className="mt-4 flex gap-x-2">
                <Link href={`/momo/add`} className="btn-info btn">
                  Thêm ví mới
                </Link>
              </div>
              <div>
                <div className="mt-4 overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Số dư</th>
                        <th>Thời gian thêm</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {res &&
                        res.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th>{index}</th>
                              <td>{item.name}</td>
                              <td>{item.phone}</td>
                              <td>{item.balance}</td>
                              <td>{new Date(item.timeLogin).toString()}</td>
                              <td className="flex flex-wrap gap-1">
                                <button className="btn-primary btn btn-sm">Lịch sử giao dịch</button>
                                <button className="btn-secondary btn btn-sm">Chuyển tiền</button>
                                <button className="btn-success btn btn-sm">Rút tiền</button>
                                <button className="btn-info btn btn-sm">Lấy token</button>
                                <button className="btn-error btn btn-sm">Xóa</button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Momo;

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);

  const config = {
    method: "get",
    url: "http://localhost:5000/api/user/momo",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
  };
  const res = await axios(config)
    .then((result) => {
      return result.data.message;
    })
    .catch((error) => {
      console.log(error.data);
    });
  return { props: { res } };
};
