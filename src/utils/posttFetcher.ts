import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { unstable_cache } from 'next/cache';
import { NEXT_PUBLIC_APP_URL } from '../config/config';

const _POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");
const _CACHE_TAGS = { ALL_POSTS: 'posts', SINGLE_POST: 'post' } as const;
const _CACHE_REVALIDATE = parseInt(process.env.CACHE_REVALIDATE || '3600', 10);

interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  url?: string;
}

export function getPostBySlug(slug: string): PostData | null {
  if (!slug) return null;

  try {
    const fullPath = path.join(_POSTS_DIRECTORY, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      content,
      url: `${NEXT_PUBLIC_APP_URL}/posts/${slug}`,
    };
  } catch (error) {
    console.error(`Failed to read post ${slug}:`, error);
    return null;
  }
}

export function getPostSlugs(): string[] {
  const filenames = fs.readdirSync(_POSTS_DIRECTORY);
  return filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(/\.mdx$/, ""));
}

function getPostData(): PostData[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostData => post !== null);
}

export const getCachedPostData = unstable_cache(
  async (): Promise<PostData[]> => getPostData(),
  [_CACHE_TAGS.ALL_POSTS],
  { 
    revalidate: _CACHE_REVALIDATE,
    tags: [_CACHE_TAGS.ALL_POSTS],
  }
);

export const getCachedPostBySlug = unstable_cache(
  async (slug: string): Promise<PostData | null> => getPostBySlug(slug),
  [_CACHE_TAGS.SINGLE_POST],
  { 
    revalidate: _CACHE_REVALIDATE,
    tags: [_CACHE_TAGS.SINGLE_POST],
  }
);