import type { MetadataRoute } from 'next';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aunopack.com';

type BlogPost = { slug: string; lastModified: Date };

const FALLBACK_POSTS: BlogPost[] = [
  { slug: 'sustainable-sleeve-packaging', lastModified: new Date('2024-06-15') },
  { slug: 'ai-packaging-decisions', lastModified: new Date('2024-07-01') },
  { slug: 'low-moq-packaging-guide', lastModified: new Date('2024-08-12') },
];

function getBlogPosts(): BlogPost[] {
  try {
    const contentDir = join(process.cwd(), 'content', 'blog');
    if (existsSync(contentDir)) {
      const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'));
      return files.map((file) => {
        const slug = file.replace(/\.md$/, '');
        const fullPath = join(contentDir, file);
        const content = readFileSync(fullPath, 'utf-8');
        const dateMatch = content.match(/^date:\s*(\S+)/m);
        const lastModified = dateMatch ? new Date(dateMatch[1]) : new Date();
        return { slug, lastModified };
      });
    }
  } catch {
    // Serverless/Edge'de fs hatası olursa fallback kullan
  }
  return FALLBACK_POSTS;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const blogPosts = getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl + '/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: baseUrl + '/sleeve-systems',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/sustainable-packaging',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/decision-engine',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/contact',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/packaging-glossary',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: baseUrl + '/blog/' + post.slug,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
