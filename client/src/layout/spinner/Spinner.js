function Spinner({ color, small }) {
  const cl = color || 'dark';
  const size = small ? 'spinner-border-sm' : '';
  const className = `spinner-border ${size} text-${cl}`;

  return (
    <div className={className} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
