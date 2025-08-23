import { notFound } from "next/navigation";

// Dummy Blog Data (replace later with DB or API)
const blogs = [
  {
    id: "1",
    title: "Streetwear Trends 2025",
    desc: "Explore the latest streetwear fashion and how to style it effortlessly.",
    img: "/images/blog1.jpg",
    content: `
      Streetwear continues to dominate fashion in 2025, blending comfort with bold aesthetics.
      Oversized hoodies, chunky sneakers, and statement caps remain key essentials.
      
      One major shift is towards sustainable fabrics, with brands introducing eco-friendly alternatives 
      that don’t compromise on style. Neutral tones are gaining popularity, but vibrant colors are making
      a comeback in accessories.

      Styling tip: Pair an oversized hoodie with wide-leg jeans and sneakers for a casual yet trendy look.
      Add accessories like crossbody bags or caps to complete the outfit.
    `,
  },
  {
    id: "2",
    title: "Minimalist Wardrobe Essentials",
    desc: "A guide to curating timeless, minimalist outfits that never go out of style.",
    img: "/images/blog2.jpg",
    content: `
      A minimalist wardrobe focuses on quality over quantity, emphasizing versatile pieces that can be mixed and matched.
      Key essentials include a well-fitted white shirt, tailored trousers, a classic trench coat, and a pair of 
      leather loafers.

      Neutral colors like black, white, beige, and gray form the foundation of a minimalist wardrobe. Investing in 
      high-quality fabrics ensures longevity and comfort.

      Styling tip: Create multiple outfits by layering basic pieces. For example, pair a white shirt with jeans for 
      a casual look or with tailored trousers for a more polished appearance.

      Accessories should be kept simple, such as a leather watch or a structured handbag, to maintain the minimalist aesthetic.
    `,
  },
];

export default function BlogDetailPage({ params }) {
  const blog = blogs.find((b) => b.id === params.slug);

  if (!blog) return notFound();

  return (
    <main className="bg-white  min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900  leading-tight">
          {blog.title}
        </h1>

        {/* Short Description */}
        <p className="mt-4 text-lg text-gray-800 ">
          {blog.desc}
        </p>

        {/* Blog Image */}
        <div className="mt-8 rounded-2xl overflow-hidden shadow-md">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="mt-10 prose prose-lg prose-gray text-gray-800 dark:prose-invert max-w-none leading-relaxed">
          {blog.content}
        </div>
      </article>
    </main>
  );
}
