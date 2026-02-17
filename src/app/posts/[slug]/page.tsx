import { Suspense } from 'react';

import { baseMetadata } from '@/config/metadata';
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
import { getPostSlugs } from '@/lib/api/posts/postFetcher';
import { isValidSlug } from '@/lib/helper/validators';
import { formatPostDate } from '@/lib/helper/formatters';
import type { SlugParams } from '@/types/common.types';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  if (!isValidSlug(slug)) {
    return baseMetadata;
  }
  
  const { metadata } = await import(`@/content/posts/${slug}.mdx`);
  return {
    ...baseMetadata,
    ...metadata,
    openGraph: {
      url: `${NEXT_PUBLIC_APP_URL}/posts/${slug}`,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

async function PostContentComponent({ params }: { params: SlugParams }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  if (!isValidSlug(slug)) {
    throw new Error('Invalid slug');
  }
  const { default: PostContent, metadata } = await import(`@/content/posts/${slug}.mdx`);
  return (
    <section className="section-container">
      <article className="prose-section mx-auto">
        <header className="mb-8 pb-6 border-b border-gray-300 dark:border-gray-700">
          <h1 className="heading-page mb-3">
            {metadata.title}
          </h1>
          {metadata.date && (
            <time className="text-muted">
              {formatPostDate(metadata.date)}
            </time>
          )}
        </header>
        <PostContent />
      </article>
    </section>
  );
}

export default function Post(props: { params: SlugParams }) {
  return (
    <Suspense fallback={<div className="section-container text-center py-12">Loading post...</div>}>
      <PostContentComponent {...props} />
    </Suspense>
  );
}