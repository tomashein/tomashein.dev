import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    content: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

const jobs = defineCollection({
  loader: glob({ base: './src/content/jobs', pattern: '**/*.md' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    content: z.array(z.string()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

const skills = defineCollection({
  loader: glob({ base: './src/content/skills', pattern: '**/*.md' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    content: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    comment: z.string().optional(),
  }),
});

export const collections = { projects, jobs, skills };
