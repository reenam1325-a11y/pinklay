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
import { HomeGridBanner } from '~/components/gridbanner-custom';
import CategoryGrid from '~/components/CategoryGrid';
/**
 * @type {Route.MetaFunction}
 */
export const meta = () => [{ title: 'Hydrogen | Home' }];

export async function loader({ context }) {
  const { collections } = await context.storefront.query(
    FEATURED_COLLECTION_QUERY
  );

  console.log('Collections from Shopify:', collections.nodes);
  const BestSellerCollection = await loadCollection(context, 'best-sellers');
  return {
    featuredCollections: collections.nodes,
    BestSellerCollection
  };
}

export default function Homepage() {
  const data = useLoaderData();

  return (
    <div className="home">
     
 <HomeGridBanner
  leftTop="women.webp"
  leftBottom="gifts.webp"
  middleTop="home.webp"
  middleBottom="kids.webp"
  rightImage="Kids_Bedding_banner.webp"
  rightImage1="slide111.webp"
  rightImage2="slide222.jpg"
/>
<CategoryGrid   
  rightImage1="Hyd_Desktop.webp"
  rightImage2="Bengaluru_Desktop.webp" />


      {/* <FeaturedCollections collections={data.featuredCollections} /> */}

 <CollectionProducts
        collection={data.BestSellerCollection}
        title="BEST SELLERS"
      />
  {/* <LogoSlider />
 <ImageTextSection
        image="/collection.webp"
        title="Slide Camera Cover Protection"
        text="Protect the camera lens from scratches and wear"
        buttonText="Shop Now"
        buttonLink="/collections/premium"
        reverse={true} 
      /> */}

      <CollectionProducts
        collection={data.menCollection}
        title="New Arrivals"
      />    
     {/* <HomeBannerr
  slides={[
    {
      image: 'slide111.webp',
      heading: 'Welcome to Our Store',
      subheading: 'Best products just for you',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
    },
    {
      image: 'slide111.webp',
      heading: 'New Arrivals',
      subheading: 'Check out the latest collection',
      buttonText: 'Explore',
      buttonLink: '/new-arrivals',
    },
    {
      image: 'slide111.webp',
      heading: 'Limited Offer',
      subheading: 'Grab your deal today',
      buttonText: 'Buy Now',
      buttonLink: '/offers',
    },
  ]}
/> */}
<HomeBanner
   slides={[
    {
      image: 'slide111.webp',
      heading: 'Welcome to Our Store',
      subheading: 'Best products just for you',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
    },
    {
      image: 'slide111.webp',
      heading: 'New Arrivals',
      subheading: 'Check out the latest collection',
      buttonText: 'Explore',
      buttonLink: '/new-arrivals',
    },
    {
      image: 'slide111.webp',
      heading: 'Limited Offer',
      subheading: 'Grab your deal today',
      buttonText: 'Buy Now',
      buttonLink: '/offers',
    },
  ]}
/>

      {/* <ImageTextSection
        image="/about.webp"
        title="Phone Stuff"
        text="PHONE STUFF is your one-stop shop for high-quality mobile accessories. We offer a wide range of products including phone cases, screen protectors, chargers, power banks, earphones, holders, and more—compatible with all major smartphone brands. Whether you're looking for stylish protection, fast charging, or must-have gadgets, PHONE STUFF has you covered. Shop online and enjoy affordable prices, secure checkout, and fast delivery."
        buttonText="View More"
        buttonLink="/collections/limited"
        reverse={false} 
      /> */}
      {/* <RecommendedProducts products={data.recommendedProducts} /> */}
            <Testimonials />
      {/* <IconList /> */}
 <HomeBanner
        image="Website_footer.webp"
        heading=""
        subheading=""
        buttonText=""
        buttonLink={`/collections/${data.featuredCollections?.[0]?.handle}`}
      />
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
