import { type SchemaTypeDefinition } from "sanity";

import product from "./product";
import { category } from "./category";
import dealer from "./dealer";
import { homepage } from "./homepage";
import { banner } from "./banner";
import { blogPost } from "./blogPost";
import { faq } from "./faq";
import { siteSettings } from "./siteSettings";
import { seo } from "./seo";
import { saleRecord } from "./saleRecord";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    category,
    dealer,
    homepage,
    banner,
    blogPost,
    faq,
    siteSettings,
    seo,
    saleRecord,
  ],
};
