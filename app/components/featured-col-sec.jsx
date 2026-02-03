// app/components/CollectionProducts.jsx
import { Link } from 'react-router';
import { ProductItem } from '~/components/ProductItem';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';

/**
 * CollectionProducts Component
 * @param {{ collection: any }} props
 */
export function CollectionProducts({ collection, title }) {
  const { open } = useAside();
  
  if (!collection || !collection.products?.nodes?.length) return null;

  return (
    <section className="home-collection container">
      <h2><span class="motif_leave motif_leave11"><img class="heding-art-design" src="https://cdn.shopify.com/s/files/1/0249/5099/7070/files/left_Image.webp?v=1703763153" alt="heading-art"/></span>{title || collection.title}<span class="motif_leave transform-y-180 motif_leave22"><img class="heding-art-design" src="https://cdn.shopify.com/s/files/1/0249/5099/7070/files/Right_Image.webp?v=1703763152" alt="heading-art"/></span></h2>

      <div className="product-grid">
        {collection.products.nodes.map((product) => {
          const firstVariant = product.variants?.nodes?.[0];
          
          return (
            <div key={product.id} className="product-card">
              <ProductItem product={product} />
              
              {/* Add to Cart Button */}
              {firstVariant && (
                <AddToCartButton
                  disabled={!firstVariant.availableForSale}
                  onClick={() => {
                    open('cart');
                  }}
                  lines={[
                    {
                      merchandiseId: firstVariant.id,
                      quantity: 1,
                    },
                  ]}
                >
                  {firstVariant.availableForSale ? 'Add to cart' : 'Sold out'}
                </AddToCartButton>
              )}
            </div>
          );
        })}
      </div>

      <Link className="view-all" to={`/collections/${collection.handle}`}>
        View all products →
      </Link>
    </section>
  );
}

// GraphQL query to fetch collection + first 12 products
export const COLLECTION_PRODUCTS_QUERY = `#graphql
  fragment CollectionProduct on Product {
    id
    title
    handle
    availableForSale
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          id
          title
          handle
          featuredImage {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }

  query CollectionProducts(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 4) {
        nodes {
          ...CollectionProduct
        }
      }
    }
  }
`;

/**
 * Optional: Helper function to load collection data
 * Use this inside your route loader
 */
export async function loadCollection(context, handle) {
  const data = await context.storefront.query(COLLECTION_PRODUCTS_QUERY, {
    variables: { handle },
  });

  return data.collection; 
}