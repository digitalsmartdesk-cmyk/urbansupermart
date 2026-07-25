export default function CategoryBar({ categories, active, onSelect, accentColor }) {
  return (
    <div
      className="category-bar"
      style={{
        display: 'flex',
        gap: 8,
        padding: '10px 32px',
        flexWrap: 'wrap',
        background: '#fcfbf9',
        borderBottom: '1px solid #eeefec',
      }}
    >
      {['All', ...categories].map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              padding: '7px 14px',
              border: '1px solid',
              borderColor: isActive ? accentColor : '#dfe3e0',
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: isActive ? accentColor : '#fff',
              color: isActive ? '#fff' : '#3a423e',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
