function Spinner({ color, small, centered }) {
  const cl = color || 'dark';
  const size = small ? 'spinner-border-sm' : '';
  const className = `spinner-border ${size} text-${cl}`;
  const center = centered ? 'text-center' : undefined;

  return (
    <div className={center}>
      <div className={className} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
