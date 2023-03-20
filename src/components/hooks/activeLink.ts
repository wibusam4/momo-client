import { useEffect, useState } from "react";
import { getLocal, setLocal } from "../../untils";

const activeLink = () => {
  const [link, setLink] = useState("");

  return {
    link,
    setLink,
  };
};
export default activeLink;
