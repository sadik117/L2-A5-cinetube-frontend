// app/(home)/faq/page.tsx
"use client";

import { useState } from "react";
import {
  ChevronDown,
  Search,
  HelpCircle,
  CreditCard,
  Film,
  Users,
  Shield,
  Download,
  Smartphone,
  Globe,
  Headphones,
  Clock,
  Star,
  Zap,
  Lock,
  RefreshCw,
  MessageCircle,
  Mail,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
}

const faqs: FAQItem[] = [
  // General Questions
  {
    question: "What is CineTube?",
    answer: "CineTube is a premium streaming platform that offers a vast library of movies, TV shows, documentaries, and exclusive content. You can watch anytime, anywhere, on any device with an internet connection.",
    category: "General",
    popular: true
  },
  {
    question: "How do I create an account?",
    answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, enter your email address, create a password, and follow the verification steps. You can also sign up using Google or Facebook for quicker access.",
    category: "General",
    popular: true
  },
  {
    question: "Is CineTube available worldwide?",
    answer: "Yes, CineTube is available in over 200 countries worldwide. However, content availability may vary by region due to licensing agreements. We're constantly working to expand our global library.",
    category: "General"
  },
  {
    question: "Can I watch on multiple devices?",
    answer: "Yes! Depending on your subscription plan, you can watch on multiple devices simultaneously. Premium plan allows 2 simultaneous streams, while Family plan allows up to 4 simultaneous streams.",
    category: "General"
  },

  // Subscription & Billing
  {
    question: "What subscription plans do you offer?",
    answer: "We offer three plans: Free (limited content with ads), Premium ($5.99/month - full access, ad-free, HD/4K streaming), and Family ($12.99/month - everything in Premium plus 5 profiles, parental controls, and 4 simultaneous streams).",
    category: "Billing",
    popular: true
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from your Account Settings > Subscription. Click 'Cancel Subscription' and confirm. Your access will continue until the end of your current billing period, and you won't be charged again.",
    category: "Billing",
    popular: true
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and various regional payment methods. All payments are processed securely.",
    category: "Billing"
  },
  {
    question: "Will I get a refund if I cancel?",
    answer: "We don't offer refunds for partial months, but you can cancel anytime to avoid future charges. Your subscription remains active until the end of your current billing period. Contact support for exceptional cases.",
    category: "Billing"
  },
  {
    question: "Do you offer student or military discounts?",
    answer: "Yes! Students get 30% off Premium plan with a valid student ID. Military personnel and veterans receive 25% off any paid plan. Contact our support team with verification to apply the discount.",
    category: "Billing"
  },

  // Content & Features
  {
    question: "What content is available on CineTube?",
    answer: "CineTube offers thousands of movies, TV series, documentaries, and exclusive originals. Our library includes content from major studios and independent creators, spanning multiple genres and languages.",
    category: "Content",
    popular: true
  },
  {
    question: "How often is new content added?",
    answer: "We add new content weekly! New movies and episodes are typically added every Friday. Follow our 'New Releases' section or enable notifications to stay updated.",
    category: "Content"
  },
  {
    question: "Can I download content to watch offline?",
    answer: "Yes! Premium and Family plan subscribers can download movies and shows on up to 5 devices. Downloaded content is available for 30 days and can be renewed with an internet connection every 30 days.",
    category: "Features",
    popular: true
  },
  {
    question: "Is there a watchlist feature?",
    answer: "Absolutely! All users can create and manage watchlists. Just click the 'Add to Watchlist' button on any content page. Your watchlist syncs across all your devices automatically.",
    category: "Features"
  },
  {
    question: "Can I create multiple profiles?",
    answer: "Family plan subscribers can create up to 5 separate profiles. Each profile has its own watch history, recommendations, and watchlist. Perfect for families or shared accounts!",
    category: "Features"
  },

  // Technical & Support
  {
    question: "What devices are supported?",
    answer: "CineTube supports web browsers (Chrome, Firefox, Safari, Edge), mobile devices (iOS and Android), smart TVs (Samsung, LG, Sony), streaming devices (Roku, Apple TV, Chromecast, Fire TV), and gaming consoles (PlayStation, Xbox).",
    category: "Technical",
    popular: true
  },
  {
    question: "What internet speed do I need?",
    answer: "For standard definition (SD): 3 Mbps; HD (1080p): 5 Mbps; Ultra HD (4K): 25 Mbps. For the best experience, we recommend a stable connection of at least 25 Mbps for 4K content.",
    category: "Technical"
  },
  {
    question: "Why is the video buffering or low quality?",
    answer: "Buffering is usually caused by slow internet connection. Try lowering the video quality in settings, closing other bandwidth-heavy apps, or connecting to a faster network. You can also check our server status page for any ongoing issues.",
    category: "Technical"
  },
  {
    question: "How do I report a problem with a video?",
    answer: "If you experience playback issues, click the 'Report Problem' button in the video player. You can also contact our support team via email or live chat with details about the issue.",
    category: "Support"
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our 24/7 support team via live chat (available on web and mobile), email at support@cinetube.com, or through our contact form. Premium members get priority support with faster response times.",
    category: "Support",
    popular: true
  },

  // Account & Security
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions to create a new password. Make sure to check your spam folder if you don't see the email.",
    category: "Account"
  },
  {
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account from Settings > Account > Delete Account. This action is permanent and will remove all your data, including watch history, reviews, and preferences.",
    category: "Account"
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely! We use industry-standard encryption (SSL/TLS) and never store your full payment details on our servers. All payments are processed through PCI-compliant payment gateways.",
    category: "Security",
    popular: true
  },
  {
    question: "Does CineTube sell my data?",
    answer: "No, we never sell your personal data. We use your information only to improve your experience, provide recommendations, and communicate with you about your account. Read our Privacy Policy for more details.",
    category: "Security"
  }
];

