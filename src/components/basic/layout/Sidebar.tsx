import Link from "next/link";
import { useRouter } from "next/router";
import Dollar from "~/components/Icons/Dollar";
import IconHome from "~/components/Icons/Home";
import User from "~/components/Icons/User";
import Wallet from "~/components/Icons/Wallet";

interface SidebarProps {
  isShow: boolean;
}
const menu = [
  { name: "Tài Khoản", slug: "/user", icon: <User /> },
  { name: "Ví Momo", slug: "/momo", icon: <Wallet /> },
  { name: "Nạp tiền", slug: "/recharge", icon: <Dollar /> },
];
const Sidebar: React.FC<SidebarProps> = ({ isShow }) => {
  const router = useRouter();
  return (
    <div
      className={`fixed top-0 bottom-0 z-30 flex  ${
        isShow ? "w-0 md:w-60" : "w-80 md:w-20"
      } flex-col items-center overflow-hidden  bg-gradient-to-b from-accent to-neutral text-base-100 duration-300`}
    >
      <div className="w-full px-2">
        <Link
          className={`${
            isShow ? "" : "md:justify-center"
          } mt-3 flex w-full items-center px-3 py-2`}
          href="/"
        >
          <svg
            className="h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <span
            className={`${isShow ? "" : "md:hidden"} ml-2 text-sm font-bold`}
          >
            Siêu Thị API
          </span>
        </Link>
      </div>
      <div className="w-full px-2">
        {/* <div className="mt-[18px] flex w-full flex-col items-center border-t border-gray-700">
          <a
            className={`${
              isShow ? "" : "md:justify-center"
            } mt-2 flex h-12 w-full items-center rounded px-3 hover:bg-gray-700 hover:text-gray-300`}
            href="#"
          >
            
            <span
              className={`${
                isShow ? "" : "md:hidden"
              } ml-2 text-sm font-medium`}
            >
              Dasboard
            </span>
          </a>
        </div> */}
        <div className="mt-1 flex w-full flex-col items-center border-t border-base-300">
          {menu.map((item) => {
            return (
              <Link
                key={item.slug}
                className={`${
                  isShow ? "" : "md:justify-center"
                } mt-2 flex h-12 w-full items-center rounded px-3 duration-300 hover:bg-base-200 hover:text-neutral ${
                  router.pathname == item.slug ? "bg-info" : ""
                }`}
                href={item.slug}
              >
                {item.icon}
                <span
                  className={`${
                    isShow ? "" : "md:hidden"
                  } ml-2 text-sm font-medium`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <a
        className="mt-auto flex h-16 w-full items-center justify-center bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
        href="#"
      >
        <svg
          className="h-6 w-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className={`${isShow ? "" : "md:hidden"} ml-2 text-sm font-medium`}
        >
          Account
        </span>
      </a>
    </div>
  );
};

export default Sidebar;
