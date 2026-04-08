"use client";

import { Lock, Eye, Database, Cookie, Mail, Shield, Users, AlertCircle } from "lucide-react";

const sections = [
  { id: "information", title: "1. Information We Collect", icon: Database },
  { id: "usage", title: "2. How We Use Your Information", icon: Eye },
  { id: "sharing", title: "3. Information Sharing", icon: Users },
  { id: "cookies", title: "4. Cookies & Tracking", icon: Cookie },
  { id: "security", title: "5. Data Security", icon: Shield },
  { id: "rights", title: "6. Your Rights", icon: Lock },
  { id: "children", title: "7. Children's Privacy", icon: AlertCircle },
  { id: "contact", title: "8. Contact Us", icon: Mail },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 mb-4">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Privacy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Your privacy matters. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Last updated: January 1, 2024
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
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-6">
              <h3 className="font-semibold text-rose-800 dark:text-rose-400 mb-2">Our Commitment</h3>
              <p className="text-rose-700 dark:text-rose-300 text-sm">
                At CineTube, we're committed to protecting your privacy and being transparent about how we handle your data.
              </p>
            </div>

            <div id="information" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-rose-500" />
                1. Information We Collect
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We collect information to provide better services to our users. The types of information we collect include:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Account Information:</strong> Name, email address, password, and subscription preferences</li>
                  <li><strong>Usage Data:</strong> Watch history, search queries, ratings, and reviews</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                  <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely by third parties)</li>
                  <li><strong>Communication Data:</strong> Customer support inquiries and feedback</li>
                </ul>
              </div>
            </div>

            <div id="usage" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-rose-500" />
                2. How We Use Your Information
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use your information to provide, maintain, and improve our services. Specifically, we use your data to:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Deliver personalized content recommendations</li>
                  <li>Process your subscription payments</li>
                  <li>Respond to customer support requests</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Send important service updates and notifications</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </div>
            </div>

            <div id="sharing" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-rose-500" />
                3. Information Sharing
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Service Providers:</strong> With third parties who help us operate our service (payment processing, analytics, hosting)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </div>
            </div>

            <div id="cookies" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-rose-500" />
                4. Cookies & Tracking
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  Types of cookies we use:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our service</li>
                  <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (for free tier users)</li>
                </ul>
              </div>
            </div>

            <div id="security" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-rose-500" />
                5. Data Security
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We implement industry-standard security measures to protect your data, including:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Encryption of data in transit (SSL/TLS)</li>
                  <li>Secure storage of sensitive information</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Monitoring for suspicious activities</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  While we strive to protect your information, no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </div>

            <div id="rights" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-rose-500" />
                6. Your Rights
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  To exercise these rights, please contact us at privacy@cinetube.com.
                </p>
              </div>
            </div>

            <div id="children" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-rose-500" />
                7. Children's Privacy
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  CineTube is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                  For users aged 13-18, we recommend parental supervision and consent before using our service.
                </p>
              </div>
            </div>

            <div id="contact" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-rose-500" />
                8. Contact Us
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                  <p>📧 privacy@cinetube.com</p>
                  <p>📍 123 Entertainment Avenue, Los Angeles, CA 90210</p>
                  <p>📞 +1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Update Notice */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We may update this Privacy Policy from time to time. We will notify you of any material changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}