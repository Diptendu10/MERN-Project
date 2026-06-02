import { useState } from "react";
export default function ContactPage() {
  const [showBrands, setShowBrands] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Car 69</h1>

        <div className="space-x-6 text-lg">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <a href="/about" className="hover:text-yellow-400">
             About
          </a>
          <a href="/contact" className="hover:text-yellow-400">
          Contact
        </a>
        </div>

        <a
        href="/login"
        className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </a>
      </nav>
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Have questions or need help with bookings? Our team is here to assist
          you anytime.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6 text-lg">
              <div>
                <h3 className="font-bold text-xl mb-2">Address</h3>

                <p className="text-gray-600">
                  221B Park Street, Kolkata, West Bengal, India
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Phone</h3>

                <p className="text-gray-600">
                  +91 8649813532
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Email</h3>

                <p className="text-gray-600">
                  support@car69.com
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Working Hours</h3>

                <p className="text-gray-600">
                  Monday - Sunday : 24/7 Service
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-4 rounded-xl outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-4 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-4 rounded-xl outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border p-4 rounded-xl outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 px-8 max-w-6xl mx-auto">
        <div className="bg-white p-4 rounded-3xl shadow-lg">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-96 rounded-2xl border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p className="text-gray-400">
          © 2026 Car 69. All rights reserved.
        </p>
      </footer>
    </div>
  );
}