import React from "react";
import { Link, useNavigate } from "react-router-dom";
const TermsAndConditions = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-10 text-center">Effective Date: deploying date</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By using Adjunct (the "Platform", "Service", or "Site"), you agree to these Terms and Conditions and our 
          <Link to="/privacy" className="text-blue-600 underline ml-1">Privacy Policy</Link>. If you do not agree, please refrain from using the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Description of Services</h2>
        <p>
          Adjunct offers services including, but not limited to:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>AI-powered email management</li>
            <li>Event scheduling and reminders</li>
            <li>Personal messaging and task handling</li>
            <li>Temporary chat with AI (Gemini)</li>
            <li>Data-driven responses using personal inputs like emails (with permission)</li>
          </ul>
          These services are subject to updates or modifications at any time without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Data Collection and Usage</h2>
        <p>
          In order to provide personalized assistant services, Adjunct may collect and store certain user data, including:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Contact details (names, phone numbers, email addresses)</li>
            <li>Email content (subject lines, timestamps, sender/receiver info)</li>
            <li>Event details (titles, dates, reminders)</li>
          </ul>
          This data is used exclusively to:
          <ul className="list-disc list-inside mt-2 ml-4 mt-2">
            <li>Automate and manage tasks like sending reminders and organizing schedules</li>
            <li>Generate intelligent suggestions through AI</li>
            <li>Enhance your experience across different Adjunct features</li>
          </ul>
          We do not share or sell your personal data to third parties. Data access is limited to the functions explicitly required for providing our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. User Eligibility</h2>
        <p>
          You must be at least 13 years old to use Adjunct. If you are under 18, you may only use the service under the supervision of a parent or guardian.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. User Responsibilities</h2>
        <p>
          You agree to:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Provide accurate and up-to-date information</li>
            <li>Use the platform for lawful purposes only</li>
            <li>Not share your account credentials</li>
            <li>Not attempt to reverse engineer, hack, or exploit the platform</li>
          </ul>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Temporary Chat Storage</h2>
        <p>
          Adjunct stores up to <strong>50 chats</strong> per user for a maximum of <strong>5-10 days</strong>. Chats are stored temporarily and may be cleared after the time limit or chat limit is reached. Navigation between pages does not clear chat history.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
        <p>
          Adjunct reserves the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform indicates your acceptance of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Contact</h2>
        <p>
          If you have any questions or concerns regarding these Terms, please contact us at 
          <a href="mailto:adjunctPA@gmail.com" className="text-blue-600 underline ml-1">adjunctPA@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
