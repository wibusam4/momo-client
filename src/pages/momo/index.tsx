import { type NextPage } from "next";
import Link from "next/link";
import Main from "~/components/basic/layout/Main";
import Meta from "~/components/basic/layout/Meta";

const Momo: NextPage = () => {
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
                <Link href={`/momo/add`} className="btn-info btn">Thêm ví mới</Link>
              </div>
              <div>
                <div className="mt-4 overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Tên tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Số dư</th>
                        <th>Thời gian thêm</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                        <td>Blue</td>
                        <td>Blue</td>
                      </tr>
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
