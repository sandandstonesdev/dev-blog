import { baseMetadata } from '@/config/metadata';
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
import { getPostSlugs } from '@/utils/posttFetcher';
import { isValidSlug } from '@/utils/validators';
import { formatPostDate } from '@/utils/formatters';
import type { SlugParams } from '@/types/params';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateStaticPaths() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => `/posts/${slug}`);
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

const Post = async ({ params }: { params: SlugParams }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  if (!isValidSlug(slug)) {
    throw new Error('Invalid slug');
  }
  
  const { default: PostContent, metadata } = await import(`@/content/posts/${slug}.mdx`);
  
  return (
    <article className="prose-section mx-auto px-4 py-8">
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
      
      {/* Post Content */}
      <div className="post-content">
        <PostContent />
      </div>
    </article>
  )
}

export default Post
