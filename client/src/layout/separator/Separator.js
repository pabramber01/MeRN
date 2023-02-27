function Separator({ color, cls }) {
  const extraClass = cls ? ` ${cls}` : '';
  return <hr className={`border border-${color} border-1 m-0${extraClass}`} />;
}

export default Separator;
