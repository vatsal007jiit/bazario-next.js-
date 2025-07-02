'use client'
import { useEffect, useState } from 'react';
import { ChevronDown, Star, ArrowRight, Play, Zap, Shield, ChevronLeft, ChevronRight, LeafyGreen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false)
  
  useEffect(() => {
    setIsBrowser(true)
  }, [])
   const heroImages = [
    {
      src: "https://greenatva.com/cdn/shop/files/Beige_Photo_Collage_Personal_Mood_Board_Facebook_Video.gif?v=1725707420&width=3840",
      alt: "Premium Natural Products"
    },
    {
      src: "/images/mia.webp",
      alt: "Mia"
    },
    {
      src: "/images/prana.webp", 
      alt: "prana"
    },
    {
      src: "/images/kavach.webp",
      alt: "kavach"
    },
    {
      src: "/images/raahat.webp", 
      alt: "raahat"
    },
    {
      src: "/images/lori.webp",
      alt: "lori"
    },
    {
      src: "/images/teethe.webp", 
      alt: "teethe"
    },
    {
      src: "/images/shwas.webp",
      alt: "shwas"
    },
    {
      src: "/images/kingKit.webp",
      alt: "King Kit"
    },
    {
      src: "/images/queenKit.webp",
      alt: "Queen Kit"
    },
    {
      src: "/images/littleKit.webp",
      alt: "Little Kit"
    },
    {
      src: "/images/review1.webp",
      alt: "Reviews-Mia"
    },
    {
      src: "/images/review2.webp",
      alt: "Reviews-Lori"
    },
    {
      src: "/images/review3.webp",
      alt: "Reviews-Kavach"
    }
  ];

   // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  const testimonials = [
    {
      name: "Juhi Agrawal",
      role: "Product Manager",
      image: "/images/avt-f.png",
      text: "This solution completely transformed how we approach our daily challenges. The results were immediate and impressive.",
      rating: 5
    },
    {
      name: "Vatsal Gupta",
      role: "Enterpreneur",
      image: "/images/avatar-vg.jpg",
      text: "The quality is outstanding and the support team is incredibly responsive. Highly recommend to anyone!",
      rating: 5
    },
    {
      name: "Shruti",
      role: "Entrepreneur",
      image: "/images/avatar-sa.jpg", 
      text: "I've tried many solutions before, but nothing comes close to the effectiveness and ease of use of this product.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <LeafyGreen className="w-8 h-8" />,
      title: "Natural & Safe",
      description: "Made with premium natural ingredients, safe for daily use without harmful side effects."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Proven Results",
      description: "Backed by thousands of satisfied customers and scientific research for guaranteed effectiveness."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Acting",
      description: "Experience noticeable results within minutes of application. Quick relief when you need it most."
    }
  ];

  const faqs = [
    {
        question: "How many times a day can I use this roll on?",
        answer:"As often as you would like for relief."
    },
    {
        question: "Can I use multiple products at once?",
        answer:"Yes, it is safe as they work on different parts of body and don't interfere with each other's functionalities."
    },
    {
        question: "Why are these products non-habit forming?",
        answer:"These products rely on the natural, gentle effects of essential oils to promote wellness without forcing body into a specific state or altering the brain’s natural functions. These are holistic products which support immune system and bring balance back to body."
    },
    {
        question: "How do I check if I am allergic to any product or ingredients?",
        answer:"Allergies to these natural ingredients are very rare. However, if you are unsure, apply on a patch of skin and wait for 15-20 mins.If any signs of allergy appear, we suggest you not to use it."
    },
    {
        question: "Are these products returnable?",
        answer:"Due to the personal usage nature of these roll-ons, these are non-returnable."
    },
    {
      question: "How often can I use this product?",
      answer: "You can use our product as often as needed throughout the day. It's made with natural ingredients that are gentle and safe for frequent application."
    },
    {
      question: "Is it safe for sensitive skin?",
      answer: "Yes, our formula is specifically designed to be gentle on all skin types, including sensitive skin. However, we recommend doing a patch test if you have known allergies."
    },
    {
      question: "Do they contain any preservatives?",
      answer: "No, Essential Oils are self preservatory for long periods of time due to their antimicrobial and antifungal characteristics. Moreover, these are packaged in glass bottles which keeps essential oils stable. Hence, pure essential oils blend (without any water) don't need any preservatives."
    },
    {
      question: "Do they contain any artifical fragrances?",
      answer: "No, these products are 100% natural. Essential oils are nature's gift with strong beautiful aromas. Nothing artificial can match the aroma of pure essential oils."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
    
      {/* Hero Section */}
      <section className="relative overflow-hidden py-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-green-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>Trusted by 1,000+ customers</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Natural</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                  Wellness
                </span>
                <br />
                <span className="text-gray-900">Revolution</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience the power of nature with our premium collection of wellness solutions. 
                Safe, effective, and crafted with love for your wellbeing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
           <div className="relative">
      <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {/* Image Container */}
        <div className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-2xl overflow-hidden relative group">
          {/* Main Image */}
          <img 
            src={heroImages[currentImageIndex].src} 
            alt={heroImages[currentImageIndex].alt}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Fallback content if image fails */}
          <div className="absolute inset-0 flex items-center justify-center text-white bg-gradient-to-br from-green-300 to-green-500" style={{display: 'none'}}>
            <div className="text-center">
              <LeafyGreen className="w-24 h-24 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold">Premium Quality</h3>
              <p className="text-green-100 mt-2">100% Natural Ingredients</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-500 backdrop-blur-sm cursor-pointer rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 backdrop-blur-sm cursor-pointer rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white border border-green-800 scale-125' 
                    : 'bg-green-500'
                }`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {heroImages.length}
          </div>
        </div>

      </div>
    </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">Greenatva</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the difference that natural, premium quality products can make in your daily wellness routine.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-green-300 to-green-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their wellness journey with us.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeTestimonial === index 
                      ? 'bg-gradient-to-br from-green-50 to-green-100 shadow-lg transform scale-105' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  <div className="flex items-center mb-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our products and services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-green-100 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-700 text-lg pt-1 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have already discovered the power of natural wellness solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Shop Now
            </Link>
            <Link href="/about" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}