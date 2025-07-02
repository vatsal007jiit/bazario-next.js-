'use client'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-green-300 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">Privacy Policy</h1>
        <p className="text-center text-sm text-gray-500">Last updated: August 15, 2024</p>

        <p className="text-gray-700 leading-relaxed">
          This Privacy Policy describes how <strong>Greenatva</strong> (“we”, “us”, or “our”) collects, uses, and discloses your personal information when you use our website and services. By using the site, you agree to the practices described below.
        </p>

        <div className="space-y-4">
          <Section title="Changes to This Privacy Policy">
            We may update this Privacy Policy periodically. Changes will be reflected with an updated date above.
          </Section>

          <Section title="How We Collect and Use Your Personal Information">
            We collect personal data via forms, interactions, cookies, and third-party tools to provide and improve our services.
          </Section>

          <Section title="Information We Collect">
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Directly from You:</strong> Name, email, phone, address, login credentials, etc.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, device data, site interactions (via cookies).</li>
              <li><strong>Third Parties:</strong> Payment gateways, shipping partners, analytics providers.</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>To provide and improve services and fulfill orders.</li>
              <li>To personalize marketing and promotional content.</li>
              <li>To prevent fraud and secure user data.</li>
              <li>To respond to inquiries and support tickets.</li>
            </ul>
          </Section>

          <Section title="Cookies">
            We use cookies for analytics, site functionality, and personalized experiences.
          </Section>

          <Section title="Disclosure of Information">
            We may share your data with:
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Vendors (e.g., payment processors, delivery partners).</li>
              <li>Marketing platforms (e.g., email tools, ad partners).</li>
              <li>Legal authorities when required.</li>
              <li>Within our affiliate businesses.</li>
            </ul>
          </Section>

          <Section title="Third-Party Links">
            Our site may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies independently.
          </Section>

          <Section title="Children's Data">
            We do not knowingly collect data from children. If you’re a guardian of a minor who submitted data, contact us for removal.
          </Section>

          <Section title="Security & Retention">
            We use industry-standard safeguards, but no system is 100% secure. Data is retained as long as needed for business, legal, or regulatory purposes.
          </Section>

          <Section title="Your Rights">
            Depending on your jurisdiction, you may:
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Request access, correction, deletion of your data.</li>
              <li>Withdraw consent or opt out of communications.</li>
              <li>File a complaint if dissatisfied with our response.</li>
            </ul>
            Contact us to exercise your rights. We may verify your identity before processing.
          </Section>

          <Section title="International Transfers">
            Your data may be processed outside your country, including by our service providers. We comply with standard protection mechanisms like SCCs.
          </Section>

          <Section title="Contact Us">
            For questions or privacy concerns, contact us at:<br />
            <span className="block mt-1">
              <strong>Email:</strong> <a href="mailto:support@greenatva.com" className="text-green-600 underline">support@greenatva.com</a><br />
              <strong>Phone:</strong> <a href="tel:9999999999" className="text-green-600 underline">9999999999</a>
            </span>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-600 mb-1">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}
