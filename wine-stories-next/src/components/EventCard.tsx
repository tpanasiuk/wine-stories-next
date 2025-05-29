"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EventCard({
  date,
  title,
  desc,
}: {
  date: string;
  title: string;
  desc: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully registered for the event!");
    setIsOpen(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <article className="border border-white/30 rounded-lg p-6 hover:border-white transition relative">
      <p className="text-[#Bfa46f] font-medium mb-2">{date}</p>
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="leading-relaxed text-sm mb-4">{desc}</p>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-auto bg-[#Bfa46f] text-white text-xs tracking-wide uppercase px-4 py-2 hover:bg-white hover:text-[#282828] transition cursor-pointer"
      >
        Register
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center px-4 bg-black/60 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#1e1e1e] text-white rounded-lg p-6 w-full max-w-md relative shadow-[0_0_20px_#Bfa46f]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-white text-xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Register for {title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-[#2e2e2e] border border-white/20 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 bg-[#2e2e2e] border border-white/20 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-[#2e2e2e] border border-white/20 rounded"
              />
              <button
                type="submit"
                className="bg-[#Bfa46f] text-white px-4 py-2 uppercase hover:bg-white hover:text-[#282828] transition cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
