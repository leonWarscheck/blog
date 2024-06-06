import axios from "axios";
import { useEffect, useRef } from "react";

export default function SubscribeFormOnPage({ onSubscribe }) {
  let formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    formRef.current.addEventListener("click", () => inputRef.current.focus());
    return () => (inputRef.current = null);
  }, []);

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
    <form
      ref={formRef}
      className="px-4 bg-neutral-800 text-wrap py-5 mt-10 mb-7"
      onSubmit={handleSubscribe}
    >
      <h2 className="text-xl mr-auto  text-neutral-200 pb-5">
        Let’s stay connected. <br /> High-Signal-Only Email Updates.
      </h2>
      <div className="c1:flex">
        <input
          type="email"
          name="email"
          id="pageSubInput"
          placeholder="Email"
          className=" placeholder:text-neutral-400 pl-1 c1:pl-3 py-1 w-full font- placeholder:hover:text-neutral-100 text-xl focus:outline-none bg-neutral-600 text-neutral-100 "
          required
          autoCapitalize="off"
          autoCorrect="off"
          ref={inputRef}
        />
        <button
          className="text-xl font- text-emerald-la pt-3 c1:pt-0 c1:pl-3 hover:text-neutral-400"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
