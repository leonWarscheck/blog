import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function SubscribeFormMenu({ onCancel, onSubscribe }) {
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
      setTimeout(() => onSubscribe(), 3000);
    } catch (error) {
      console.error(error);
      setFeedbackState("failure");
      setTimeout(() => setFeedbackState(""), 2000);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => onSubscribe(), 2000);
      setTimeout(() => setFeedbackState(""), 2500);
    }
  };

  return (
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
  );
}
