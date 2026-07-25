import logo from '../assets/logo.png';

export default function Header({ search, onSearchChange, onGoCatalog, onGoCart, cartCount, accentColor }) {
  return (
    <header
      className="header-bar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: '#ffffff',
        borderBottom: '1px solid #e2e5e1',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        flexWrap: 'wrap',
      }}
    >
      <div
        onClick={onGoCatalog}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: '0 0 auto' }}
      >
        <img src={logo} alt="Urban SuperMart" className="logo-img" style={{ height: 56, width: 'auto', display: 'block' }} />
      </div>
      <input
        className="header-search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search SKUs, brands…"
        style={{
          flex: 1,
          minWidth: 200,
          padding: '9px 14px',
          border: '1px solid #dfe3e0',
          borderRadius: 4,
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
          background: '#faf9f6',
        }}
      />
      <button
        onClick={onGoCart}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 16px',
          background: accentColor,
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          flex: '0 0 auto',
        }}
      >
        Cart
        <span
          className="mono"
          style={{
            background: '#e07a1f',
            color: '#fff',
            borderRadius: 10,
            padding: '1px 7px',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {cartCount}
        </span>
      </button>
    </header>
  );
}
