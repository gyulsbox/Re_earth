import type { NextPage } from "next";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import welcome from "../assets/imgs/welcome.png";
import Link from "next/link";
import Button from "@components/button";

const Welcome: NextPage = () => {
  return (
    <div className="bg-[#FCF1E9] flex flex-col space-y-5 justify-around h-screen">
      <div className="w-96 mx-auto">
        <Image src={welcome} />
      </div>
      <div className="w-full">
        <div className="flex flex-col w-44 m-auto">
          <Link href={"/enter"}>
            <a>
              <Button text="Enter" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
