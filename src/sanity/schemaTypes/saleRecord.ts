import { defineField, defineType } from 'sanity';

/**
 * Sale Record — created ONLY when a purchase is verified/completed.
 * Opening a dealer link or adding to cart does NOT create a record.
 * This is the single source of truth for sales tracking.
 */
export const saleRecord = defineType({
  name: 'saleRecord',
  title: 'Sale Record',
  type: 'document',
  fields: [
    // === Order Identity ===
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (R) => R.required(),
      description: 'Unique order identifier (UUID)',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
      validation: (R) => R.required(),
      description: 'When the purchase was verified/completed',
    }),

    // === Dealer Attribution ===
    defineField({
      name: 'dealer',
      title: 'Dealer',
      type: 'reference',
      to: [{ type: 'dealer' }],
      description: 'The dealer whose link brought this customer',
    }),
    defineField({
      name: 'dealerCode',
      title: 'Dealer Code',
      type: 'string',
      description: 'Denormalized for fast querying (e.g. A001)',
    }),
    defineField({
      name: 'dealerName',
      title: 'Dealer Name',
      type: 'string',
      description: 'Denormalized dealer name at time of sale',
    }),
    defineField({
      name: 'dealerSlug',
      title: 'Dealer Slug',
      type: 'string',
    }),

    // === Order Items ===
    defineField({
      name: 'items',
      title: 'Items Purchased',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'productId', title: 'Product ID', type: 'string' }),
            defineField({ name: 'productName', title: 'Product Name', type: 'string' }),
            defineField({ name: 'productSlug', title: 'Product Slug', type: 'string' }),
            defineField({ name: 'quantity', title: 'Quantity', type: 'number' }),
            defineField({ name: 'unitPrice', title: 'Unit Price (INR)', type: 'number' }),
            defineField({ name: 'lineTotal', title: 'Line Total (INR)', type: 'number' }),
          ],
        },
      ],
    }),

    // === Order Totals ===
    defineField({
      name: 'totalQuantity',
      title: 'Total Quantity',
      type: 'number',
    }),
    defineField({
      name: 'orderTotal',
      title: 'Order Total (INR)',
      type: 'number',
    }),

    // === Customer (minimal, no PII required) ===
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'salonName',
      title: 'Salon Name',
      type: 'string',
    }),

    // === Order Status ===
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: '🟡 Pending', value: 'pending' },
          { title: '✅ Confirmed', value: 'confirmed' },
          { title: '🚚 Dispatched', value: 'dispatched' },
          { title: '📦 Delivered', value: 'delivered' },
          { title: '❌ Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'orderId',
      dealerName: 'dealerName',
      total: 'orderTotal',
      completedAt: 'completedAt',
    },
    prepare({ title, dealerName, total, completedAt }) {
      const date = completedAt ? new Date(completedAt).toLocaleDateString('en-IN') : '';
      return {
        title: `Order ${title?.slice(0, 8)}`,
        subtitle: `${dealerName || 'Direct'} — INR ${total || 0} — ${date}`,
      };
    },
  },
  orderings: [
    { title: 'Newest First', name: 'completedAtDesc', by: [{ field: 'completedAt', direction: 'desc' }] },
  ],
});
