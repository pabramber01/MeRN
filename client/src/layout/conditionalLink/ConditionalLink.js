import { Link } from 'react-router-dom';

function ConditionalLink({ children, condition, ...props }) {
  return condition && props.to ? (
    <Link {...props}>{children}</Link>
  ) : (
    <>{children}</>
  );
}

export default ConditionalLink;
