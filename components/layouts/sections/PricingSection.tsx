// components/home/PricingSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Check, Crown, Film, Sparkles, Zap, Shield, Star, Heart, Users, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "month",
    icon: Film,
    color: "from-gray-500 to-gray-600",
    darkColor: "from-gray-600 to-gray-700",
    bgColor: "bg-gray-50 dark:bg-gray-800/30",
    features: [
      "Access to free content library",
      "Rate and review movies",
      "Create and manage watchlist",
      "Basic search filters",
      "Community discussions",
      "Standard video quality (720p)",
    ],
    buttonText: "Current Plan",
    popular: false,
    buttonVariant: "secondary",
    saveAmount: null,
  },
  {
    name: "Premium",
    price: 5,
    period: "month",
    icon: Crown,
    color: "from-rose-500 to-purple-600",
    darkColor: "from-rose-600 to-purple-700",
    bgColor: "bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-950/30 dark:to-purple-950/30",
    features: [
      "Everything in Free plan",
      "Full premium content access",
      "Ad‑free experience",
      "Early access to new releases",
      "Ultra HD & 4K streaming",
      "Download for offline viewing",
      "Priority customer support",
    ],
    buttonText: "Get Started",
    popular: true,
    buttonVariant: "primary",
    saveAmount: null,
  },
  {
    name: "Family",
    price: 12,
    period: "month",
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    darkColor: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    features: [
      "Everything in Premium plan",
      "Up to 5 user profiles",
      "Parental controls",
      "Kids mode with curated content",
      "Simultaneous streaming on 4 devices",
      "Family sharing",
    ],
    buttonText: "Get Started",
    popular: false,
    buttonVariant: "primary",
    saveAmount: null,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAnnualPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return Math.round(annualPrice);
  };

  const displayPlans = plans.map(plan => {
    if (plan.price === 0) return plan;
    return {
      ...plan,
      price: billing === "monthly" ? plan.price : getAnnualPrice(plan.price),
      period: billing === "monthly" ? "month" : "year",
      saveAmount: billing === "yearly" ? "Save 20%" : null,
    };
  });

  return (
    <section className="py-14 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose the plan that&apos;s
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"> right for you</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Start for free and upgrade anytime. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Billing Toggle & Theme Toggle Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          {/* Billing Toggle */}
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-full p-1 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 ease-out ${
                billing === "yearly" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              onClick={() => setBilling("monthly")}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
                billing === "monthly"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
                billing === "yearly"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-normal">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {displayPlans.map((plan) => {
            const isFree = plan.price === 0;
            const isPopular = plan.popular;
            const isHovered = hoveredCard === plan.name;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl transition-all duration-300 ${
                  isPopular
                    ? "md:-mt-4 md:mb-4 shadow-xl dark:shadow-2xl"
                    : "shadow-md hover:shadow-lg dark:shadow-gray-900/50"
                }`}
                onMouseEnter={() => setHoveredCard(plan.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`h-full rounded-2xl border transition-all duration-300 ${
                    isPopular
                      ? "border-rose-200 dark:border-rose-800 bg-white dark:bg-gray-900"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  } ${isHovered ? "transform scale-[1.02] shadow-2xl" : ""}`}
                >
                  <div className="p-6 md:p-8">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-r ${
                        mounted && resolvedTheme === "dark" && plan.darkColor
                          ? plan.darkColor
                          : plan.color
                      } text-white shadow-lg`}
                    >
                      <plan.icon className="w-5 h-5" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.price === 0 ? "Free" : `$${plan.price}`}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan?.saveAmount && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                          ✨ {plan?.saveAmount} compared to monthly
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 group"
                        >
                          <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <Link
                      href={isFree ? "/" : "/subscription"}
                      className={`block w-full text-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                        isFree
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-default border border-gray-200 dark:border-gray-700"
                          : isPopular
                          ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg hover:shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-md"
                      }`}
                    >
                      {plan.buttonText}
                    </Link>

                    {/* Fine Print */}
                    {!isFree && (
                      <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" />
                        Cancel anytime • No commitment
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges - Dark Mode Optimized */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2 group">
              <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-600 dark:text-gray-400">10,000+ happy users</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Secure payments</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Zap className="w-4 h-4 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-600 dark:text-gray-400">24/7 support</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-600 dark:text-gray-400">4.8/5 rating</span>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Have questions?{" "}
            <Link href="/faq" className="text-rose-600 dark:text-rose-400 hover:underline font-medium transition-colors">
              Check our FAQ
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}