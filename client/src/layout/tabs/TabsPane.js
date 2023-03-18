function TabsPane({ child, index }) {
  return (
    <div
      className={`tab-pane fade ${index === 0 && 'show active'}`}
      id={child.props.label}
    >
      {child}
    </div>
  );
}
export default TabsPane;
