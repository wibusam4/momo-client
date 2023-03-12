import { useSession } from "next-auth/react";
import setTheme from "~/components/hooks/setTheme";
import Dropdown from "~/components/Icons/Dropdown";
import Menu from "~/components/Icons/Menu";
import Theme from "~/components/Icons/Theme";
import { dataTheme } from "~/untils";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface HeaderProps {
  handel: any;
}

const Header: React.FC<HeaderProps> = ({ handel }) => {
  const { data: session } = useSession();
  const { theme, handleChangeTheme } = setTheme();
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-200 bg-opacity-90 text-base-content shadow-sm backdrop-blur transition-all duration-300">
      <div className="navbar w-full">
        <div className="flex-1">
          <button className="btn-ghost btn" onClick={handel}>
            <Menu />
          </button>
        </div>
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn gap-1 normal-case">
              <Theme />
              <span className="hidden md:inline">Theme</span>
              <Dropdown />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content rounded-t-box rounded-b-box top-px mt-16 w-40 overflow-y-auto bg-base-200 text-base-content shadow-2xl"
            >
              <ul
                className="menu menu-compact max-h-[50vh] flex-nowrap gap-1 overflow-y-scroll p-3"
                tabIndex={0}
              >
                {dataTheme.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleChangeTheme(item)}
                    className={`btn-ghost btn h-10 min-h-[8px] ${
                      theme === item && "bg-primary"
                    } `}
                  >
                    <a>{item}</a>
                  </button>
                ))}
              </ul>
            </div>
          </div>
          {session ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => signOut()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ):(
            <Link className="btn btn-error" href={`/auth/signin`}>
              SIGNIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
