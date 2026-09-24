import { groq } from 'next-sanity';

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    "id": _id,
    "title": name,
    "slug": slug.current,
    "image": mainImage,
    price,
    "originalPrice": price * 1.2,
    shortDescription,
    "rating": 5,
    "reviewCount": 124,
    "badge": availability,
    "category": category->name
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] {
    "id": _id,
    name,
    "slug": slug.current
  }
`;

export const categoryProductsQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    "id": _id,
    "title": name,
    "slug": slug.current,
    "image": mainImage,
    price,
    shortDescription,
    "originalPrice": price * 1.2,
    "rating": 5,
    "reviewCount": 124,
    "badge": availability,
    "category": category->name
  }
`;

export const dealerBySlugQuery = groq`
  *[_type == "dealer" && slug.current == $slug && isActive == true][0] {
    "id": _id,
    name,
    "slug": slug.current,
    photo,
    tagline,
    bio,
    phone,
    email,
    city,
    state,
    yearsExperience,
    clientsServed,
    rating,
    instagramUrl,
    facebookUrl,
    whatsappNumber,
    "featuredProducts": featuredProducts[]->{
      "id": _id,
      "title": name,
      "slug": slug.current,
      "image": mainImage,
      price,
      "originalPrice": price * 1.2,
      shortDescription,
      "rating": 5,
      "reviewCount": 124,
      "badge": availability
    }
  }
`;

export const allActiveProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    "id": _id,
    "title": name,
    "slug": slug.current,
    "image": mainImage,
    price,
    "originalPrice": price * 1.2,
    shortDescription,
    "rating": 5,
    "reviewCount": 124,
    "badge": availability
  }
`;


export const dealerBySlugQueryV2 = groq`
  *[_type == "dealer" && slug.current == $slug && status == "active"][0] {
    "id": _id,
    name,
    dealerCode,
    "slug": slug.current,
    status,
    photo,
    tagline,
    bio,
    phone,
    email,
    city,
    state,
    yearsExperience,
    clientsServed,
    rating,
    instagramUrl,
    facebookUrl,
    whatsappNumber,
    "featuredProducts": featuredProducts[]->{
      "id": _id,
      "title": name,
      "slug": slug.current,
      "image": mainImage,
      price,
      "originalPrice": price * 1.2,
      shortDescription,
      "rating": 5,
      "reviewCount": 124,
      "badge": availability
    }
  }
`;
