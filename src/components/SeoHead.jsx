import { useEffect } from 'react'

export function SeoHead({
  title = 'HET IMPEX | Diamond Manufacturing & Sourcing',
  description = 'Leading diamond manufacturer and exporter based in India.',
  image = '/full-logo.png',
  url = 'https://hetimpex.in',
  type = 'website'
}) {
  useEffect(() => {
    document.title = title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // Open Graph
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Twitter Card
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image
    }

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // JSON-LD Structured Data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
      headline: title,
      description: description,
      url: url,
      image: image,
      publisher: {
        '@type': 'Organization',
        name: 'HET IMPEX',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hetimpex.in/full-logo.png'
        }
      }
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = 'HET IMPEX | Diamond Manufacturing & Sourcing'
    }
  }, [title, description, image, url, type])

  return null
}
