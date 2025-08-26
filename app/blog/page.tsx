import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const PAGE_SIZE = 10;

type Props = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogIndex({ searchParams }: Props) {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const resolvedSearchParams = await searchParams;
  const pageParam = parseInt(resolvedSearchParams?.page ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const start = (clampedPage - 1) * PAGE_SIZE;
  const pagePosts = all.slice(start, start + PAGE_SIZE);

  return (
    <main className="bg-white text-black container-narrow pb-16">
      <h3 className="text-xl font-bold mb-8">All Posts</h3>

      {pagePosts.length === 0 ? (
        <p className="mt-6 opacity-70">
          No posts yet. Add some in <code>content/posts</code>.
        </p>
      ) : (
        <ul className="mt-6 space-y-8">
          {pagePosts.map(({ slug, meta }) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex gap-2 items-center mt-8">
          <Link
            href={`/blog?page=${Math.max(1, clampedPage - 1)}`}
            aria-disabled={clampedPage === 1}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            ← Prev
          </Link>

          <span className="text-gray-500">
            Page {clampedPage} of {totalPages}
          </span>

          <Link
            href={`/blog?page=${Math.min(totalPages, clampedPage + 1)}`}
            aria-disabled={clampedPage === totalPages}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Next →
          </Link>
        </nav>
      )}
    </main>
  );
}
