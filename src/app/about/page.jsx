export default function AboutPage() {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">
          About <span className="text-gray-500">Us</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900">TrendLoom</span>, 
          your go-to destination for curated fashion trends, timeless style guides, 
          and the latest insights from the world of fashion.  
        </p>

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80"
              alt="Fashion showcase"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/20"></div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At TrendLoom, we believe fashion is more than just clothing — it’s 
              a way to express your unique identity. Our mission is to empower 
              individuals to embrace their personal style and stay confident in 
              every outfit they wear.
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Why Trend With Us?
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Latest fashion news & seasonal guides</li>
              <li>Minimal & modern styling inspirations</li>
              <li>Honest reviews & sustainable fashion picks</li>
              <li>A growing community of style enthusiasts</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Be Part of Our Story
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Fashion is evolving, and so are we. Join us on this journey and explore 
            the art of styling, self-expression, and sustainable choices.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
