export interface Product{
  id: string,
  name: string,
  description: string,
  price: number,
  is_location_offer: boolean,
  is_rental: boolean,
  co2_rating: string,
  in_stock: boolean,
  is_eco_friendly: boolean,
  product_image: {
    id: string,
    by_name: string,
    by_url: string,
    source_name: string,
    source_url: string,
    file_name: string,
    title: string
  },
  category: {
    id: string, 
    name: string,
    slug: string 
  },
  brand: { 
    id: string,
    name: string
  }
}
export function createProduct(i: number): Product {

  const randomData = Date.now();

  return {
    id: `AQA_${randomData}_${i}`,
    name: `AQA_Sania_${randomData}_${i}`,
    description: 'Loren Ipsum',

    price: Math.floor(Math.random() * 100),

    is_location_offer: Math.random() < 0.5,
    is_rental: Math.random() < 0.5,
    in_stock: Math.random() < 0.8,
    is_eco_friendly: Math.random() < 0.3,

    co2_rating: String.fromCharCode(65 + Math.floor(Math.random() * 5)), // A–E

    product_image: {
      id: `IMG_${randomData}_${i}`,
      by_name: `AUTHOR_${Math.floor(Math.random() * 1000)}`,
      by_url: `https://unsplash.com/@user${Math.floor(Math.random() * 100000)}`,
      source_name: `Source_${Math.floor(Math.random() * 100)}`,
      source_url: `https://example.com/source/${Math.floor(Math.random() * 1_000_000)}`,
      file_name: `image_${Math.floor(Math.random() * 1000)}.avif`,
      title: `Image_${Math.floor(Math.random() * 1000)}`,
    },

    category: {
      id: `CAT_${Math.floor(Math.random() * 1000)}`,
      name: `Category_${Math.floor(Math.random() * 100)}`,
      slug: `category-${Math.floor(Math.random() * 100)}`,
    },

    brand: {
      id: `BR_${Math.floor(Math.random() * 1000)}`,
      name: `Brand_${Math.floor(Math.random() * 100)}`,
    },
  };
}

export function generateProducts(amountToGenerate: number){
  const productsArray: Product[] = [];

  for (let i = 0; i < amountToGenerate; i++) {
    
    productsArray.push(createProduct(i));
  
  }

  return productsArray;
}
