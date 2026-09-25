import { defineField, defineType } from "sanity";

export default defineType({
  name: "dealer",
  title: "Dealer",
  type: "document",
  fields: [
    // === Core Identity (Required) ===
    defineField({
      name: "name",
      title: "Dealer Name",
      type: "string",
      validation: (R) => R.required(),
      description: "Full name of the dealer (e.g. Rahul Patel)",
    }),
    defineField({
      name: "dealerCode",
      title: "Dealer Code",
      type: "string",
      validation: (R) => R.required(),
      description: "Unique code for attribution tracking (e.g. A001, B042)",
    }),
    defineField({
      name: "slug",
      title: "Dealer Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (R) => R.required(),
      description: "Used in the dealer link: brand.com/d/[slug]",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
          { title: "Suspended", value: "suspended" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (R) => R.required(),
      description: "Only Active dealers have a live storefront page",
    }),

    // === Optional Profile Information ===
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g. Your Local Wax Expert",
    }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (with country code)",
      type: "string",
      description: "e.g. +919876543210",
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),

    // === Storefront Products ===
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description:
        "Curated product list for this dealer. Leave blank to show all products.",
    }),

    // === Performance Stats (manually entered or calculated) ===
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "clientsServed",
      title: "Clients Served",
      type: "number",
    }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number" }),

    // === Automated Sales Tracking ===
    defineField({
      name: "totalSalesAmount",
      title: "Total Sales Amount (INR)",
      type: "number",
      readOnly: true,
      description: "Auto-updated when a sale is completed.",
      initialValue: 0,
    }),
    defineField({
      name: "totalItemsSold",
      title: "Total Items Sold",
      type: "number",
      readOnly: true,
      description: "Auto-updated when a sale is completed.",
      initialValue: 0,
    }),
    defineField({
      name: "productsSold",
      title: "Products Sold Breakdown",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "productId",
              type: "string",
              title: "Product ID",
            }),
            defineField({
              name: "productName",
              type: "string",
              title: "Product Name",
            }),
            defineField({
              name: "quantity",
              type: "number",
              title: "Total Sold",
            }),
          ],
        },
      ],
    }),

    // === SEO ===
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "dealerCode",
      media: "photo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Code: ${subtitle || "No code"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Dealer Code",
      name: "codeAsc",
      by: [{ field: "dealerCode", direction: "asc" }],
    },
  ],
});
