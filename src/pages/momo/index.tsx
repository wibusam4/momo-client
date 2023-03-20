import { MomoAction } from "../../actions/Momo.action";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";
import { Momo } from "~/model/Momo.model";
import moment from "moment";
import { useRouter } from "next/router";

interface RootObject {
  momoData: Momo[];
}

const Momo: React.FC<RootObject> = ({ momoData }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handelDelete = async (value: any) => {
    const respone = await MomoAction.deleteMomo(
      { id: value._id, phone: value.phone },
      session?.token
    );
    if (respone) {
      router.push(router.pathname);
    }
  };
  return (
    <>
      <Meta title="API-MOMO" description="API-MOMO" />
      <Main>
        <div className="flex w-full">
          <div className="w-full p-2 sm:p-6">
            <div className="card rounded-box flex-grow bg-base-300 p-3 lg:p-7">
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
                      {momoData &&
                        momoData.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th>{index}</th>
                              <td>{item.name}</td>
                              <td>{item.phone}</td>
                              <td>{item.balance}</td>
                              <td>
                                {moment(Number(item.timeLogin)).format(
                                  "DD-MM-YYYY hh:mm:ss"
                                )}
                              </td>
                              <td className="flex flex-wrap gap-1">
                                <button className="btn-primary btn-sm btn">
                                  Lịch sử giao dịch
                                </button>
                                <button className="btn-secondary btn-sm btn">
                                  Chuyển tiền
                                </button>
                                <button className="btn-success btn-sm btn">
                                  Rút tiền
                                </button>
                                <button className="btn-info btn-sm btn">
                                  Lấy token
                                </button>
                                <button
                                  className="btn-error btn-sm btn"
                                  onClick={() => {
                                    handelDelete(item);
                                  }}
                                >
                                  Xóa
                                </button>
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
  const momoData = await MomoAction.getById("get", "user/momo", session?.token);
  return { props: { momoData } };
};
