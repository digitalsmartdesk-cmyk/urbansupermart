import { useState } from 'react';
import { badgeInfo, formatINR } from '../data/products.js';
import InfoPopover from './InfoPopover.jsx';

function CartLine({ line, onInc, onDec, onRemove }) {
  const badge = badgeInfo(line.brandType);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: '1px solid #e2e5e1', borderRadius: 6, padding: '14px 16px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: 3,
            width: 'fit-content',
            display: 'inline-block',
            marginBottom: 6,
            background: badge.bg,
            color: badge.color,
          }}
        >
          {badge.label}
        </span>
        <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#667069' }}>{line.brand}</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{line.name}</div>
        <div className="mono" style={{ fontSize: 12.5, color: '#667069', marginTop: 2 }}>{formatINR(line.price)}/{line.unit}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dfe3e0', borderRadius: 4, flex: '0 0 auto' }}>
        <button
          onClick={() => onDec(line.id)}
          disabled={line.decDisabled}
          style={{ width: 30, height: 30, border: 'none', background: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: line.decDisabled ? '#c7ccc8' : '#17211f' }}
        >
          −
        </button>
        <div className="mono" style={{ padding: '0 12px', fontWeight: 700, fontSize: 13.5, minWidth: 36, textAlign: 'center' }}>{line.qty}</div>
        <button
          onClick={() => onInc(line.id)}
          disabled={line.incDisabled}
          style={{ width: 30, height: 30, border: 'none', background: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: line.incDisabled ? '#c7ccc8' : '#17211f' }}
        >
          +
        </button>
      </div>
      <div className="mono" style={{ fontWeight: 700, fontSize: 15, flex: '0 0 auto', minWidth: 90, textAlign: 'right' }}>{formatINR(line.lineTotal)}</div>
      <button onClick={() => onRemove(line.id)} style={{ flex: '0 0 auto', background: 'none', border: 'none', color: '#94a099', fontSize: 12.5, cursor: 'pointer', textDecoration: 'underline' }}>
        Remove
      </button>
    </div>
  );
}

export default function CartPage({ cartLines, summary, accentColor, onInc, onDec, onRemove, onGoCatalog }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const { subtotal, discountAmount, finalTotal, upcomingPct, meterFillWidth, tierPctLabel, nextExists, atMaxTier, nextAmountLabel } = summary;
  const cartEmpty = cartLines.length === 0;

  return (
    <div className="cart-page" style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, margin: '0 0 20px' }}>Your Order</h1>

      {cartEmpty ? (
        <div style={{ background: '#fff', border: '1px solid #e2e5e1', borderRadius: 6, padding: '60px 20px', textAlign: 'center', color: '#667069' }}>
          <div style={{ marginBottom: 16 }}>Your cart is empty.</div>
          <button onClick={onGoCatalog} style={{ padding: '10px 20px', background: accentColor, color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Browse Catalogue
          </button>
        </div>
      ) : (
        <div className="cart-columns" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '2 1 480px', minWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cartLines.map((line) => (
              <CartLine key={line.id} line={line} onInc={onInc} onDec={onDec} onRemove={onRemove} />
            ))}
          </div>

          <div style={{ flex: '1 1 340px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e5e1', borderRadius: 6, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#667069' }}>Upcoming-Brand Share</span>
                <span className="mono" style={{ fontWeight: 700, fontSize: 16, color: '#e07a1f' }}>{upcomingPct.toFixed(1)}%</span>
              </div>
              <div style={{ position: 'relative', height: 10, background: '#eef0ed', borderRadius: 5, margin: '6px 0' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 5, background: '#e07a1f', width: `${meterFillWidth}%` }} />
                <div style={{ position: 'absolute', left: '20%', top: -4, bottom: -4, width: 2, background: '#b8bfba' }} />
                <div style={{ position: 'absolute', left: '40%', top: -4, bottom: -4, width: 2, background: '#b8bfba' }} />
                <div style={{ position: 'absolute', left: '80%', top: -4, bottom: -4, width: 2, background: '#b8bfba' }} />
              </div>
              <div className="mono" style={{ position: 'relative', height: 16, fontSize: 10, color: '#94a099', marginBottom: 14 }}>
                <span style={{ position: 'absolute', left: '20%', transform: 'translateX(-50%)' }}>10%</span>
                <span style={{ position: 'absolute', left: '40%', transform: 'translateX(-50%)' }}>20%</span>
                <span style={{ position: 'absolute', left: '80%', transform: 'translateX(-50%)' }}>40%</span>
              </div>
              <div style={{ fontSize: 13, color: '#4b5652', lineHeight: 1.5 }}>
                {nextExists ? (
                  <span>Add <strong>{nextAmountLabel}</strong> more of upcoming-brand items to reach the next discount tier.</span>
                ) : atMaxTier ? (
                  <span>You've reached the maximum 1.5% discount tier.</span>
                ) : null}
              </div>
            </div>

            <div className="info-popover-wrap" style={{ background: accentColor, borderRadius: 6, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#cfe6e1', fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Discount</span>
                <button
                  onClick={() => setInfoOpen((v) => !v)}
                  style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid #cfe6e1', background: 'none', color: '#cfe6e1', fontSize: 12, fontWeight: 700, cursor: 'pointer', lineHeight: 1 }}
                >
                  i
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontWeight: 800, fontSize: 28, color: '#f0902c' }}>{tierPctLabel}</span>
                <span style={{ color: '#cfe6e1', fontSize: 12.5 }}>(upcoming brands = {upcomingPct.toFixed(1)}% of order)</span>
              </div>
              {infoOpen && <InfoPopover />}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e5e1', borderRadius: 6, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#4b5652' }}>
                <span>Subtotal</span><span className="mono">{formatINR(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: '#e07a1f' }}>
                <span>Discount</span><span className="mono">−{formatINR(discountAmount)}</span>
              </div>
              <div style={{ borderTop: '1px solid #e2e5e1', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700 }}>
                <span>Total</span><span className="mono">{formatINR(finalTotal)}</span>
              </div>
              <button style={{ marginTop: 8, padding: '13px 20px', background: '#17211f', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
