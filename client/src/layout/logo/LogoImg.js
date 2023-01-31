import logo from '../../assests/images/logo.png';
import { Wrapper } from './index';

function Logo() {
  return (
    <Wrapper>
      <img src={logo} alt="Logo" className="logo-img" />
    </Wrapper>
  );
}

export default Logo;
