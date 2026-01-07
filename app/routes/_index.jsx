
import { Await, useLoaderData, Link } from 'react-router';
import { Suspense } from 'react';
import { Image } from '@shopify/hydrogen';
import { ProductItem } from '~/components/ProductItem';
import { HomeBanner } from '~/components/Homebanner';
import { CollectionProducts, loadCollection } from '~/components/featured-col-sec.jsx';
import { LogoSlider } from '~/components/LogoSlider';
import { ImageTextSection } from '~/components/ImageTextSection';
import { Testimonials } from '~/components/Testimonials';
import { IconList } from '~/components/IconList';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => [{ title: 'Hydrogen | Home' }];

/**
 * Single loader fetching all necessary data
 */
export async function loader({ context }) {
  // Featured Collections
  const { collections } = await context.storefront.query(FEATURED_COLLECTION_QUERY);

  // Homepage Collection (for CollectionProducts component)
  const unisexCollection = await loadCollection(context, 'unisex');
  const menCollection = await loadCollection(context, 'men'); 

  // Recommended Products
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .then((res) => res.products)
    .catch(() => null);

  return {
    featuredCollections: collections.nodes,
    unisexCollection,
    menCollection,
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData();

  return (
    <div className="home">
      <HomeBanner
        image="/PHONE_STUFF03 (1).webp"
        heading="New Collection"
        subheading="Latest arrivals just for you"
        buttonText="Shop Now"
        buttonLink={`/collections/${data.featuredCollections?.[0]?.handle}`}
      />

      <FeaturedCollections collections={data.featuredCollections} />

 <CollectionProducts
        collection={data.unisexCollection}
        title="Best Seller"
      />
  <LogoSlider />
 <ImageTextSection
        image="/collection.webp"
        title="Slide Camera Cover Protection"
        text="Protect the camera lens from scratches and wear"
        buttonText="Shop Now"
        buttonLink="/collections/premium"
        reverse={true} 
      />

      <CollectionProducts
        collection={data.menCollection}
        title="New Arrivals"
      />    
     
      <ImageTextSection
        image="/about.webp"
        title="Phone Stuff"
        text="PHONE STUFF is your one-stop shop for high-quality mobile accessories. We offer a wide range of products including phone cases, screen protectors, chargers, power banks, earphones, holders, and more—compatible with all major smartphone brands. Whether you're looking for stylish protection, fast charging, or must-have gadgets, PHONE STUFF has you covered. Shop online and enjoy affordable prices, secure checkout, and fast delivery."
        buttonText="View More"
        buttonLink="/collections/limited"
        reverse={false} 
      />
      <RecommendedProducts products={data.recommendedProducts} />
            <Testimonials />
      <IconList />

    </div>
  );
}

function FeaturedCollections({ collections }) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="featured-collections">
      <div className="container featured-collections-grid">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            className="featured-collection"
            to={`/collections/${collection.handle}`}
          >
            {collection.image && (
              <div className="featured-collection-image">
                <Image data={collection.image} />
              </div>
            )}
            <h2>{collection.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendedProducts({ products }) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

// GraphQL Queries
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image { id url altText width height }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange { minVariantPrice { amount currencyCode } }
    featuredImage { id url altText width height }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
