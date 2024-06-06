import axios from "axios";
import { useEffect, useRef } from "react";

export default function SubscribeForm({ onCancel, onSubscribe }) {
  let inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");

      const response = await axios.post("/api/subscribeApi", { email });

      console.log(response.data);
      onSubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="h-full text-sm bg-neutral-800 flex grow absolute bottom-0 items-center justify-center  -right-c2 "
      onSubmit={handleSubscribe}
    >
      <input
        type="email"
        name="email"
        id="footSubInput"
        placeholder="Email"
        className=" pl-3  focus:outline-none bg-neutral-600 text-neutral-300  "
        required
        autoCapitalize="off"
        autoCorrect="off"
        ref={inputRef}
      />
      <button className="px-3 text-red-500 " type="submit">
        Subscribe
      </button>
      <button className=" " onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
