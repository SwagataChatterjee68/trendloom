import Link from "next/link";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "Streetwear Trends 2025",
      desc: "Explore the latest streetwear fashion and how to style it effortlessly.",
      img: "/Streetwear Trends.avif",
    },
    {
      id: 2,
      title: "Minimalist Wardrobe Essentials",
      desc: "A guide to curating timeless, minimalist outfits that never go out of style.",
      img: "/Wardrobe Essentials.avif",
    },
    {
      id: 3,
      title: "Top Summer Fashion Picks",
      desc: "Stay cool and stylish this summer with these trending outfits.",
      img: "/summer fashion.avif",
    },
    {
      id: 4,
      title: "Fashion Accessories That Elevate",
      desc: "From statement bags to chic sunglasses, learn what’s trending now.",
      img: "/fashion Accessories.avif",
    },
    {
      id: 5,
      title: "Sustainable Fashion Movement",
      desc: "Why sustainable fashion matters and how you can contribute.",
      img: "/Sustainable Fashion.avif",
    },
    {
      id: 6,
      title: "Runway Inspired Daily Outfits",
      desc: "Turn high-fashion runway looks into wearable everyday outfits.",
      img: "/Runway Inspired.avif",
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Trend<span className="text-gray-500">Loom</span> Blog
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated articles on the latest fashion trends, styling tips, and outfit inspirations.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-96 bg-gray-200">
                {blog.img ? (
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 mt-3">{blog.desc}</p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="mt-4 inline-block text-gray-900 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
