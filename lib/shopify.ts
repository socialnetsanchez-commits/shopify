type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  url: string;
};

const demoProducts: Product[] = [
  {
    id: 'demo-1',
    title: 'Organizador Magnético Modular para Cocina',
    description: 'Más espacio y orden en cocinas pequeñas.',
    price: '$29.95',
    url: '#'
  },
  {
    id: 'demo-2',
    title: 'Lámpara Ambiental LED Recargable',
    description: 'Ambiente premium para escritorio, dormitorio o salón.',
    price: '$34.95',
    url: '#'
  },
  {
    id: 'demo-3',
    title: 'Sellador Portátil de Bolsas',
    description: 'Cierra snacks y bolsas de despensa en segundos.',
    price: '$19.95',
    url: '#'
  }
];

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function getProducts(): Promise<Product[]> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return demoProducts;

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;

  const query = `
    query Products {
      products(first: 9) {
        edges {
          node {
            id
            title
            description
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 300 }
    });

    if (!res.ok) return demoProducts;

    const json = await res.json();
    const edges = json?.data?.products?.edges ?? [];

    if (!edges.length) return demoProducts;

    return edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      description: node.description || 'Producto seleccionado por MS100 Store.',
      price: formatMoney(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode),
      image: node.featuredImage?.url,
      url: `https://${SHOPIFY_DOMAIN}/products/${node.handle}`
    }));
  } catch {
    return demoProducts;
  }
}

function formatMoney(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(Number(amount));
}
