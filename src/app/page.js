import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
     <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-20"
      style={{ backgroundImage: "url('/bg.avif')" }} 
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-52 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Elevate Your <span>Style</span> with{" "}
          <span className="text-white">TrendLoom</span>
        </h1>

        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Discover the latest fashion trends, outfit inspirations, and style
          guides curated for modern fashion lovers.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/blog"
            className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
    
    <section className="bg-white py-52 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Latest <span className="text-gray-700">Trends</span>
        </h2>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/Streetwear Trends.avif"
              alt="Street Style"
              className="w-full h-56 object-cover"
              width={600}
                height={224}
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Street Style Inspiration
              </h3>
              <p className="text-gray-600 mb-4">
                Discover how streetwear is redefining everyday looks with bold
                statements and casual flair.
              </p>
              <Link 
                href="/blog/1"
                className="text-gray-500 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/Wardrobe Essentials.avif"
              alt="Minimal Outfits"
              className="w-full h-56 object-cover"
              width={600}
                height={224}
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Minimalist Outfits
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to curate timeless wardrobe essentials with neutral
                tones and versatile styling.
              </p>
              <Link
                href="/blog/2"
                className="text-gray-500 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/Sustainable Fashion.avif"
              alt="Sustainable Fashion"
              className="w-full h-56 object-cover"
              width={600}
              height={224}
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sustainable Fashion Picks
              </h3>
              <p className="text-gray-600 mb-4">
                Explore eco-friendly brands and outfits that make a positive
                impact without losing style.
              </p>
              <Link
                href="/blog/3"
                className="text-gray-500 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16 px-6 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the TrendLoom Community
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to get fashion tips, trend alerts, and exclusive content
            straight to your inbox.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-gray-100 w-full md:w-auto"
            />
            <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
