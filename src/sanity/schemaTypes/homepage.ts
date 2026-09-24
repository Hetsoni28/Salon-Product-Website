import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'heroBanner', title: 'Hero Banner', type: 'reference', to: [{ type: 'banner' }] }),
    defineField({ name: 'featuredProducts', title: 'Featured Products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ]
})