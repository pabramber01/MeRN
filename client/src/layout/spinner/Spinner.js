function Spinner({ color, small, centered, extraClass }) {
  const cl = color || 'dark';
  const size = small ? 'spinner-border-sm' : '';
  const classNameInner = `spinner-border ${size} text-${cl}`;
  const classNameOuter = `${centered ? 'text-center' : ''} ${extraClass || ''}`;

  return (
    <div className={classNameOuter.trim() ? classNameOuter : undefined}>
      <div className={classNameInner} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
