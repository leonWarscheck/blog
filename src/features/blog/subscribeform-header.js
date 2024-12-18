import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function SubscribeForm({ onCancel, onSubscribe }) {
  const [feedbackState, setFeedbackState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubscribe = async event => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    inputRef.current.blur();

    try {
      const formData = new FormData(event.target);
      const email = formData.get('email');

      const response = await axios.post('/api/subscribeApi', { email });

      console.log(response.data);
      setFeedbackState('success');
    } catch (error) {
      console.error(error);
      setFeedbackState('failure');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => onSubscribe(), 2500);
      setTimeout(() => setFeedbackState(''), 3000);
    }
  };

  return (
    <>
      {feedbackState === '' && (
        <form
          className="absolute -right-[90.5px] flex bg-neutral-700 font-medium"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            name="email"
            id="navSubInput"
            placeholder="Email"
            className="h-6 w-64 bg-neutral-600 pl-4 text-neutral-200 placeholder-neutral-400 focus:outline-none"
            required
            autoCapitalize="off"
            autoCorrect="off"
            ref={inputRef}
          />
          <button
            className="pl-4 text-red-500"
            type="submit"
            disabled={isSubmitting}
          >
            Subscribe
          </button>
          <button className="mx-5 text-neutral-500" onClick={onCancel}>
            Cancel
          </button>
        </form>
      )}
      {feedbackState === 'success' && (
        <div className="absolute right-0 flex bg-neutral-700 pl-28">
          <p >
            Success.&nbsp;<span>Thank&nbsp;you.</span>
          </p>
        </div>
      )}
      {feedbackState === 'failure' && (
        <div className="absolute right-0 flex bg-neutral-700 pl-32">
          <p >
            Failure.&nbsp;
            <span>Please&nbsp;try&nbsp;again.</span>
          </p>
        </div>
      )}
    </>
  );
}
