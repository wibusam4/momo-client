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
   
      <>
        <Sidebar isShow={isShow}></Sidebar>
        <div className={`${isShow ? "md:ml-60" : "md:ml-20"} h-screen duration-300 flex flex-col`}>
          <Header handel={handelShow}></Header>
          <div className="h-full">{children}</div>
        </div>
      </>
    
  );
};

export default Main;
