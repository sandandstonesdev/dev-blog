import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { unstable_cache } from 'next/cache';
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
import { CACHE_REVALIDATE } from '@/config/server-config';
import type { PostData } from '@/types/api.types';

const _POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");
const _CACHE_TAGS = { ALL_POSTS: 'posts' } as const;

export function getPostSlugs(): string[] {
  const filenames = fs.readdirSync(_POSTS_DIRECTORY);
  return filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(/\.mdx$/, ""));
}

function getPostData(): PostData[] {
  const posts: (PostData | null)[] = getPostSlugs().map((slug) => {
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
      throw new Error(`Failed to read post: ${slug}, ${String(error)}`);
    }
  });
  
  return posts.filter((post): post is PostData => post !== null);
}

export const getCachedPostData = unstable_cache(
  async (): Promise<PostData[]> => getPostData(),
  [_CACHE_TAGS.ALL_POSTS],
  { 
    revalidate: CACHE_REVALIDATE,
    tags: [_CACHE_TAGS.ALL_POSTS],
  }
);