import type { Metadata } from "next";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      images: meta.cover ? [{ url: meta.cover }] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  const html = await markdownToHtml(content);

  return (
    <article className="container-narrow pb-16">
      <h1 className="text-3xl font-bold mb-4"># {meta.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        {new Date(meta.date).toLocaleDateString()}
      </p>

      {meta.tags && meta.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {meta.cover && (
        <figure className="mb-8">
          <Image
            src={meta.cover}
            alt={meta.title}
            width={720}
            height={405}
            className="w-full h-auto rounded-lg"
          />
        </figure>
      )}
      <div
        className="prose lg:prose-xl dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-gray-800 dark:prose-code:text-gray-200"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
