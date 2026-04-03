import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      // In production, you'd send this to your backend
      const mailtoLink = `mailto:mntytech@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;

      // For demonstration, we'll just show the success message
      // window.open(mailtoLink);
      setTimeout(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] font-serif text-gray-900 py-12 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out anytime!
          </p>
        </motion.div>

        {/* Contact Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="border-l-4 border-gray-900 pl-6">
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:mntytech@gmail.com"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-lg"
                  >
                    mntytech@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-2">We'll get back to you within 24 hours</p>
                </div>

                {/* Response Time */}
                <div className="border-l-4 border-gray-900 pl-6">
                  <h3 className="font-bold text-lg mb-2">Response Time</h3>
                  <p className="text-gray-700">Monday - Friday: 9 AM - 6 PM (EST)</p>
                  <p className="text-gray-600 text-sm mt-2">We respond to all inquiries as quickly as possible</p>
                </div>

                {/* Social */}
                <div className="border-l-4 border-gray-900 pl-6">
                  <h3 className="font-bold text-lg mb-4">Connect</h3>
                  <div className="flex gap-4">
                    {['Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-lg p-8 shadow-lg"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {submitted && (
              <motion.div
                className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 rounded"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-semibold">Thank you for reaching out!</p>
                <p className="text-sm">We'll be in touch soon.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-lg p-8 shadow-lg"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="font-bold text-lg mb-2">How long does it take to get a response?</h3>
              <p className="text-gray-700">
                We typically respond to all inquiries within 24 business hours. For urgent matters, feel free to email us
                directly.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-bold text-lg mb-2">What should I include in my message?</h3>
              <p className="text-gray-700">
                Please provide a clear subject line and detailed description of your inquiry. Include any relevant
                information that will help us assist you better.
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-bold text-lg mb-2">Do you offer customer support?</h3>
              <p className="text-gray-700">
                Yes! We're here to help. Whether you have questions about our platform or need assistance, don't hesitate
                to reach out.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Can I schedule a call?</h3>
              <p className="text-gray-700">
                For specific requests or consultations, mention it in your message and we'll arrange a suitable time to
                connect.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
