'use client'

export default function Terms() {
  return (
    <div className="min-h-screen bg-green-300 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">Terms of Service</h1>
        <p className="text-center text-sm text-gray-500">Welcome to Greenatva! Please read carefully.</p>

        <Section title="1. Online Store Terms">
          By accessing this Site, you confirm that you are at least 18 years old and agree not to use our services for any unlawful purposes.
        </Section>

        <Section title="2. General Conditions">
          We reserve the right to refuse service to anyone at any time. Your non-sensitive data may travel unencrypted; sensitive info like card details is always encrypted.
        </Section>

        <Section title="3. Accuracy of Information">
          We are not responsible if site information is inaccurate or outdated. The content is provided for general informational use only.
        </Section>

        <Section title="4. Modifications to Services and Prices">
          Prices and services may change without notice. We are not liable for any modification or discontinuation of the service.
        </Section>

        <Section title="5. Products or Services">
          Some products are available exclusively online and may be limited in quantity. All product visuals aim to be accurate but may vary by screen.
        </Section>

        <Section title="6. Billing and Account Info">
          You agree to provide accurate billing info. We may cancel orders or limit quantities, and we’ll notify you using your provided contact details.
        </Section>

        <Section title="7. Optional Tools">
          We may offer access to third-party tools “as is” without warranties. Use at your own discretion and risk.
        </Section>

        <Section title="8. Third-Party Links">
          We are not liable for third-party content linked from our Site. Proceed at your own risk.
        </Section>

        <Section title="9. User Comments and Feedback">
          By submitting feedback or ideas, you allow us to use them without any obligation to maintain confidentiality or compensate you.
        </Section>

        <Section title="10. Personal Information">
          Submission of personal information is governed by our <a href="/privacy" className="text-green-600 underline">Privacy Policy</a>.
        </Section>

        <Section title="11. Errors and Omissions">
          We reserve the right to correct inaccuracies or cancel orders without prior notice.
        </Section>

        <Section title="12. Prohibited Uses">
          You may not use the Site for unlawful activities, to infringe intellectual property, or submit misleading data.
        </Section>

        <Section title="13. Disclaimer of Warranties">
          We don’t guarantee uninterrupted or error-free service. All services and products are provided “as is.”
        </Section>

        <Section title="14. Indemnification">
          You agree to indemnify and hold harmless Greenatva and its associates from any claim or demand due to your violation of these Terms.
        </Section>

        <Section title="15. Severability">
          If any term is unenforceable, it will be severed without affecting the validity of the rest.
        </Section>

        <Section title="16. Termination">
          You or we may terminate this agreement at any time. Breach of terms may result in immediate service termination.
        </Section>

        <Section title="17. Entire Agreement">
          These Terms constitute the full agreement and supersede any prior agreements.
        </Section>

        <Section title="18. Governing Law">
          These Terms are governed by the laws of India.
        </Section>

        <Section title="19. Changes to Terms">
          We may revise these Terms at any time. Continued use of the Site means you accept the changes.
        </Section>

        <Section title="Contact Us">
          <strong>Greenatva Customer Service</strong><br />
          Email: <a href="mailto:support@greenatva.com" className="text-green-600 underline">support@greenatva.com</a><br />
          Phone: <a href="tel:9999999999" className="text-green-600 underline">9999999999</a>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-600 mb-1">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}
