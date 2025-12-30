"use client";

import { useState, useEffect } from "react";

type ActivePageType = "about" | "contact" | "privacy" | "terms" | null;

const PolicyModal = () => {
  const [activePage, setActivePage] = useState<ActivePageType>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, mounted]);

  const close = () => setActivePage(null);

  // Demo function to show how to open the modal (remove in actual usage)
  const openModal = (page: ActivePageType) => {
    setActivePage(page);
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!mounted) return null;

  // Demo UI to show buttons to open the modal (remove this section in actual usage)
  if (activePage === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Policy Modal Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Click any button below to open the modal
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openModal("about")}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={() => openModal("contact")}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => openModal("privacy")}
              className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => openModal("terms")}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    );
  }

  // The actual modal component
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl animate-scale-in">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {activePage === "about" && "About Copy & Go"}
            {activePage === "contact" && "Contact Us"}
            {activePage === "privacy" && "Privacy Policy"}
            {activePage === "terms" && "Terms & Conditions"}
          </h2>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
          {activePage === "about" && (
            <>
              <p className="text-lg">
                <strong>Copy & Go</strong> is a free, browser-based text
                cleaning and formatting tool designed to help users work faster
                and smarter.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Our Core Principles:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">⚡</span>
                    <span>Instant text processing with zero delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">🔒</span>
                    <span>
                      Complete privacy - all processing happens locally
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">🎯</span>
                    <span>Focused on essential text formatting tasks</span>
                  </li>
                </ul>
              </div>
              <p>
                We believe in building tools that are both powerful and
                accessible. Copy & Go is developed and maintained by{" "}
                <strong>Enclecta</strong>, with a mission to create practical
                digital tools for everyday use.
              </p>
            </>
          )}

          {activePage === "contact" && (
            <>
              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800/30">
                <h3 className="font-bold text-green-700 dark:text-green-300 text-lg mb-3">
                  Get in Touch
                </h3>
                <p className="mb-4">
                  We're here to help! Whether you have questions, feedback, or
                  partnership inquiries, we'd love to hear from you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📧</span>
                    <div>
                      <div className="font-medium">Email Support</div>
                      <a
                        href="mailto:support@enclecta.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        support@enclecta.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⏰</span>
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div>Typically within 24–48 business hours</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                For urgent matters, please include "URGENT" in your subject line
                for faster attention.
              </p>
            </>
          )}

          {activePage === "privacy" && (
            <>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 text-lg mb-3">
                  Your Privacy is Our Priority
                </h3>
                <p>
                  We take your privacy seriously. Here's how we handle your
                  data:
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    🛡️ No Data Storage
                  </h4>
                  <p>
                    Copy & Go does <strong>not</strong> store, save, or log any
                    text you enter into the tool. All processing happens locally
                    in your browser.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    📊 Anonymous Analytics
                  </h4>
                  <p>
                    We may collect anonymous usage data (browser type, device
                    info, feature usage) to improve performance and user
                    experience. This data cannot identify you personally.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    🍪 Third-Party Services
                  </h4>
                  <p>
                    We use third-party services (like Google Analytics) that may
                    use cookies. You can control cookie preferences through your
                    browser settings.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Last Updated</h4>
                  <p className="text-sm">December 2023</p>
                </div>
              </div>
            </>
          )}

          {activePage === "terms" && (
            <>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl border border-orange-100 dark:border-orange-800/30">
                <h3 className="font-bold text-orange-700 dark:text-orange-300 text-lg mb-3">
                  Terms of Use
                </h3>
                <p>
                  By using Copy & Go, you agree to these terms and conditions.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    1. Service Description
                  </h4>
                  <p>
                    Copy & Go is a free web-based text formatting tool provided
                    "as-is" without warranties of any kind.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    2. User Responsibilities
                  </h4>
                  <p>
                    You agree to use the service responsibly and not for any
                    illegal purposes. You retain all rights to the text you
                    process.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    3. Limitation of Liability
                  </h4>
                  <p>
                    We are not responsible for any damages resulting from the
                    use of our service. Use at your own discretion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    4. Third-Party Content
                  </h4>
                  <p>
                    We may display third-party advertisements. We are not
                    responsible for the content of external websites.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    5. Changes to Terms
                  </h4>
                  <p>
                    We reserve the right to modify these terms at any time.
                    Continued use constitutes acceptance of changes.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Copy & Go • {new Date().getFullYear()}
          </div>
          <button
            onClick={close}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default PolicyModal;
