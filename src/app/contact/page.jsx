export default function ContactPage() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Contact <span className="text-gray-500">Us</span>
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question, suggestion, or collaboration idea?  
          We'd love to hear from you. Get in touch with us below.
        </p>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether you want to collaborate, feature your fashion collection, or
              simply share your thoughts, our inbox is always open.
            </p>

            <div className="space-y-4">
              <p className="text-gray-800">
                📍 <span className="font-medium">Location:</span> New York, USA
              </p>
              <p className="text-gray-800">
                📧 <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:hello@fashionista.com"
                  className="text-gray-900 hover:underline"
                >
                  hello@trendloom.com
                </a>
              </p>
              <p className="text-gray-800">
                📱 <span className="font-medium">Phone:</span> +1 (123) 456-7890
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form className="bg-gray-50 p-8 rounded-2xl shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
