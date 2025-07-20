import React from 'react';

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const accessKeyToSendEmail = import.meta.env.VITE_ACCESS_KEY_TO_SEND_MAIL;

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    try {
      const formData = new FormData(event.target);
      formData.append("access_key", accessKeyToSendEmail);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form submitted successfully!");
        event.target.reset();
      } else {
        console.error("Submission error:", data);
        setResult(data.message || "Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center mt-4 p-4 sm:p-0">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <form onSubmit={onSubmit}>
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
            Contact Us
          </h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input 
                id="name"
                name="name"
                type="text" 
                placeholder="Your full name" 
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                id="email"
                name="email"
                type="email" 
                placeholder="your.email@example.com" 
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea 
                id="message"
                name="message"
                placeholder="How can we help you?" 
                rows="4"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E82561]"
                required
              ></textarea>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 py-3 text-white font-medium rounded-lg transition duration-300 ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[#E82561] hover:bg-[#c81e52]"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          
          {result && (
            <p className={`mt-4 text-center text-sm font-medium ${
              result.includes("success") 
                ? "text-green-600" 
                : "text-red-600"
            }`}>
              {result}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;