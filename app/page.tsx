"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";

/* ---------------- TEXT UTILS ---------------- */
const removeExtraSpaces = (t: string) => t.replace(/\s+/g, " ").trim();
const removeLineBreaks = (t: string) => t.replace(/\n+/g, " ");
const toUpperCase = (t: string) => t.toUpperCase();
const toLowerCase = (t: string) => t.toLowerCase();
const toSentenceCase = (t: string) =>
  t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
const removeEmojis = (t: string) =>
  t.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
const toTitleCase = (t: string) =>
  t.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
const reverseText = (t: string) => t.split("").reverse().join("");
const removeNumbers = (t: string) => t.replace(/\d/g, "");
const removeSpecialChars = (t: string) => t.replace(/[^\w\s]/g, "");
const toCamelCase = (t: string) =>
  t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

/* ---------------- COMPONENT ---------------- */
export default function Home() {
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [step, setStep] = useState(-1);
  const [feedback, setFeedback] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    lines: 1,
    readingTime: 0,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set mounted to true when component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize dark mode
  useEffect(() => {
    if (!mounted) return;

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, [mounted]);

  // Apply dark mode class
  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, mounted]);

  // Update stats when text changes
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 1;
    const readingTime = Math.ceil(words / 200);

    setStats({
      words,
      characters: text.length,
      lines,
      readingTime,
    });

    // Update history
    if (step === -1) {
      setHistory([text]);
      setStep(0);
    } else if (history[step] !== text) {
      const updated = history.slice(0, step + 1);
      setHistory([...updated, text]);
      setStep(updated.length);
    }
  }, [text]);

  /* ---------- Toast ---------- */
  const showToast = useCallback((msg: string, icon?: string) => {
    setToast(`${icon ? icon + " " : ""}${msg}`);
    setTimeout(() => setToast(""), 3000);
  }, []);

  /* ---------- History ---------- */
  const undo = () => step > 0 && setText(history[step - 1]);
  const redo = () => step < history.length - 1 && setText(history[step + 1]);

  /* ---------- Keyboard Shortcuts ---------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        copyText();
      }
      // Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Z") ||
        e.key === "y"
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, step, history]);

  /* ---------- Copy / Share ---------- */
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Text copied to clipboard", "📋");
    } catch {
      showToast("Failed to copy text", "❌");
    }
  };

  const shareTool = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard", "🔗");
    } catch {
      showToast("Failed to copy link", "❌");
    }
  };

  /* ---------- Text Actions ---------- */
  const applyAction = useCallback(
    (action: () => void, name: string) => {
      action();
      showToast(`${name} applied`, "✨");
      setActivePreset(name);
      setTimeout(() => setActivePreset(null), 1000);
    },
    [showToast]
  );

  const clearText = () => {
    setText("");
    showToast("Text cleared", "🗑️");
  };

  /* ---------- Presets ---------- */
  const presets = [
    {
      name: "AI Cleaner",
      action: () =>
        setText(
          toSentenceCase(
            removeExtraSpaces(removeEmojis(removeLineBreaks(text)))
          )
        ),
      icon: "🤖",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Email Format",
      action: () => setText(removeLineBreaks(removeExtraSpaces(text))),
      icon: "📧",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Resume Clean",
      action: () =>
        setText(toTitleCase(removeExtraSpaces(removeLineBreaks(text)))),
      icon: "📄",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Social Media",
      action: () => setText(removeExtraSpaces(text)),
      icon: "💬",
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "Code Format",
      action: () => setText(text.replace(/^\s+/gm, "").trim()),
      icon: "💻",
      color: "from-gray-600 to-gray-800",
    },
  ];

  /* ---------- Text Actions ---------- */
  const textActions = [
    { name: "Clean Spaces", action: () => removeExtraSpaces, icon: "🧹" },
    { name: "Remove Lines", action: () => removeLineBreaks, icon: "⏎" },
    { name: "UPPERCASE", action: () => toUpperCase, icon: "🔠" },
    { name: "lowercase", action: () => toLowerCase, icon: "🔡" },
    { name: "Sentence Case", action: () => toSentenceCase, icon: "📝" },
    { name: "Title Case", action: () => toTitleCase, icon: "🏷️" },
    { name: "Camel Case", action: () => toCamelCase, icon: "🐫" },
    { name: "Remove Emojis", action: () => removeEmojis, icon: "😊" },
    { name: "Remove Numbers", action: () => removeNumbers, icon: "🔢" },
    { name: "Reverse Text", action: () => reverseText, icon: "↔️" },
    { name: "Remove Special", action: () => removeSpecialChars, icon: "#️⃣" },
  ];

  /* ---------- Tool of the day ---------- */
  const tools = [
    "AI Output Cleaner",
    "Email Formatter",
    "Resume Optimizer",
    "Social Media Prep",
    "Code Cleaner",
    "Text Normalizer",
    "Case Converter",
  ];
  const todayTool = tools[new Date().getDay() % tools.length];

  /* ---------- Feedback ---------- */
  const submitFeedback = () => {
    if (!feedback.trim()) {
      showToast("Please enter feedback", "💡");
      return;
    }
    setFeedback("");
    showToast("Thanks for your feedback!", "🙏");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Focus textarea on mount
  useEffect(() => {
    if (mounted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-6xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Loading Copy & Go...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in">
            <div className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-sm bg-opacity-90">
              <div className="flex-1">{toast}</div>
              <button
                onClick={() => setToast("")}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-6xl mt-6">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Copy & Go
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Professional text cleaning & formatting tool
                  </p>
                </div>
              </div>

              {/* Today's Tool */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-100 dark:border-blue-800/30">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tool of the Day:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {todayTool}
                  </span>
                </span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Text Input Area - Takes 2/3 on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                {/* Textarea with floating label */}
                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Your Text
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here... Start formatting with presets below."
                    className="w-full h-[300px] md:h-[350px] p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-gray-800 dark:text-gray-100 dark:bg-gray-900/50 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 font-mono text-base leading-relaxed"
                  />
                </div>

                {/* Quick Actions Bar */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={copyText}
                    className="flex-1 min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <span>📋</span>
                    Copy Text
                  </button>
                  <button
                    onClick={clearText}
                    className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300"
                  >
                    Clear
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={undo}
                      disabled={step <= 0}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        step <= 0
                          ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      ↩ Undo
                    </button>
                    <button
                      onClick={redo}
                      disabled={step >= history.length - 1}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        step >= history.length - 1
                          ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      ↪ Redo
                    </button>
                  </div>
                </div>
              </div>

              {/* Presets Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  Quick Presets
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        preset.action();
                        showToast(`${preset.name} applied`, preset.icon);
                        setActivePreset(preset.name);
                        setTimeout(() => setActivePreset(null), 1000);
                      }}
                      className={`group relative p-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                        activePreset === preset.name
                          ? "ring-4 ring-blue-500/30 transform scale-105"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${preset.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                      ></div>
                      <div className="relative">
                        <div className="text-2xl mb-2">{preset.icon}</div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {preset.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Tools & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Text Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.words}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Words
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.characters}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Characters
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.lines}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Lines
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {stats.readingTime}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Min Read
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span>✨</span>
                  Text Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {textActions.map((action) => (
                    <button
                      key={action.name}
                      onClick={() => {
                        setText(action.action()(text));
                        showToast(`${action.name} applied`);
                      }}
                      className="group p-3 text-left rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg group-hover:scale-110 transition-transform">
                          {action.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {action.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Share & Feedback */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Share & Feedback
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={shareTool}
                    className="w-full p-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-gray-950 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>🔗</span>
                    Share This Tool
                  </button>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Have suggestions?
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your idea or feedback..."
                        className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-900/50 transition-colors text-gray-800 dark:text-gray-100"
                        onKeyDown={(e) => e.key === "Enter" && submitFeedback()}
                      />
                      <button
                        onClick={submitFeedback}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Copy & Go
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  A professional text utility for everyday productivity
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Version 1.0 • {new Date().getFullYear()}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Add custom styles for animations */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </main>
    </>
  );
}
