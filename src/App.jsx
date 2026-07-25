import { useMemo, useState } from 'react';
import {
  PRODUCTS,
  CATEGORIES,
  formatINR,
  getTierForPct,
  nextTierInfo,
  maxSetsFor,
} from './data/products.js';
import Header from './components/Header.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import CatalogPage from './components/CatalogPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CartPage from './components/CartPage.jsx';

const ACCENT_COLOR = '#0d3f3a';
const GRID_MIN = 230;

export default function App() {
  const [view, setView] = useState('catalog');
  const [productId, setProductId] = useState(null);
  const [cart, setCart] = useState({}); // { [productId]: units }
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterBrandType, setFilterBrandType] = useState('all');
  const [filterSort, setFilterSort] = useState('default');
  const [search, setSearch] = useState('');

  function goCatalog() {
    setView('catalog');
  }
  function goCart() {
    setView('cart');
  }
  function openProduct(id) {
    setProductId(id);
    setView('product');
  }
  function browseUpcoming() {
    setFilterBrandType('upcoming');
    setView('catalog');
  }
  function selectCategory(cat) {
    setFilterCategory(cat);
    setView('catalog');
  }

  function addToCart(id, units) {
    setCart((c) => ({ ...c, [id]: units }));
  }
  function incCartQty(id) {
    setCart((c) => {
      const p = PRODUCTS.find((x) => x.id === id);
      const step = p ? p.moq : 1;
      const cap = (p ? maxSetsFor(p) : 10) * step;
      const cur = c[id] || step;
      return { ...c, [id]: Math.min(cap, cur + step) };
    });
  }
  function decCartQty(id) {
    setCart((c) => {
      const p = PRODUCTS.find((x) => x.id === id);
      const floor = p ? p.moq : 1;
      const cur = c[id] || floor;
      return { ...c, [id]: Math.max(floor, cur - floor) };
    });
  }
  function removeCartLine(id) {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.slice();
    if (filterCategory !== 'All') list = list.filter((p) => p.category === filterCategory);
    if (filterBrandType !== 'all') list = list.filter((p) => p.brandType === filterBrandType);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => (p.brand + ' ' + p.name).toLowerCase().includes(q));
    }
    if (filterSort === 'priceAsc') list = list.slice().sort((a, b) => a.price - b.price);
    if (filterSort === 'priceDesc') list = list.slice().sort((a, b) => b.price - a.price);
    return list;
  }, [filterCategory, filterBrandType, filterSort, search]);

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id);
        if (!p) return null;
        const lineTotal = p.price * qty;
        const cap = maxSetsFor(p) * p.moq;
        return {
          ...p,
          qty,
          lineTotal,
          decDisabled: qty <= p.moq,
          incDisabled: qty >= cap,
        };
      })
      .filter(Boolean);
  }, [cart]);

  const cartSummary = useMemo(() => {
    const subtotal = cartLines.reduce((s, l) => s + l.lineTotal, 0);
    const upcomingValue = cartLines.filter((l) => l.brandType === 'upcoming').reduce((s, l) => s + l.lineTotal, 0);
    const upcomingPct = subtotal > 0 ? (upcomingValue / subtotal) * 100 : 0;
    const tier = getTierForPct(upcomingPct);
    const discountAmount = subtotal * (tier.pct / 100);
    const finalTotal = subtotal - discountAmount;
    const next = nextTierInfo(upcomingValue, subtotal);
    const meterFillWidth = Math.min(upcomingPct, 50) / 50 * 100;

    return {
      subtotal,
      upcomingValue,
      upcomingPct,
      tier,
      discountAmount,
      finalTotal,
      next,
      meterFillWidth,
      hasUpcomingInCart: upcomingValue > 0,
      tierPctLabel: tier.pct.toFixed(1) + '%',
      nextExists: !!next,
      atMaxTier: !next,
      nextAmountLabel: next ? formatINR(next.amountNeeded) : '',
      nextTierPctLabel: next ? next.nextDiscountPct.toFixed(1) + '%' : '',
    };
  }, [cartLines]);

  const cartCount = cartLines.length;
  const currentProduct = productId ? PRODUCTS.find((p) => p.id === productId) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: "'Public Sans', Helvetica, Arial, sans-serif", color: '#17211f' }}>
      <Header
        search={search}
        onSearchChange={setSearch}
        onGoCatalog={goCatalog}
        onGoCart={goCart}
        cartCount={cartCount}
        accentColor={ACCENT_COLOR}
      />
      <CategoryBar categories={CATEGORIES} active={filterCategory} onSelect={selectCategory} accentColor={ACCENT_COLOR} />

      {view === 'catalog' && (
        <CatalogPage
          products={filteredProducts}
          resultsCountLabel={`${filteredProducts.length} SKUs`}
          filterBrandType={filterBrandType}
          onSelectBrandType={setFilterBrandType}
          filterSort={filterSort}
          onSelectSort={setFilterSort}
          gridMin={GRID_MIN}
          accentColor={ACCENT_COLOR}
          onOpenProduct={openProduct}
        />
      )}

      {view === 'product' && currentProduct && (
        <ProductDetailPage
          key={currentProduct.id}
          product={currentProduct}
          accentColor={ACCENT_COLOR}
          cartSummary={cartSummary}
          onGoCatalog={goCatalog}
          onAddToCart={addToCart}
          onBrowseUpcoming={browseUpcoming}
        />
      )}

      {view === 'cart' && (
        <CartPage
          cartLines={cartLines}
          summary={cartSummary}
          accentColor={ACCENT_COLOR}
          onInc={incCartQty}
          onDec={decCartQty}
          onRemove={removeCartLine}
          onGoCatalog={goCatalog}
        />
      )}
    </div>
  );
}
