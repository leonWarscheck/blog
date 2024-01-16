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
      <form className="absolute bg-neutral-800   h-full top-0 flex mx-auto max-w-2xl" onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" text-2xl  pl-4 w-80 focus:outline-none bg-neutral-600 text-neutral-300  "
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button className="text-2xl text-red-500 pl-4" type="submit">
          Subscribe
        </button>
        <button className="mx-8 text-2xl    text-neutral-600 " onClick={onCancel}>
          Cancel
        </button>
      </form>
  );
};

