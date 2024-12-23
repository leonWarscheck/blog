import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SubscribeFormOnPage({}) {
  const [responseStatus, setResponseStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    formRef.current.addEventListener('click', handleClick);
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

      console.log('axios response:', response.data);
      setResponseStatus('success');
    } catch (error) {
      console.error('axios error:', error);
      setResponseStatus('failure');
    } finally {
      // Reset all submission related states.
      setIsSubmitting(false);
      formRef.current.reset();
      setTimeout(() => setResponseStatus(''), 3500);
    }
  };

  return (
    <form
      ref={formRef}
      className="mb-7 mt-10 text-wrap bg-neutral-700 py-5 c1:h-40"
      onSubmit={handleSubscribe}
    >
      {responseStatus === '' && (
        <>
          <h2 className="mr-auto pb-5 text-xl text-neutral-200">
            Let’s stay connected. <br /> High-Signal-Only Email Updates.
          </h2>
          <div className="c1:flex">
            <input
              type="email"
              name="email"
              id="pageSubInput"
              placeholder="Email"
              className="w-full bg-neutral-600 py-1 pl-1 text-xl text-neutral-100 placeholder:text-neutral-400 placeholder:hover:text-neutral-100 focus:outline-none c1:pl-3"
              required
              autoCapitalize="off"
              autoCorrect="off"
              ref={inputRef}
              disabled={isSubmitting}
            />
            <button
              className="pt-3 text-xl font-medium text-red-500 hover:text-neutral-300 c1:pl-3 c1:pt-0"
              type="submit"
              disabled={isSubmitting}
            >
              Subscribe
            </button>
          </div>
        </>
      )}
      {responseStatus === 'success' && (
        <p className="text-xl text-neutral-200">
          Success.
          <br />
          Thank you for subscribing.
        </p>
      )}
      {responseStatus === 'failure' && (
        <p className="text-xl text-neutral-200">
          Something went wrong.
          <br />
          Please try again or try a different email.
        </p>
      )}
    </form>
  );
}
