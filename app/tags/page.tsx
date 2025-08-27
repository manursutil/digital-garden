import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="container-narrow pb-16">
      <h1 className="text-3xl font-bold mb-8">All Tags</h1>

      {tags.length === 0 ? (
        <p className="opacity-70 dark:opacity-80">
          No tags found. Add tags to your posts in the frontmatter.
        </p>
      ) : (
        <div className="space-y-12">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag);
            return (
              <section
                key={tag}
                className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
              >
                <h2 className="text-2xl font-bold mb-4">
                  #{tag} ({posts.length} post{posts.length !== 1 ? "s" : ""})
                </h2>
                <ul className="space-y-4">
                  {posts.map(({ slug, meta }) => (
                    <li
                      key={slug}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          <Link
                            href={`/blog/${slug}`}
                            className="accent-underline hover:border-red-400 dark:hover:border-red-300"
                          >
                            {meta.title}
                          </Link>
                        </h3>
                        <div className="text-sm opacity-70 dark:opacity-80 mt-1">
                          {new Date(meta.date).toLocaleDateString()}
                        </div>
                        {meta.excerpt && (
                          <p className="text-sm opacity-90 dark:opacity-95 mt-2 leading-relaxed">
                            {meta.excerpt}
                          </p>
                        )}
                      </div>
                      {meta.cover && (
                        <img
                          src={meta.cover}
                          alt={meta.title}
                          className="w-24 h-16 object-cover rounded flex-shrink-0"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
