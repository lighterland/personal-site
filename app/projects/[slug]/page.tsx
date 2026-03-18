import { getAllProjectSlugs, getProjectBySlug } from '@/lib/projects';
import { markdownToHtml } from '@/lib/markdown';
import ProjectLayout from '@/components/portfolio/ProjectLayout';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Erland Sadana`,
    description: project.impact,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await markdownToHtml(project.content);
  return <ProjectLayout project={project} content={content} />;
}
