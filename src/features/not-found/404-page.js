import Link from 'next/link';

export default function Page404() {
  return (
    <main className="mx-auto flex max-w-2xl grow flex-col pt-20 text-neutral-200">
      {/* prettier-ignore */}
      <pre className=" pt-16 text-xs c2:text-la1 px-4  xl:text-la1 w-full font-bold hover:text-yellow-l hover:bg-gradient-to -b from-red-500 to-violet-500 to-yellow- la hover:bg-clip- text hover:text- transparent">
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

      <h2 className="max-w-xs px-4 pt-20 text-justify font-semibold c2:max-w-2xl c2:text-2xl">
        PAGE NOT FOUND. Please check the URL in the address bar and try again.{' '}
        <Link className="underline underline-offset-2" href="/">
          BACK TO HOMEPAGE
        </Link>{' '}
      </h2>
    </main>
  );
}
