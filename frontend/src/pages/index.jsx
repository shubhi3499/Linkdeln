import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <div className="mainContainer">
          <div className="mainContainer_left">
            <p>Connect with friends without exxageration</p>
            <p>A true social media platform with stories and no blufs!</p>

            <div onClick={()=>{router.push("/login")}}className="buttonJoin">
              <p>Join Now</p>
            </div>
          </div>
          <div className="mainContainer_right">
            <img src="images/homemain.png" alt=""></img>
          </div>
        </div>
      </div>
    </>
  );
}
