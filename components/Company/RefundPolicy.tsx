'use client'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-green-300 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">Refund Policy</h1>

        <p className="text-gray-700">
          At <span className="font-semibold text-green-700">Greenatva</span>, we are committed to providing our customers with
          the highest quality wellness products. Due to the nature of our products, we have a strict return and refund policy outlined below.
        </p>

        {/* 1. No Return Policy */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">1. No Return Policy</h2>
          <p className="text-gray-700">
            <strong>Final Sale:</strong> All products sold on our website are final sale. We do not accept returns or exchanges for any products once they have been delivered,
            except in the case of damaged or defective items as detailed below.
          </p>
        </div>

        {/* 2. Damaged or Defective Items */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">2. Damaged or Defective Items</h2>
          <p className="text-gray-700">
            We take great care in ensuring that our products reach you in perfect condition. However, if you receive a damaged or defective item, we are here to assist you.
          </p>

          <p className="text-gray-700 mt-2">
            <strong>Reporting a Problem:</strong><br />
            If you receive a damaged or defective item, you must notify us within 48 hours of receiving your order.<br />
            Email us at <a href="mailto:support@greenatva.com" className="text-green-500 underline">support@greenatva.com</a> with:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mt-1 space-y-1">
            <li>Your order number</li>
            <li>A description of the issue</li>
            <li>Clear photos of the damaged or defective product</li>
          </ul>

          <p className="text-gray-700 mt-2">
            <strong>Resolution Process:</strong><br />
            Once we receive your email, our customer service team will review your case.<br />
            If the product is deemed damaged or defective, we will offer you:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mt-1 space-y-1">
            <li>A replacement (if available)</li>
            <li>Or a full refund if replacement is not available</li>
          </ul>

          <p className="text-gray-700 mt-2">
            Refunds will be processed to the original method of payment within 7–10 business days.
          </p>
        </div>

        {/* 3. Cancellation Policy */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">3. Cancellation Policy</h2>
          <p className="text-gray-700">
            <strong>Order Cancellation:</strong><br />
            Orders can only be canceled <strong>before they are shipped</strong>.
            To cancel, please contact us as soon as possible at{" "}
            <a href="mailto:support@greenatva.com" className="text-green-500 underline">support@greenatva.com</a> or{" "}
            <a href="tel:9999999999" className="text-green-500 underline">9999999999</a>.
            <br />
            If your order has already shipped, cancellation is not possible, and our no return policy applies.
          </p>
        </div>

        {/* 4. Refund Policy */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">4. Refund Policy</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Refunds are only issued for <strong>damaged or defective items</strong> that cannot be replaced.</li>
            <li>Refunds will be processed to the original payment method within 7–10 business days after approval.</li>
            <li>Shipping costs are <strong>non-refundable</strong>, except in cases where the product is damaged or defective.</li>
          </ul>
        </div>

        {/* 5. Contact Us */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">5. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Return and Refund Policy or need help with a damaged item, reach out to:
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Greenatva Customer Service</span><br />
            Email: <a href="mailto:support@greenatva.com" className="text-green-500 underline">support@greenatva.com</a><br />
            Phone: <a href="tel:9999999999" className="text-green-500 underline">9999999999</a>
          </p>
        </div>

        <p className="text-gray-700 pt-4">
          We appreciate your understanding and cooperation in helping us maintain a high standard of quality and service.
        </p>
      </div>
    </div>
  );
}
