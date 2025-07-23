import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const HomeBtn = () => {
  return (
    <Link href={"/"}>
      <div
        title="Return Home"
        className="absolute top-20 cursor-pointer left-20 bg-blue-950 w-20 h-10 flex items-center justify-center text-2xl rounded-lg"
      >
        <FaHome />
      </div>
    </Link>
  );
};

export default HomeBtn;
