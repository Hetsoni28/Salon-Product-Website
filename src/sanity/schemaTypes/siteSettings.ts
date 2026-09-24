import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seo', title: 'Global SEO Defaults', type: 'seo' }),
  ]
})