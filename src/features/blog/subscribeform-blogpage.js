import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SubscribeFormOnPage({}) {
  const [feedbackState, setFeedbackState] = useState('');
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

  useEffect(() => {
    if (feedbackState === 'success' || feedbackState === 'failure') {
      formRef.current.reset();
    }
  }, [feedbackState]);

  const handleSubscribe = async event => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    inputRef.current.blur();

    try {
      const formData = new FormData(event.target);
      const email = formData.get('email');

      const response = await axios.post('/api/subscribeApi', { email });

      console.log('axios response:', response.data);
      setFeedbackState('success');
    } catch (error) {
      console.error('axios error:', error);
      setFeedbackState('failure');
      setTimeout(() => setFeedbackState(''), 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="mb-7 mt-10 text-wrap bg-neutral-700 py-5 c1:h-40"
      onSubmit={handleSubscribe}
    >
      {feedbackState === '' && (
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
      {feedbackState === 'success' && (
        <p className="text-xl text-neutral-200">
          Success.
          <br />
          Thank you for subscribing.
        </p>
      )}
      {feedbackState === 'failure' && (
        <p className="text-xl text-neutral-200">
          Something went wrong.
          <br />
          Please try again or try a different email.
        </p>
      )}
    </form>
  );
}
