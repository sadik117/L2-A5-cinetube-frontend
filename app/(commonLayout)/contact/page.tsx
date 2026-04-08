"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Headphones,
  Zap,
  Shield
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get response within 24 hours",
    contact: "support@cinetube.com",
    action: "mailto:support@cinetube.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Headphones,
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 24/7",
    action: "/live-chat",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri, 9AM-6PM EST",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    color: "from-purple-500 to-pink-500"
  },
];

const faqLinks = [
  "How do I cancel my subscription?",
  "What payment methods do you accept?",
  "How to download content for offline viewing?",
  "Can I share my account with family?",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 md:py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-6">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            We'd love to hear from you
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or need support? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <Link
                  key={idx}
                  href={method.action}
                  className="group bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{method.description}</p>
                  <p className="text-rose-600 dark:text-rose-400 font-medium">{method.contact}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Fill out the form below and we'll get back to you</p>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">Thanks for reaching out. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option>Account & Billing</option>
                      <option>Technical Support</option>
                      <option>Content Suggestion</option>
                      <option>Partnership Inquiry</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Response</h3>
                <p className="text-white/90 mb-4">Average response time:</p>
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">&lt; 24 hours</p>
                    <p className="text-sm text-white/80">For email inquiries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">&lt; 5 minutes</p>
                    <p className="text-sm text-white/80">For live chat</p>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  Our Office
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  123 Entertainment Avenue<br />
                  Suite 100<br />
                  Los Angeles, CA 90210<br />
                  United States
                </p>
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
                    <Twitter className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
                    <Facebook className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
                    <Instagram className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* FAQ Links */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Answers</h3>
                <ul className="space-y-2">
                  {faqLinks.map((faq, idx) => (
                    <li key={idx}>
                      <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        {faq}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/faq" className="inline-block mt-4 text-rose-600 dark:text-rose-400 text-sm font-medium hover:underline">
                  View all FAQs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}