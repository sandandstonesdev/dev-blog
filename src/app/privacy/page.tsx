import type { Metadata } from 'next'
import { formatDate } from '@/lib/helper/formatters'

export const metadata: Metadata = {
  title: 'Privacy Policy | DevTestBlog',
  description: 'Privacy policy and cookie usage information',
}

export default function PrivacyPage() {
  return (
    <div className="section-container max-w-4xl">
      <h1 className="heading-page">Privacy Policy</h1>
      
      <div className="prose-section">
        <p className="text-muted mb-6">
          Last updated: {formatDate(new Date())}
        </p>


        <section className="mb-6">
          <h2 className="heading-section">What We Collect</h2>
          <p className="mb-3">
            This website uses privacy-friendly analytics and observability tools to help us understand general usage and improve the site. The information collected is non-personal and does not identify you as an individual. Data may include:
          </p>
          <ul className="list-styled mb-3">
            <li>Pages visited and actions taken on the site</li>
            <li>General device and browser information</li>
            <li>Approximate location (city or country)</li>
            <li>Performance and error data to help us maintain the site</li>
          </ul>
          <p>We do not collect names, email addresses, or other personal identifiers.</p>
        </section>

        <section className="mb-6">
          <h2 className="heading-section">Cookies</h2>
          <p className="mb-3">
            We use cookies to remember your preferences and to enable anonymous analytics. You can choose to accept or decline analytics cookies when you first visit the site, and you can change your preferences at any time.
          </p>
          <p className="mb-2"><strong>Essential:</strong> Required for basic site functionality and your cookie choices.</p>
          <p className="mb-3"><strong>Analytics (Optional):</strong> Help us understand how the site is used, without identifying you.</p>
        </section>

        <section className="mb-6">
          <h2 className="heading-section">Your Rights</h2>
          <ul className="list-styled">
            <li>Decline optional cookies</li>
            <li>Change preferences anytime</li>
            <li>Request information about collected data</li>
          </ul>
        </section>


        <section className="mb-6">
          <h2 className="heading-section">Third-Party Services</h2>
          <p>
            We use trusted service providers (such as Vercel Analytics and observability tools) to collect anonymous usage and performance data. These services help us monitor and improve the website, but do not receive personal information about you. For more details, please refer to Vercel&apos;s privacy policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="heading-section">Contact</h2>
          <p>
            Questions? Contact us via the About page.
          </p>
        </section>
      </div>
    </div>
  )
}
