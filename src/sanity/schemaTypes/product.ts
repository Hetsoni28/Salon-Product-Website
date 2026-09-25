import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text' }),
    defineField({ name: 'howToUse', title: 'How To Use', type: 'text' }),
    defineField({ name: 'sizeQuantity', title: 'Size / Quantity', type: 'string' }),
    defineField({ name: 'availability', title: 'Availability', type: 'string', options: { list: ['In Stock', 'Out of Stock', 'Pre-order'] }, initialValue: 'In Stock' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ],
});
