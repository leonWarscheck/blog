import Link from "next/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Menu({ handleMenuToggle2, menuOpen, handleMenuClose }) {
  const [feedbackState, setFeedbackState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    inputRef.current.blur();

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");

      const response = await axios.post("/api/subscribeApi", { email });

      console.log(response.data);
      setFeedbackState("success");
    } catch (error) {
      console.error(error);
      setFeedbackState("failure");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedbackState(""), 2500);
    }
  };

  return (
    <>
      <button
        className="group flex flex-col ml-auto  mt-1.5 1 gap-[4.5px] c1:hidden pr-2"
        onClick={handleMenuToggle2}
      >
        <div
          className={`size- h-[3px] w-8 rounded-f ${
            menuOpen ? "bg-neutral-500" : "bg-neutral-200"
          }`}
        />
        <div
          className={`size- h-[3px] w-8 rounded-f ${
            menuOpen ? "bg-neutral-500" : "bg-neutral-200"
          }`}
        />
      </button>

      {menuOpen && (
        <div
          className="bg-neutral-700  flex flex-col  c1:hidden text-2xl  font- absolute left-0 right-0 top-16 min-h-[calc(100vh-4rem)] z-50 "
          aria-label="Mobile Menu"
        >
          <ul className=" w-full px-4 max-w-2xl mx-auto flex flex-col grow justify-evenly ">
            <li className=" ">
              <Link
                onClick={handleMenuClose}
                className=" text-emerald-la w-full py-11 border-r-4 border-yellow-la flex hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>

            <li className="relative border-r-4  border-violet-500">
              <form className="" onSubmit={handleSubscribe}>
                {feedbackState === "" && (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" placeholder:text-neutral-400 pl-1 placeholder:hover:text-neutral-400 absolute  top-0 w-full    focus:outline-none bg-neutral-600 text-neutral-400 "
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      ref={inputRef}
                    />
                    <button
                      className="text-red-500 w-full   py-11  flex hover:text-neutral-400"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Subscribe
                    </button>
                  </>
                )}
                {feedbackState === "success" && (
                  <p className="text-2xl mr-auto pt-7 text-red-500 pb-7">
                    Success.
                    <br />
                    Thank you for subscribing.
                  </p>
                )}
                {feedbackState === "failure" && (
                  <p className="text-2xl mr-auto pt-7 text-red-500 pb-7">
                    Something went wrong.
                    <br />
                    Please try again or try a different email.
                  </p>
                )}
              </form>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
