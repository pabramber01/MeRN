import { LogoImg, LogoText, LogoWrapper } from './index';

function Logo() {
  return (
    <LogoWrapper>
      <div className="logo-container">
        <LogoImg />
        <LogoText />
      </div>
    </LogoWrapper>
  );
}

export default Logo;
