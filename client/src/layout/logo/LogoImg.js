import logo from '../../assets/images/logo.png';
import { LogoWrapper } from './index';

function Logo() {
  return (
    <LogoWrapper>
      <img src={logo} alt="Logo" className="logo-img" />
    </LogoWrapper>
  );
}

export default Logo;
