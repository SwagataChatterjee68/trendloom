import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-52 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Elevate Your <span className="text-gray-500">Style</span> with TrendLoom
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest fashion trends, outfit inspirations, and style guides curated for modern fashion lovers.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/blog"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="border text-gray-400 border-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured <span className="text-gray-500">Posts</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card */}
          {["Streetwear Vibes", "Minimalist Outfits", "Summer Essentials"].map((title, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-2">
                  A short preview of the blog post goes here...
                </p>
                <Link href="/blog" className="mt-4 inline-block text-gray-900 font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the TrendLoom Community</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to get fashion tips, trend alerts, and exclusive content straight to your inbox.
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
