import { client } from '@/sanity/client';
import { allProductsQuery, allCategoriesQuery } from '@/sanity/queries';
import ShopClient from '../../shop/ShopClient';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  let products = [];
  let categories = [];
  let currentCategory = 'All';
  
  try {
    const resolvedParams = await params;
    products = await client.fetch(allProductsQuery);
    const categoriesDocs = await client.fetch(allCategoriesQuery);
    categories = categoriesDocs.map((c: any) => c.name);
    
    // Find the category by slug
    const categoryDoc = categoriesDocs.find((c: any) => c.slug === resolvedParams.slug);
    if (categoryDoc) {
      currentCategory = categoryDoc.name;
    }
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
  }

  return <ShopClient initialProducts={products} categories={categories} initialCategory={currentCategory} />;
}
