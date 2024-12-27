import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SubscribeFormFooter({ onCancel, onSubscribe }) {
  const [responseStatus, setResponseStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubscribe = async event => {
    event.preventDefault();

    if (isSubmitting) return; // Exit handler in case of already submitting.

    setIsSubmitting(true); // Set submission state on first call.

    inputRef.current.blur(); // Blur during submission.

    try {
      const formData = new FormData(event.target);
      const email = formData.get('email');

      // Send `POST` request to api route, and capture response.
      const response = await axios.post('/api/subscribe-api', { email });

      console.log(response.data);
      setResponseStatus('success');
    } catch (error) {
      console.error(error);
      setResponseStatus('failure');
    } finally {
      // Reset all submission related states.
      setIsSubmitting(false);
      setTimeout(() => onSubscribe(), 2000);
      setTimeout(() => setResponseStatus(''), 2500);
    }
  };

  return (
    <>
      {responseStatus === '' && (
        <form
          className="absolute -right-[83.5px] flex bg-neutral-700"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            name="email"
            id="navSubInput"
            placeholder="Email"
            className="w-64 bg-neutral-600 pl-4 text-sm text-neutral-300 focus:outline-none"
            required
            autoCapitalize="off"
            autoCorrect="off"
            ref={inputRef}
            disabled={isSubmitting}
          />
          <button
            className="pl-4 text-sm text-red-500"
            type="submit"
            disabled={isSubmitting}
          >
            Subscribe
          </button>
          <button className="mx-5 text-sm text-neutral-500" onClick={onCancel}>
            Cancel
          </button>
        </form>
      )}
      {responseStatus === 'success' && (
        <div className="absolute right-0 flex bg-neutral-700 pl-32">
          <p className="text-sm text-neutral-200">
            Success.&nbsp;
            <span className="text-neutral-200">Thank&nbsp;you.</span>
          </p>
        </div>
      )}
      {responseStatus === 'failure' && (
        <div className="absolute right-0 flex bg-neutral-700 pl-32">
          <p className="text-sm text-neutral-200">
            Failure.&nbsp;
            <span className="text-neutral-200">
              Please&nbsp;try&nbsp;again.
            </span>
          </p>
        </div>
      )}
    </>
  );
}
