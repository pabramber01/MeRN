import { LogoImg, LogoText, Wrapper } from './index';

function Logo() {
  return (
    <Wrapper>
      <div className="logo-container">
        <LogoImg />
        <LogoText />
      </div>
    </Wrapper>
  );
}

export default Logo;
