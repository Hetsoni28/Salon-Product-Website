import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ]
})