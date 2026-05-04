// components/home/NewsletterSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Send, Check, AlertCircle, Sparkles, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // API call to subscribe
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      setIsSubscribed(true);
      toast.success("Subscribed successfully!", {
        description: "Check your inbox for weekly movie recommendations.",
      });
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 dark:from-rose-600 dark:via-purple-600 dark:to-indigo-600 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Check className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're Subscribed! 🎉</h3>
            <p className="text-white/90 dark:text-white/80">
              Get ready for weekly movie recommendations and exclusive updates in your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-purple-500/10 dark:from-rose-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-rose-200 dark:border-rose-800/50 mb-5">
            <Sparkles className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
              Stay Updated
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Never Miss a New Release
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter and get weekly movie recommendations, exclusive reviews, and special offers.
          </p>
        </div>

        {/* Subscription Card */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
              <Check className="w-3 h-3" />
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </form>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎬</div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Weekly Picks
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Curated recommendations just for you
              </p>
            </div>
            
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Exclusive Reviews
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Staff written critiques first
              </p>
            </div>
            
            <div className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎁</div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Special Offers
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Discounts & exclusive giveaways
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>10,000+ subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Weekly newsletter</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Free to join</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}