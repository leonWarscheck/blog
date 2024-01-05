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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <form className="bg-white p-4 shadow-lg rounded-md" onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md"
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md" type="submit">
          Subscribe
        </button>
        <button className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

