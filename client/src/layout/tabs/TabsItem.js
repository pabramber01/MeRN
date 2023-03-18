function TabsItem({ label, index }) {
  return (
    <li className="nav-item">
      <button
        className={`nav-link ${index === 0 && 'active'}`}
        data-bs-toggle="tab"
        data-bs-target={`#${label}`}
      >
        {label}
      </button>
    </li>
  );
}
export default TabsItem;
