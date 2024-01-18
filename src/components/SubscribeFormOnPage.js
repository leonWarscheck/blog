import axios from "axios";

export default function SubscribeFormOnPage ({ onCancel, onSubscribe }){


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
    <div className="bg-neutral-800">
      <h2 className="text-2xl text-justify text-neutral-400 hover:text-violet-500"><span className="">Let’s stay connected.</span><br/> <span className="">High-Signal-Only Email Updates.</span></h2>
      <form className="" onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" placeholder:text-neutral-800 font-semibold placeholder:hover:text-orange-la text-2xl focus:outline-none bg-neutral-600 text-neutral-100 "
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button className="text-2xl font- text-red-500 px-2 hover:text-neutral-300" type="submit">
          Subscribe.
        </button>
      </form>
    </div>
  );
};

