import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function SubscribeForm({ onCancel, onSubscribe }) {
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
    <>
      {feedbackState === "" && (
        <form
      className="absolute bg-neutral-800 -right-c1 flex "
      onSubmit={handleSubscribe}
    ><input
        type="email"
        name="email"
        id="navSubInput"
        placeholder="Email"
        className=" text-xl pl-4 w-64 h-12 focus:outline-none bg-neutral-600 text-neutral-300  "
        required
        autoCapitalize="off"
        autoCorrect="off"
        ref={inputRef}
      /><button
        className="text-xl text-red-500 pl-4"
        type="submit"
        disabled={isSubmitting}
      >
        Subscribe
      </button>
      <button className="mx-5 text-xl    text-neutral-700 " onClick={onCancel}>
        Cancel
      </button>
    </form>
      )}
      {feedbackState === "success" && (
        <div className=" absolute flex pl-32 right-0 bg-neutral-800">
          <p className="text-orange-500 text-xl ">Success.&nbsp;<span className="text-red-500">Thank&nbsp;you.</span></p>
        </div>
      )}
      {feedbackState === "failure" && (
        <div className=" absolute flex pl-32 right-0 bg-neutral-800">
        <p className="text-orange-500 text-xl ">Failure.&nbsp;<span className="text-red-500">Please&nbsp;try&nbsp;again.</span></p>
      </div>
      )}
      </>
      
  );
}
