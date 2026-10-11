import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(["draft", "released"]),
    tags: z.array(z.string()).optional(),
  }),
});

const games = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "src/content/games" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    mode: z.enum(["standalone", "embedded", "web-native"]),
    path: z.string(),
  }),
});

const experience = defineCollection({
  loader: file("src/content/experience/experience.yaml"),
  schema: z.object({
    company: z.string(),
    roles: z.array(
      z.object({
        title: z.string(),
        period: z.string(),
      }),
    ),
  }),
});

const karaoke = defineCollection({
  loader: file("src/content/karaoke/songs.yaml"),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    reading: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const writingBooks = defineCollection({
  loader: glob({ pattern: "*/book.yaml", base: "src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["draft", "in-progress", "released"]),
    chapters: z.array(z.string()),
  }),
});

const writingChapters = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "src/content/writing" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog,
  experience,
  games,
  karaoke,
  "writing-books": writingBooks,
  "writing-chapters": writingChapters,
};
