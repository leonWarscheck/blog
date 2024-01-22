import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubscribe = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Assuming you have an input field with the name "email" in your form
      const formData = new FormData(event.target);
      const email = formData.get("email");

      // Make a POST request to your subscribeApi route
      const response = await axios.post("/api/subscribeApi", { email });
      
      // Handle the response from your API route
      console.log(response.data);
      onSubscribe();
      // Add any additional logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="group flex ml-auto gap-1 c1:hidden pr-2"
        onClick={handleMenuOpen}
      >
        <div
          className={`size-7 rounded-full ${
            menuOpen ? "bg-neutral-500" : "bg-orange-500"
          }`}
        />
        <div
          className={`size-7 rounded-full ${
            menuOpen ? "bg-neutral-500" : "bg-red-500"
          }`}
        />
      </button>

      {menuOpen && (
        <div className="bg-neutral-800 flex flex-col  c1:hidden text-2xl  font- absolute left-0 right-0 top-16 min-h-[calc(100vh-4rem)]    ">
          <ul className=" w-full px-4 max-w-2xl mx-auto flex flex-col grow justify-evenly ">
            <li className=" ">
              <Link
                onClick={handleMenuOpen}
                className=" text-amber-400 w-full py-11 border-r-4 border-amber-400 flex hover:text-neutral-400"
                href="/tools"
              >
                Tools
              </Link>
            </li>
            <li className=" ">
              <Link
                onClick={handleMenuOpen}
                className=" text-orange-la w-full py-11 border-r-4 border-orange-la flex hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>{" "}
            <li className="relative ">
              <form className="" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className=" border-r-4  border-red-500 placeholder:text-neutral-800 placeholder:text- absolute  top-0 w-full    focus:outline-none bg-neutral-600 text-neutral-400 "
                  required
                  autoCapitalize="off"
                  autoCorrect="off"
                />

                <button
                  className="text-red-500 w-full   py-11 border-r-4  border-red-500 flex hover:text-neutral-400"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
