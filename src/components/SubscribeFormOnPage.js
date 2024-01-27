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
    <div className="bg-neutral-800 text-wrap py-5 mt-10 mb-7">
      <h2 className="text-xl px-4 mr-auto  text-neutral-100 pb-5">Let’s stay connected. <br/> High-Signal-Only Email Updates.</h2>
      <form className=" c1:flex   px-4" onSubmit={handleSubscribe}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" placeholder:text-neutral-400 pl-1 c1:pl-3 py-1 w-full font- placeholder:hover:text-neutral-100 text-xl focus:outline-none bg-neutral-600 text-neutral-100 "
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button className="text-xl font- text-emerald-la pt-3 c1:pt-0 c1:pl-3 hover:text-neutral-400" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

