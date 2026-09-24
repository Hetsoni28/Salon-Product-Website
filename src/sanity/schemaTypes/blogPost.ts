import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ]
})