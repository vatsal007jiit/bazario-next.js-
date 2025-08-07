'use client'
export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-green-300 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">Shipping Policy</h1>

        {/* Shipping Locations */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Shipping Locations:</h2>
          <p className="text-gray-700">We currently ship only within India.</p>
        </div>

        {/* Shipping Charges */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Shipping Charges:</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Standard Shipping: ₹50 for all orders under ₹1,000.</li>
            <li>Free Shipping: On orders over ₹1,000.</li>
          </ul>
        </div>

        {/* Shipping Time */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Shipping Time:</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>All orders are processed and dispatched within 1 day after the order is placed.</li>
            <li>Delivery times vary by location, typically 2–4 business days from the date of dispatch.</li>
          </ul>
        </div>

        {/* Order Tracking */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Order Tracking:</h2>
          <p className="text-gray-700">
            Once your order is shipped, you will receive an email and a WhatsApp message from Greenatva
            with tracking information. You can track your package via the provided link to stay updated on its delivery status.
          </p>
        </div>

        {/* Delivery Issues */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Delivery Issues:</h2>
          <p className="text-gray-700">
            For delays or undelivered packages, please contact our support team at{" "}
            <a href="mailto:support@greenatva.com" className="text-green-500 underline">support@greenatva.com</a>{" "}
            or call <a href="tel:9999999999" className="text-green-500 underline">9999999999</a>. We will assist you as quickly as possible.
          </p>
        </div>

        {/* Returns Policy */}
        <h1 className="text-3xl font-bold text-green-700 pt-4 border-t border-green-200">Returns Policy</h1>

        {/* No Returns Policy */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">No Returns Policy:</h2>
          <p className="text-gray-700">
            Due to the nature of our products, we do not accept returns once the order has been delivered.
            We strive to provide detailed product descriptions and images to help you make an informed purchase.
          </p>
        </div>

        {/* Damaged or Defective Items */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Damaged or Defective Items:</h2>
          <p className="text-gray-700">
            If you receive a damaged or defective item, please contact us within 48 hours of receiving the product.
            Email us at{" "}
            <a href="mailto:support@greenatva.com" className="text-green-500 underline">support@greenatva.com</a>{" "}
            with your order number and a clear photo of the issue. If eligible, we’ll arrange a replacement or refund.
          </p>
        </div>

        {/* Customer Satisfaction */}
        <div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Customer Satisfaction:</h2>
          <p className="text-gray-700">
            Your satisfaction is our priority. If you have any concerns or questions, feel free to reach out — we are here to help!
          </p>
        </div>
      </div>
    </div>
  );
}
