interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
  product_image: {
    id: string;
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
  };
  category: { id: string; name: string; slug: string };
  brand: { id: string; name: string };
}

export function createMockProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `mock-product-${index + 1}`,
    name: `Mock Product ${String(index + 1).padStart(2, '0')}`,
    description: 'Deterministic product used for request interception tests.',
    price: 10 + index,
    is_location_offer: false,
    is_rental: false,
    co2_rating: 'A',
    in_stock: true,
    is_eco_friendly: true,
    product_image: {
      id: `mock-image-${index + 1}`,
      by_name: 'Test Automation',
      by_url: 'https://example.com/author',
      source_name: 'Test fixture',
      source_url: 'https://example.com/source',
      file_name: 'pliers01.avif',
      title: `Mock Product ${index + 1}`,
    },
    category: { id: 'mock-category', name: 'Mock Category', slug: 'mock-category' },
    brand: { id: 'mock-brand', name: 'Mock Brand' },
  }));
}
