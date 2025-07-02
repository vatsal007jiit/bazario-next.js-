'use client'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-green-700 text-center">Contact Us</h1>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h2 className="font-semibold text-green-600">Trade Name:</h2>
            <p>Anchal Aromatics LLP</p>
          </div>
          <div>
            <h2 className="font-semibold text-green-600">Brand Name:</h2>
            <p>Greenatva</p>
          </div>
          <div>
            <h2 className="font-semibold text-green-600">Instagram:</h2>
            <a
              href="https://instagram.com/Greenatva"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:underline"
            >
              @Greenatva
            </a>
          </div>
          <div>
            <h2 className="font-semibold text-green-600">Phone:</h2>
            <a href="tel:9999999999" className=" hover:underline">9999999999</a>
          </div>
          <div>
            <h2 className="font-semibold text-green-600">Email:</h2>
            <a href="mailto:support@greenatva.com" className="hover:underline">
              support@greenatva.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
