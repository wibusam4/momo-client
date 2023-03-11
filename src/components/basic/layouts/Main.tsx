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
    <div className="flex">
      <Sidebar isShow={isShow}></Sidebar>
      <Header handel={handelShow}></Header>
      <div className="">{children}</div>
    </div>
  );
};

export default Main;
