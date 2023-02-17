import styled from 'styled-components';

const Wrapper = styled.main`
  .photo {
    width: 100%;
    aspect-ratio: 1 / 1;
    margin: 0.6rem 0 0.6rem 0;
    position: relative;
    overflow: hidden;
  }
  .photo > img,
  .placeholder-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user-img,
  .placeholder-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  .photo-info {
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    transition: 0.3s;
  }
  .photo:hover > .photo-info {
    transform: translateY(0);
    transition: 0.3s;
  }
  @media (max-width: 1199px) {
    .photo-info {
      transform: translateY(0);
    }
  }
`;

export default Wrapper;
