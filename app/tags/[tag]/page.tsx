import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="container-narrow pb-16">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-sm opacity-70 dark:opacity-80 hover:opacity-100"
        >
          ← Back to all tags
        </Link>
        <h1 className="text-3xl font-bold mt-2">#{tag}</h1>
        <p className="text-lg opacity-80 dark:opacity-90 mt-2">
          {posts.length} post{posts.length !== 1 ? "s" : ""} tagged with &ldquo;
          {tag}&rdquo;
        </p>
      </div>

      <ul className="space-y-8">
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
                  {meta.tags.map((postTag) => (
                    <Link
                      key={postTag}
                      href={`/tags/${postTag}`}
                      className={`text-xs px-2 py-1 rounded-full ${
                        postTag === tag
                          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      #{postTag}
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
    </main>
  );
}
