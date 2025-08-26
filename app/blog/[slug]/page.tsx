import type { Metadata } from "next";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import Image from "next/image";

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
      <p className="text-gray-500 text-sm mb-8">
        {new Date(meta.date).toLocaleDateString()}
      </p>
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
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
