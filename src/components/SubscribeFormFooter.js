import axios from "axios";

export default function SubscribeForm ({ onCancel, onSubscribe }){


const handleSubscribe = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Assuming you have an input field with the name "email" in your form
      const formData = new FormData(event.target);
      const email = formData.get('email');

      // Make a POST request to your subscribeApi route
      const response = await axios.post('/api/subscribeApi', { email });

      // Handle the response from your API route
      console.log(response.data);
      onSubscribe();
      // Add any additional logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <form className="h-full text-sm bg-neutral-800 flex grow absolute bottom-0 items-center justify-center  -right-c2 " onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" pl-3  focus:outline-none bg-neutral-600 text-neutral-300  "
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button className="px-3 text-red-500 " type="submit">
          Subscribe
        </button>
        <button className=" " onClick={onCancel}>
          Cancel
        </button>
      </form>
  );
};

