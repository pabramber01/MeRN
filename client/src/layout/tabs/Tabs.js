import { TabsItem, TabsPane, TabsWrapper } from '.';

function Tabs({ children }) {
  children = Array.isArray(children) ? children : [children];
  return (
    <TabsWrapper>
      <div className="row">
        <ul className="nav nav-tabs">
          {children.map((child, i) => (
            <TabsItem
              key={child.props.label}
              label={child.props.label}
              index={i}
            />
          ))}
        </ul>
        <div className="tab-content">
          {children.map((child, i) => (
            <TabsPane key={child.props.label} child={child} index={i} />
          ))}
        </div>
      </div>
    </TabsWrapper>
  );
}
export default Tabs;
