import { useEffect } from 'react'

interface MetaTagsOptions {
  title?: string
  description?: string
  image?: string
  type?: string
}

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null
  }
  if (el) {
    el.setAttribute('content', content)
  }
}

// Store defaults on first call
let defaults: Record<string, string> | null = null

function captureDefaults() {
  if (defaults) return
  defaults = {}
  const tags = ['og:title', 'og:description', 'og:image', 'og:type',
    'twitter:title', 'twitter:description', 'twitter:image']
  for (const tag of tags) {
    const el = document.querySelector(`meta[property="${tag}"], meta[name="${tag}"]`) as HTMLMetaElement | null
    if (el) defaults[tag] = el.getAttribute('content') ?? ''
  }
  const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (desc) defaults['description'] = desc.getAttribute('content') ?? ''
}

function restoreDefaults() {
  if (!defaults) return
  for (const [key, value] of Object.entries(defaults)) {
    if (key === 'description') {
      const el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (el) el.setAttribute('content', value)
    } else {
      setMeta(key, value)
    }
  }
}

export function useMetaTags({ title, description, image, type }: MetaTagsOptions) {
  useEffect(() => {
    captureDefaults()

    if (title) {
      setMeta('og:title', title)
      setMeta('twitter:title', title)
    }
    if (description) {
      const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (descEl) descEl.setAttribute('content', description)
      setMeta('og:description', description)
      setMeta('twitter:description', description)
    }
    if (image) {
      const fullImage = image.startsWith('http') ? image : `${window.location.origin}${image}`
      setMeta('og:image', fullImage)
      setMeta('twitter:image', fullImage)
    }
    if (type) {
      setMeta('og:type', type)
    }

    return () => {
      restoreDefaults()
    }
  }, [title, description, image, type])
}
