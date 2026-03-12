import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  title: string;
  slug: string;
  date: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  thumbnail?: string;
  tags: string[];
  industry: string;
  impact: string;
  tools: string[];
  externalUrl?: string;  // if set, "Read Case Study" links here instead of /projects/[slug]
  content: string;
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getProjectBySlug(slug);
    })
    .filter((p): p is Project => p !== null && p.status === 'published');

  // Sort: featured first, then by date descending
  return allProjects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.date.localeCompare(a.date);
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || '',
    slug: data.slug || slug,
    date: data.date || '',
    status: data.status || 'published',
    featured: data.featured || false,
    thumbnail: data.thumbnail,
    tags: data.tags || [],
    industry: data.industry || '',
    impact: data.impact || '',
    tools: data.tools || [],
    externalUrl: data.externalUrl,
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs
    .readdirSync(projectsDirectory)
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => fn.replace(/\.md$/, ''));
}
