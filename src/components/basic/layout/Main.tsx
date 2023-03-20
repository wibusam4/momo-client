import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const [isShow, setIsShow] = useState(true);
  const handelShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div>
      <Sidebar isShow={isShow}></Sidebar>
      <div
        className={`${
          isShow ? "md:ml-60" : "md:ml-20"
        } flex  h-screen flex-col duration-300`}
      >
        <Header handel={handelShow}></Header>
        <div  className="overflow-scroll h-full">{children}</div>
      </div>
    </div>
  );
};

export default Main;
