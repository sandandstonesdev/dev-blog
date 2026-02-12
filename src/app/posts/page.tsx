import { getCachedPostData } from '@/utils/posttFetcher'
import { formatPostDate } from '@/utils/formatters'
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | My Blog",
  description: "Browse blog posts",
  openGraph: {
    title: "Posts | My Blog",
    description: "Browse blog posts",
    url: '/posts',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Posts page preview',
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Posts = async () => {
  const posts = await getCachedPostData();
  
  return (
    <section className="section-container">
      <h2 className="heading-responsive text-center mb-8">Posts</h2>
      
      {posts.length === 0 ? (
        <p className="text-muted">No posts available yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link 
              href={`/posts/${post.slug}`}
              className="link-card"
            >
              <h3 className="link-card-title">
                {post.title}
              </h3>
              {post.date && (
                <time className="text-sm text-muted mt-2 block">
                  {formatPostDate(post.date)}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
      )}
    </section>
  )
}

export default Posts