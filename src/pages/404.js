import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page404() {
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/");
  //   }, 2100);
  // }, [router]);

  return (
    <main className="grow flex flex-col mx-auto max-w-2xl pt-20 ">
      {/* prettier-ignore */}
      <pre className=" pt-16 text-xs c2:text-la1 px-4  xl:text-la1 w-full font-bold bg-gradient-to-b from-violet-500 to-emerald-la bg-clip-text text-transparent">
NOT FOUND ERROR 404/ NOT FOUND ERROR 404<br/>
----------------------------------------<br/>
#          :::      :::::::      :::   #<br/>
#        :+:      :+:   :+:    :+:     #<br/>
#      +:+ +:+   +:+   +:+   +:+ +:+   #<br/>
#    +#+  +:+   +#+   +:+  +#+  +:+    #<br/>
#  +#+#+#+#+#+ +#+   +#+ +#+#+#+#+#+   #<br/>
#       #+#   #+#   #+#       #+#      #<br/>
#      ###    #######        ###       #<br/>
----------------------------------------<br/>
NOT FOUND ERROR 404/ NOT FOUND ERROR 404<br/>
  </pre>

      <h2 className="text-pink-500 text-justify px-4 font-semibold c2:text-2xl  c2:max-w-2xl max-w-xs pt-20">
        PAGE NOT FOUND. Please check the URL in the address bar and try again.{" "}
        <Link className=" underline underline-offset-2 " href="/">
          BACK TO HOMEPAGE
        </Link>{" "}
      </h2>
    </main>
  );
}
