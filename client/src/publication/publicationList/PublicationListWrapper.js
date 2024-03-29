import styled from 'styled-components';

const PublicationListWrapper = styled.main`
  .photo {
    width: 100%;
    aspect-ratio: 1 / 1;
    margin: 0.6rem 0 0.6rem 0;
    position: relative;
    overflow: hidden;
  }
  .main-img,
  .placeholder-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo-info {
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    position: absolute;
    bottom: 0;
  }
  @media not all and (any-pointer: coarse) {
    .photo-info {
      transform: translateY(100%);
      transition: 0.3s;
    }
    .photo:hover > .photo-info {
      transform: translateY(0);
      transition: 0.3s;
    }
  }
`;

export default PublicationListWrapper;