const categories = [
  { name: "All", icon: HelpCircle, count: faqs.length },
  { name: "General", icon: Globe, count: faqs.filter(f => f.category === "General").length },
  { name: "Billing", icon: CreditCard, count: faqs.filter(f => f.category === "Billing").length },
  { name: "Content", icon: Film, count: faqs.filter(f => f.category === "Content").length },
  { name: "Features", icon: Zap, count: faqs.filter(f => f.category === "Features").length },
  { name: "Technical", icon: Smartphone, count: faqs.filter(f => f.category === "Technical").length },
  { name: "Support", icon: Headphones, count: faqs.filter(f => f.category === "Support").length },
  { name: "Account", icon: Users, count: faqs.filter(f => f.category === "Account").length },
  { name: "Security", icon: Lock, count: faqs.filter(f => f.category === "Security").length },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFaqs = faqs.filter(faq => faq.popular).slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Find answers to common questions about CineTube
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Most frequently asked by our users</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {popularFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{faq.answer}</p>
                    <button
                      onClick={() => {
                        const index = faqs.findIndex(f => f.question === faq.question);
                        toggleItem(index);
                        document.getElementById(`faq-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="text-rose-600 dark:text-rose-400 text-sm font-medium mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read more
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Categories */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.name;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className={`text-xs ${isActive ? "text-white/80" : "text-gray-400"}`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Contact Support Card */}
                <div className="mt-8 p-5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl text-white">
                  <Headphones className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-1">Still have questions?</h4>
                  <p className="text-sm text-white/80 mb-4">Can&apos;t find the answer you're looking for?</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
                  >
                    Contact Support
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="flex-1">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or browse by category
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map((faq, idx) => {
                    const globalIndex = faqs.findIndex(f => f.question === faq.question);
                    const isOpen = openItems.has(globalIndex);
                    return (
                      <div
                        key={idx}
                        id={`faq-${globalIndex}`}
                        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition rounded-xl"
                        >
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/30 px-2 py-0.5 rounded-full">
                                {faq.category}
                              </span>
                              {faq.popular && (
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <div className="px-5 pb-5">
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Still Need Help */}
              {filteredFaqs.length > 0 && (
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl text-center">
                  <MessageCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Still need help?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Our support team is ready to assist you
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Support
                    </Link>
                    <Link
                      href="/live-chat"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Live Chat
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/about" className="text-center p-4 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition group">
              <Globe className="w-6 h-6 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">About Us</p>
            </Link>
            <Link href="/privacy" className="text-center p-4 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition group">
              <Lock className="w-6 h-6 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy Policy</p>
            </Link>
            <Link href="/terms" className="text-center p-4 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition group">
              <Shield className="w-6 h-6 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Terms of Service</p>
            </Link>
            <Link href="/contact" className="text-center p-4 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition group">
              <Headphones className="w-6 h-6 text-rose-500 mx-auto mb-2 group-hover:scale-110 transition" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Us</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}