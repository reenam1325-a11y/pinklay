// import {Suspense} from 'react';
// import {Await, NavLink} from 'react-router';

// /**
//  * @param {FooterProps}
//  */
// export function Footer({footer: footerPromise, header, publicStoreDomain}) {
//   return (
//     <Suspense>
//       <Await resolve={footerPromise}>
//         {(footer) => (
//           <footer className="footer">
//             {footer?.menu && header.shop.primaryDomain?.url && (
//               <FooterMenu
//                 menu={footer.menu}
//                 primaryDomainUrl={header.shop.primaryDomain.url}
//                 publicStoreDomain={publicStoreDomain}
//               />
//             )}
//           </footer>
//         )}
//       </Await>
//     </Suspense>
//   );
// }

// /**
//  * @param {{
//  *   menu: FooterQuery['menu'];
//  *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
//  *   publicStoreDomain: string;
//  * }}
//  */
// function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
//   return (
//     <nav className="footer-menu" role="navigation">
//       {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
//         if (!item.url) return null;
//         // if the url is internal, we strip the domain
//         const url =
//           item.url.includes('myshopify.com') ||
//           item.url.includes(publicStoreDomain) ||
//           item.url.includes(primaryDomainUrl)
//             ? new URL(item.url).pathname
//             : item.url;
//         const isExternal = !url.startsWith('/');
//         return isExternal ? (
// c  
//         ) : (
//           <NavLink
//             end
//             key={item.id}
//             prefetch="intent"
//             style={activeLinkStyle}
//             to={url}
//           >
//             {item.title}
//           </NavLink>
//         );
//       })}
//     </nav>
//   );
// }

// const FALLBACK_FOOTER_MENU = {
//   id: 'gid://shopify/Menu/199655620664',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461633060920',
//       resourceId: 'gid://shopify/ShopPolicy/23358046264',
//       tags: [],
//       title: 'Privacy Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/privacy-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633093688',
//       resourceId: 'gid://shopify/ShopPolicy/23358013496',
//       tags: [],
//       title: 'Refund Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/refund-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633126456',
//       resourceId: 'gid://shopify/ShopPolicy/23358111800',
//       tags: [],
//       title: 'Shipping Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/shipping-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633159224',
//       resourceId: 'gid://shopify/ShopPolicy/23358079032',
//       tags: [],
//       title: 'Terms of Service',
//       type: 'SHOP_POLICY',
//       url: '/policies/terms-of-service',
//       items: [],
//     },
//   ],
// };

// /**
//  * @param {{
//  *   isActive: boolean;
//  *   isPending: boolean;
//  * }}
//  */
// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'white',
//   };
// }

// /**
//  * @typedef {Object} FooterProps
//  * @property {Promise<FooterQuery|null>} footer
//  * @property {HeaderQuery} header
//  * @property {string} publicStoreDomain
//  */

// /** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
// /** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */



import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';

export function Footer({footer}) {
  return (
    <Suspense>
      <Await resolve={footer}>
        {(data) => {
          const helpMenu = data?.help?.items;
          const companyMenu = data?.company?.items;

          if (!helpMenu?.length && !companyMenu?.length) return null;

          return (
            <footer className="site-footer">

              <div className="footer-top page-width">

                {/* CUSTOMER SERVICE */}
                <div className="footer-col">
                  <h4>CUSTOMER SERVICE</h4>
                  <p><strong>Phone:</strong> +91-8104136291</p>
                  <p><strong>Email:</strong> care@pinklay.com</p>
                </div>
                {/* THE COMPANY */}
                <div className="footer-col">
                  <h4>THE COMPANY</h4>

                  {companyMenu?.map((item) => (
                    <NavLink
                      key={item.id}
                      to={new URL(item.url).pathname}
                      className="footer-link"
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
                {/* NEED HELP */}
                <div className="footer-col">
                  <h4>NEED HELP</h4>

                  {helpMenu?.map((item) => (
                    <NavLink
                      key={item.id}
                      to={new URL(item.url).pathname}
                      className="footer-link"
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>





                {/* NEWSLETTER */}
                <div className="footer-col newsletter">
                  <h4>SIGN UP FOR OUR NEWSLETTER</h4>
                  <input placeholder="Email address" />
                </div>

              </div>

              {/* Footer Art */}
              <div className="footer-art-wrapper">
                <img src="/Website_footer.webp" alt="Footer Art" />
              </div>

              {/* Copyright */}
              <div className="footer-bottom">
                © 2025 Pinklay Retail Pvt. Ltd. All Rights Reserved.
              </div>

            </footer>
          );
        }}
      </Await>
    </Suspense>
  );
}