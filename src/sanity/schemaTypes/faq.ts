import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer', type: 'text' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Products', 'Shipping', 'Returns', 'General'] } }),
  ]
});
