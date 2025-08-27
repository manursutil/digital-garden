import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "error";

const RECENT_COUNT = 5;

export default function Home() {
  const posts = getAllPosts().slice(0, RECENT_COUNT);

  return (
    <main className="container-narrow pb-16">
      <p className="mt-3 opacity-80 dark:opacity-90">
        Welcome to my Digital Garden!
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold inline-block accent-underline">
          Recent posts
        </h2>

        {posts.length === 0 ? (
          <p className="mt-6 opacity-70 dark:opacity-80">
            No posts yet. Add some in{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
              content/posts
            </code>
            .
          </p>
        ) : (
          <ul className="mt-6 space-y-8">
            {posts.map(({ slug, meta }) => (
              <li
                key={slug}
                className="grid grid-cols-[160px_1fr] gap-4 items-start"
              >
                {meta.cover ? (
                  <Image
                    src={meta.cover}
                    alt={meta.title}
                    width={160}
                    height={128}
                    className="w-[160px] h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-[160px] h-32" />
                )}

                <div>
                  <h3 className="text-xl font-semibold">
                    <Link
                      href={`/blog/${slug}`}
                      className="accent-underline hover:border-red-400 dark:hover:border-red-300"
                    >
                      # {meta.title}
                    </Link>
                  </h3>

                  <div className="mt-1 text-sm opacity-70 dark:opacity-80">
                    {new Date(meta.date).toLocaleDateString()}
                  </div>

                  {meta.tags && meta.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {meta.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  {meta.excerpt && (
                    <p className="mt-2 leading-relaxed opacity-90 dark:opacity-95">
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
