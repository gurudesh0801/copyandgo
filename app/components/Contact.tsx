"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Later you can connect API / email service here
    setStatus("Thanks for contacting us! We’ll get back to you soon.");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Contact Us
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Have feedback, questions, or business inquiries? We’d love to hear from
        you.
      </p>

      {/* Contact Info */}
      <div className="mb-8 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p>
          📧 Email: <span className="font-medium">support@enclecta.com</span>
        </p>
        <p>
          🕒 Response Time:{" "}
          <span className="font-medium">24–48 business hours</span>
        </p>
        <p>
          🏢 Product by: <span className="font-medium">Enclecta</span>
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {status && (
          <p className="text-sm text-green-600 dark:text-green-400">{status}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
