import { useState } from 'react';
import { badgeInfo, stripeColors, formatINR, maxSetsFor } from '../data/products.js';
import StripePlaceholder from './StripePlaceholder.jsx';
import InfoPopover from './InfoPopover.jsx';

export default function ProductDetailPage({ product, accentColor, cartSummary, onGoCatalog, onAddToCart, onBrowseUpcoming }) {
  const [sets, setSets] = useState(1);
  const [draft, setDraft] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const isEstablished = product.brandType === 'established';
  const isUpcoming = product.brandType === 'upcoming';
  const badge = badgeInfo(product.brandType);
  const stripe = stripeColors(product.brandType);
  const maxSets = maxSetsFor(product);
  const decDisabled = sets <= 1;
  const incDisabled = sets >= maxSets;
  const units = sets * product.moq;
  const total = product.price * units;

  const { hasUpcomingInCart, tierPctLabel, nextExists, atMaxTier, nextAmountLabel, nextTierPctLabel } = cartSummary;

  function commitDraft() {
    if (draft !== null) {
      const n = parseInt(draft, 10);
      const clamped = isNaN(n) ? sets : Math.min(maxSets, Math.max(1, n));
      setSets(clamped);
      setDraft(null);
    }
  }

  function handleAdd() {
    onAddToCart(product.id, units);
    setAddedFlash(true);
    clearTimeout(handleAdd._t);
    handleAdd._t = setTimeout(() => setAddedFlash(false), 1600);
  }

  return (
    <div className="product-detail-page" style={{ padding: 32, maxWidth: 1080, margin: '0 auto' }}>
      <button onClick={onGoCatalog} style={{ background: 'none', border: 'none', color: '#667069', fontSize: 13, cursor: 'pointer', padding: '0 0 20px' }}>
        ← Back to catalogue
      </button>
      <div className="product-detail-columns" style={{ display: 'flex', gap: 44, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 360px', minWidth: 300 }}>
          <StripePlaceholder
            stripeA={stripe.a}
            stripeB={stripe.b}
            fontSize="12px"
            style={{ aspectRatio: '1', borderRadius: 6 }}
          />
        </div>
        <div style={{ flex: '1 1 360px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '4px 9px',
              borderRadius: 3,
              width: 'fit-content',
              background: badge.bg,
              color: badge.color,
            }}
          >
            {badge.label}
          </span>
          <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#667069' }}>{product.brand}</span>
          <h1 style={{ fontSize: 24, margin: 0, fontWeight: 700 }}>{product.name}</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4b5652', margin: 0 }}>{product.desc}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 14, marginTop: 6, borderTop: '1px solid #e2e5e1' }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 26, color: accentColor }}>{formatINR(product.price)}</span>
            <span style={{ fontSize: 14, color: '#667069' }}>/ {product.unit}</span>
          </div>
          <div style={{ fontSize: 12.5, color: '#667069' }}>Minimum order quantity: {product.moq} {product.unit}s</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#667069' }}>
              Number of Sets{' '}
              <span style={{ textTransform: 'none', fontWeight: 500, letterSpacing: 0, color: '#94a099' }}>
                (1 set = {product.moq} {product.unit}s)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dfe3e0', borderRadius: 4, width: 'fit-content' }}>
              <button
                onClick={() => setSets((s) => Math.max(1, s - 1))}
                disabled={decDisabled}
                style={{ width: 36, height: 36, border: 'none', background: 'none', fontSize: 18, fontWeight: 700, cursor: 'pointer', color: decDisabled ? '#c7ccc8' : '#17211f' }}
              >
                −
              </button>
              <input
                value={draft !== null ? draft : String(sets)}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitDraft}
                className="mono"
                style={{ width: 56, height: 36, border: 'none', borderLeft: '1px solid #dfe3e0', borderRight: '1px solid #dfe3e0', fontWeight: 700, fontSize: 15, textAlign: 'center', outline: 'none', background: 'none' }}
              />
              <button
                onClick={() => setSets((s) => Math.min(maxSets, s + 1))}
                disabled={incDisabled}
                style={{ width: 36, height: 36, border: 'none', background: 'none', fontSize: 18, fontWeight: 700, cursor: 'pointer', color: incDisabled ? '#c7ccc8' : '#17211f' }}
              >
                +
              </button>
            </div>
            {incDisabled && <span style={{ fontSize: 12, color: '#94a099' }}>Maximum {maxSets} sets for this item</span>}
            <div className="mono" style={{ fontSize: 13.5, color: '#4b5652' }}>= {units} {product.unit}s</div>
          </div>

          <div className="mono" style={{ padding: '12px 16px', background: '#f4f6f4', borderRadius: 4, fontSize: 13.5, fontWeight: 600 }}>
            Total: {formatINR(total)}
          </div>

          {isEstablished && (
            hasUpcomingInCart ? (
              <div style={{ background: '#e3f1ee', border: '1px solid #c7ded9', borderRadius: 4, padding: '14px 16px', fontSize: 13.5, color: '#0d3f3a', lineHeight: 1.55 }}>
                {nextExists ? (
                  <span>
                    You're currently at <strong>{tierPctLabel} discount</strong> — add <strong>{nextAmountLabel}</strong> more in upcoming-brand items to reach {nextTierPctLabel}.
                  </span>
                ) : atMaxTier ? (
                  <span>You're at the maximum <strong>1.5% discount</strong> tier for this order.</span>
                ) : null}
              </div>
            ) : (
              <div style={{ background: '#fbe7d3', border: '1px solid #f0d4ae', borderRadius: 4, padding: '14px 16px', fontSize: 13.5, color: '#7a3e0d', lineHeight: 1.55 }}>
                Add an upcoming-brand item to unlock a cart-wide discount —{' '}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onBrowseUpcoming(); }}
                  style={{ color: '#7a3e0d', fontWeight: 700, textDecoration: 'underline' }}
                >
                  browse upcoming brands
                </a>
                .
              </div>
            )
          )}

          {isUpcoming && (
            <div className="info-popover-wrap" style={{ background: '#fbe7d3', border: '1px solid #f0d4ae', borderRadius: 4, padding: '14px 16px', fontSize: 13.5, color: '#7a3e0d', lineHeight: 1.55 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ flex: 1 }}>Add alongside your established-brand order to earn a cart-wide discount.</span>
                <button
                  onClick={() => setInfoOpen((v) => !v)}
                  style={{ flex: '0 0 auto', width: 20, height: 20, borderRadius: '50%', border: '1px solid #7a3e0d', background: 'none', color: '#7a3e0d', fontSize: 12, fontWeight: 700, cursor: 'pointer', lineHeight: 1 }}
                >
                  i
                </button>
              </div>
              {infoOpen && <InfoPopover />}
            </div>
          )}

          <button
            onClick={handleAdd}
            style={{ padding: '14px 20px', background: accentColor, color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 6 }}
          >
            {addedFlash ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
