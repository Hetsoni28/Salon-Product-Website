import { defineField, defineType } from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'image', title: 'Background Image', type: 'image' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
  ]
})