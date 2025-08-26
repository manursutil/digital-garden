import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "error";

const RECENT_COUNT = 5;

export default function Home() {
  const posts = getAllPosts().slice(0, RECENT_COUNT);

  return (
    <main className="container-narrow pb-16">
      <p className="mt-3 opacity-80">Welcome to my Digital Garden!</p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold inline-block accent-underline">
          Recent posts
        </h2>

        {posts.length === 0 ? (
          <p className="mt-6 opacity-70">
            No posts yet. Add some in <code>content/posts</code>.
          </p>
        ) : (
          <ul className="mt-6 space-y-8">
            {posts.map(({ slug, meta }) => (
              <li
                key={slug}
                className="grid grid-cols-[160px_1fr] gap-4 items-start"
              >
                {meta.cover ? (
                  <img
                    src={meta.cover}
                    alt={meta.title}
                    className="w-[160px] h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-[160px] h-32" />
                )}

                <div>
                  <h3 className="text-xl font-semibold">
                    <Link
                      href={`/blog/${slug}`}
                      className="accent-underline hover:border-red-400"
                    >
                      # {meta.title}
                    </Link>
                  </h3>

                  <div className="mt-1 text-sm opacity-70">
                    {new Date(meta.date).toLocaleDateString()}
                  </div>

                  {meta.excerpt && (
                    <p className="mt-2 leading-relaxed opacity-90">
                      {meta.excerpt}
                    </p>
                  )}

                  <p className="mt-2">
                    <Link
                      href={`/blog/${slug}`}
                      className="link-accent inline-flex items-center"
                    >
                      Read more →
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10">
          <Link href="/blog" className="link-accent">
            View all posts →
          </Link>
        </p>
      </section>
    </main>
  );
}
