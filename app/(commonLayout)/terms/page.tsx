"use client";

import { Shield, Calendar, FileText, AlertCircle, CheckCircle, Clock, Users, CreditCard, Lock, Globe } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms", icon: CheckCircle },
  { id: "changes", title: "2. Changes to Terms", icon: Clock },
  { id: "account", title: "3. User Accounts", icon: Users },
  { id: "payments", title: "4. Payments & Billing", icon: CreditCard },
  { id: "content", title: "5. Content Usage", icon: FileText },
  { id: "privacy", title: "6. Privacy", icon: Lock },
  { id: "restrictions", title: "7. Prohibited Activities", icon: AlertCircle },
  { id: "termination", title: "8. Termination", icon: Shield },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Last updated: January 1, 2024
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            By using CineTube, you agree to these terms. Please read them carefully.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                On this page
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <Icon className="w-4 h-4" />
                      {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <div id="acceptance" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-rose-500" />
                1. Acceptance of Terms
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing or using CineTube's streaming service, website, mobile applications, 
                  and any related services (collectively, the "Service"), you agree to be bound by 
                  these Terms of Service ("Terms"). If you do not agree to these Terms, please do 
                  not use the Service.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  These Terms constitute a legally binding agreement between you and CineTube 
                  regarding your use of the Service. You represent that you are at least 18 years 
                  old or have parental consent to use the Service.
                </p>
              </div>
            </div>

            <div id="changes" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-rose-500" />
                2. Changes to Terms
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  CineTube reserves the right to modify these Terms at any time. We will notify 
                  users of material changes through the Service or via email. Your continued use 
                  of the Service after such changes constitutes your acceptance of the new Terms.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  It is your responsibility to review these Terms periodically. The "Last updated" 
                  date at the top indicates when these Terms were last revised.
                </p>
              </div>
            </div>

            <div id="account" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-rose-500" />
                3. User Accounts
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To access certain features of the Service, you must create an account. You are 
                  responsible for maintaining the confidentiality of your account credentials and 
                  for all activities that occur under your account.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>You must provide accurate and complete registration information</li>
                  <li>You are responsible for all activity on your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You may not share your account credentials with others (except Family plan)</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                </ul>
              </div>
            </div>

            <div id="payments" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-rose-500" />
                4. Payments & Billing
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Subscription fees are billed in advance on a monthly or annual basis depending 
                  on your chosen plan. All payments are non-refundable except as required by law.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>You authorize us to charge your payment method for all subscription fees</li>
                  <li>We may change subscription fees with 30 days' notice</li>
                  <li>You can cancel anytime through your account settings</li>
                  <li>No refunds for partial billing periods</li>
                  <li>All fees are in USD unless otherwise specified</li>
                </ul>
              </div>
            </div>

            <div id="content" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-rose-500" />
                5. Content Usage
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The content available on CineTube is for personal, non-commercial use only. 
                  You may not reproduce, distribute, modify, or create derivative works of any 
                  content without express permission.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  All content is protected by copyright, trademark, and other intellectual property 
                  laws. CineTube grants you a limited, non-exclusive, non-transferable license to 
                  access and view content for personal use.
                </p>
              </div>
            </div>

            <div id="privacy" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-rose-500" />
                6. Privacy
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, 
                  use, and protect your personal information. By using the Service, you consent 
                  to our data practices as described in the Privacy Policy.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  <Link href="/privacy" className="text-rose-600 dark:text-rose-400 hover:underline">
                    Read our Privacy Policy →
                  </Link>
                </p>
              </div>
            </div>

            <div id="restrictions" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-rose-500" />
                7. Prohibited Activities
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Violating any laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Distributing spam or malicious content</li>
                  <li>Attempting to bypass security measures</li>
                  <li>Sharing accounts beyond permitted limits</li>
                  <li>Using bots or automated systems to access content</li>
                  <li>Reselling or redistributing access to the Service</li>
                </ul>
              </div>
            </div>

            <div id="termination" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-rose-500" />
                8. Termination
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  CineTube may terminate or suspend your account immediately for violations of 
                  these Terms. Upon termination, your right to use the Service will cease immediately.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  You can terminate your account at any time through your account settings. 
                  No refunds will be provided for any remaining subscription period.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">📧 legal@cinetube.com</p>
                <p className="text-gray-600 dark:text-gray-400">📍 123 Entertainment Avenue, Los Angeles, CA 90210</p>
                <p className="text-gray-600 dark:text-gray-400">📞 +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}