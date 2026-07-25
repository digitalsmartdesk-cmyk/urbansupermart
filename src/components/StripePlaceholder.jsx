export default function StripePlaceholder({ stripeA, stripeB, label = 'PRODUCT PHOTO', style, fontSize = '10.5px' }) {
  return (
    <div
      className="stripe-placeholder"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${stripeA}, ${stripeA} 10px, ${stripeB} 10px, ${stripeB} 20px)`,
        ...style,
      }}
    >
      <span className="stripe-label" style={{ fontSize }}>{label}</span>
    </div>
  );
}
