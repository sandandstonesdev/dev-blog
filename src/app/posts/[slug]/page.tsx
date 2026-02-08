import { baseMetadata } from '@/config/metadata';
import { NEXT_PUBLIC_APP_URL } from '@/config/config';
import { getPostBySlug, getPostSlugs } from '@/utils/posttFetcher';

type Params = Promise<{ slug: string}>;

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateStaticPaths() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => `/posts/${slug}`);
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
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

const Post = async ({ params }: { params: Params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { default: PostContent, metadata } = await import(`@/content/posts/${slug}.mdx`);
  
  return (
    <div className="prose prose-lg mx-auto">
      <PostContent />
    </div>
  )
}

export default Post
