import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  cover?: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  return {
    slug,
    meta: data as PostMeta,
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  posts.sort(
    (a, b) => Number(new Date(b.meta.date)) - Number(new Date(a.meta.date))
  );
  return posts;
}
