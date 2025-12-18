import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img src="/shop-logo.avif" alt={shop.name}></img>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {/* <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense> */}
          <svg class="icon icon-account" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5156 12.875C15.9479 12.875 17.1719 13.3958 18.1875 14.4375C19.2292 15.4531 19.75 16.6771 19.75 18.1094V19.125C19.75 19.6458 19.5677 20.0885 19.2031 20.4531C18.8385 20.8177 18.3958 21 17.875 21H4.125C3.60417 21 3.16146 20.8177 2.79688 20.4531C2.43229 20.0885 2.25 19.6458 2.25 19.125V18.1094C2.25 16.6771 2.75781 15.4531 3.77344 14.4375C4.8151 13.3958 6.05208 12.875 7.48438 12.875C7.82292 12.875 8.31771 12.9792 8.96875 13.1875C9.64583 13.3958 10.3229 13.5 11 13.5C11.6771 13.5 12.3542 13.3958 13.0312 13.1875C13.7083 12.9792 14.2031 12.875 14.5156 12.875ZM17.875 19.125V18.1094C17.875 17.1979 17.5365 16.4167 16.8594 15.7656C16.2083 15.0885 15.4271 14.75 14.5156 14.75C14.4375 14.75 14.0208 14.8542 13.2656 15.0625C12.5365 15.2708 11.7812 15.375 11 15.375C10.2188 15.375 9.45052 15.2708 8.69531 15.0625C7.96615 14.8542 7.5625 14.75 7.48438 14.75C6.57292 14.75 5.77865 15.0885 5.10156 15.7656C4.45052 16.4167 4.125 17.1979 4.125 18.1094V19.125H17.875ZM14.9844 10.6094C13.8906 11.7031 12.5625 12.25 11 12.25C9.4375 12.25 8.10938 11.7031 7.01562 10.6094C5.92188 9.51562 5.375 8.1875 5.375 6.625C5.375 5.0625 5.92188 3.73438 7.01562 2.64062C8.10938 1.54688 9.4375 1 11 1C12.5625 1 13.8906 1.54688 14.9844 2.64062C16.0781 3.73438 16.625 5.0625 16.625 6.625C16.625 8.1875 16.0781 9.51562 14.9844 10.6094ZM13.6562 3.96875C12.9271 3.23958 12.0417 2.875 11 2.875C9.95833 2.875 9.07292 3.23958 8.34375 3.96875C7.61458 4.69792 7.25 5.58333 7.25 6.625C7.25 7.66667 7.61458 8.55208 8.34375 9.28125C9.07292 10.0104 9.95833 10.375 11 10.375C12.0417 10.375 12.9271 10.0104 13.6562 9.28125C14.3854 8.55208 14.75 7.66667 14.75 6.625C14.75 5.58333 14.3854 4.69792 13.6562 3.96875Z" fill="#000"></path></svg>

      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      {/* Search */}
      <svg class="icon icon-search" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8438 19.3203C21.0781 19.5286 21.0781 19.75 20.8438 19.9844L19.9844 20.8438C19.75 21.0781 19.5286 21.0781 19.3203 20.8438L14.5938 16.1172C14.4896 16.013 14.4375 15.9089 14.4375 15.8047V15.2578C12.901 16.5859 11.1302 17.25 9.125 17.25C6.88542 17.25 4.97135 16.4557 3.38281 14.8672C1.79427 13.2786 1 11.3646 1 9.125C1 6.88542 1.79427 4.97135 3.38281 3.38281C4.97135 1.79427 6.88542 1 9.125 1C11.3646 1 13.2786 1.79427 14.8672 3.38281C16.4557 4.97135 17.25 6.88542 17.25 9.125C17.25 11.1302 16.5859 12.901 15.2578 14.4375H15.8047C15.9349 14.4375 16.0391 14.4896 16.1172 14.5938L20.8438 19.3203ZM4.71094 13.5391C5.9349 14.763 7.40625 15.375 9.125 15.375C10.8438 15.375 12.3151 14.763 13.5391 13.5391C14.763 12.3151 15.375 10.8438 15.375 9.125C15.375 7.40625 14.763 5.9349 13.5391 4.71094C12.3151 3.48698 10.8438 2.875 9.125 2.875C7.40625 2.875 5.9349 3.48698 4.71094 4.71094C3.48698 5.9349 2.875 7.40625 2.875 9.125C2.875 10.8438 3.48698 12.3151 4.71094 13.5391Z" fill="#000000"></path></svg>
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
         <svg
      className="icon icon-cart-empty"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75m-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5M19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>{count > 0 && <span className="cart-count">{count}</span>}

    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
