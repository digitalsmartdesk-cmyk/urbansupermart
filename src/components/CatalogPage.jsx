import { badgeInfo, stripeColors, formatINR } from '../data/products.js';
import StripePlaceholder from './StripePlaceholder.jsx';

const BRAND_TYPE_TABS = [
  { key: 'all', label: 'All Brands' },
  { key: 'established', label: 'Established' },
  { key: 'upcoming', label: 'Upcoming Brand' },
];

const SORT_TABS = [
  { key: 'default', label: 'Default' },
  { key: 'priceAsc', label: 'Price: Low to High' },
  { key: 'priceDesc', label: 'Price: High to Low' },
];

function SidebarGroup({ title, tabs, active, onSelect, accentColor }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#667069',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                border: '1px solid #e2e5e1',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                background: isActive ? accentColor : '#fff',
                color: isActive ? '#fff' : '#17211f',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogPage({
  products,
  resultsCountLabel,
  filterBrandType,
  onSelectBrandType,
  filterSort,
  onSelectSort,
  gridMin,
  accentColor,
  onOpenProduct,
}) {
  return (
    <div style={{ display: 'flex', gap: 28, padding: '28px 32px', alignItems: 'flex-start', flexWrap: 'wrap' }} className="catalog-layout">
      <aside
        className="catalog-sidebar"
        style={{
          flex: '0 0 220px',
          minWidth: 220,
          background: '#fff',
          border: '1px solid #e2e5e1',
          borderRadius: 6,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <SidebarGroup title="Brand Type" tabs={BRAND_TYPE_TABS} active={filterBrandType} onSelect={onSelectBrandType} accentColor={accentColor} />
        <SidebarGroup title="Sort" tabs={SORT_TABS} active={filterSort} onSelect={onSelectSort} accentColor={accentColor} />
      </aside>

      <div style={{ flex: 1, minWidth: 400 }}>
        <div style={{ marginBottom: 16, fontSize: 13, color: '#667069' }}>{resultsCountLabel}</div>
        <div
          className="catalog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${gridMin}px, 1fr))`,
            gap: 20,
          }}
        >
          {products.map((item) => {
            const badge = badgeInfo(item.brandType);
            const stripe = stripeColors(item.brandType);
            const isUpcoming = item.brandType === 'upcoming';
            return (
              <div
                key={item.id}
                onClick={() => onOpenProduct(item.id)}
                style={{
                  cursor: 'pointer',
                  background: '#fff',
                  border: '1px solid #e2e5e1',
                  borderRadius: 6,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <StripePlaceholder stripeA={stripe.a} stripeB={stripe.b} style={{ aspectRatio: '1' }} />
                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: 3,
                      width: 'fit-content',
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                  {isUpcoming && (
                    <span
                      style={{
                        fontSize: 10.5,
                        color: '#8a4a10',
                        background: '#fbe7d3',
                        padding: '3px 8px',
                        borderRadius: 3,
                        width: 'fit-content',
                      }}
                    >
                      Add to unlock cart discount
                    </span>
                  )}
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#667069', marginTop: 2 }}>
                    {item.brand}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{item.name}</span>
                  <span className="mono" style={{ marginTop: 'auto', paddingTop: 6, fontWeight: 700, fontSize: 15, color: accentColor }}>
                    {formatINR(item.price)}/{item.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
