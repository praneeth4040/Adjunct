import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center mb-10">Effective Date: deploying date</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Adjunct ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. Data We Collect</h2>
          <p>We may collect the following types of data:</p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Contact information: name, phone number, email address</li>
            <li>Email content (subject lines, timestamps, sender/receiver details)</li>
            <li>Calendar events, tasks, and schedules</li>
            <li>Chat interactions with the AI assistant</li>
            <li>Usage data (device info, timestamps, feature usage)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To personalize and optimize AI responses</li>
            <li>To manage emails, events, and reminders</li>
            <li>To store temporary chat history (up to 5–10 days, max 50 chats)</li>
            <li>To improve performance and user experience</li>
          </ul>
          <p className="mt-2">We never sell or share your data with third parties without your consent.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Data Retention</h2>
          <p>
            We retain your data only as long as necessary to provide our services. Temporary chat data is stored for up to 5–10 days or a maximum of 50 entries per user.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We implement standard security practices to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute protection.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. User Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Access the data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for data use</li>
          </ul>
          <p className="mt-2">You can request any of the above by contacting us directly.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">7. Third-Party Services</h2>
          <p>
            Adjunct may integrate with third-party tools (e.g., email providers or calendar services). Your data with those services is governed by their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be posted here, and the effective date will reflect the latest version. Continued use of Adjunct indicates your acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this policy, please contact us at
            <a href="mailto:adjunctPA@gmail.com" className="text-blue-600 underline ml-1">adjunctPA@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
