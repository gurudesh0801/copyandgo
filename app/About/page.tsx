"use client";

export default function About() {
  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        About Copy & Go
      </h1>

      {/* Intro */}
      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
        Copy & Go is a free, browser-based text utility designed to help users
        clean, format, and optimize text instantly — without downloads,
        sign-ups, or complexity.
      </p>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 space-y-5">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          In today’s fast-paced digital world, people work with text every day —
          emails, resumes, code snippets, social media captions, AI outputs, and
          more. Copy & Go was created to remove friction from these everyday
          tasks.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Our focus is on <span className="font-medium">speed</span>,{" "}
          <span className="font-medium">simplicity</span>, and{" "}
          <span className="font-medium">privacy</span>. All text processing
          happens directly in your browser. We do not store, track, or log the
          content you paste into the tool.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Copy & Go is suitable for students, developers, content creators, and
          professionals who want quick, reliable text formatting without
          distractions.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-2">⚡ Speed</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Instant processing with no waiting time or unnecessary steps.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-2">🎯 Simplicity</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Clean interface focused on doing one thing well.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-2">🔒 Privacy</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your text stays on your device. Nothing is stored or shared.
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Copy & Go is a product by{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Enclecta
          </span>
          , a technology-focused company building practical digital tools for
          modern users.
        </p>
      </div>
    </section>
  );
}
