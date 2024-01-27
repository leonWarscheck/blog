import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 6969);
  }, [router]);

  return (
    <main className="grow flex flex-col mx-auto max-w-2xl pt-20 ">
      {/* prettier-ignore */}
      <pre className="mx-auto pt-16 text-xs sm:text-la1  xl:text-la1 font-bold bg-gradient-to-b from-violet-500 to-emerald-la bg-clip-text text-transparent">
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
REDIRECTING..REDIRECTING..REDIRECTING...<br/>
  </pre>

      <h2 className="text-pink-500 text-justify font-semibold sm:text-2xl mx-auto sm:max-w-2xl px-4 max-w-xs pt-20">
        The page you requested cannot be found. You will be redirected to the{" "}
        <Link className=" underline underline-offset-2 " href="/">
          homepage
        </Link>{" "}
        in a moment...
      </h2>
    </main>
  );
}
