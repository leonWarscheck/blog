import axios from "axios";
import { useEffect, useRef } from "react";

export default function SubscribeForm({ onCancel, onSubscribe }) {
  const inputRef = useRef(null);

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
      className="absolute bg-neutral-800 -right-c1 flex "
      onSubmit={handleSubscribe}
    >
      <input
        type="email"
        name="email"
        id="navSubInput"
        placeholder="Email"
        className=" text-xl pl-4 w-64 h-12 focus:outline-none bg-neutral-600 text-neutral-300  "
        required
        autoCapitalize="off"
        autoCorrect="off"
        ref={inputRef}
      />
      <button className="text-xl text-red-500 pl-4" type="submit">
        Subscribe
      </button>
      <button className="mx-5 text-xl    text-neutral-700 " onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
