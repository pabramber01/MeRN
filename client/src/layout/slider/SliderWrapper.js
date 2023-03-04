import styled from 'styled-components';

const SliderWrapper = styled.main`
  .full-slider {
    background-color: var(--bs-light);
    position: absolute;
    left: 0;
    right: 0;
  }
  .carousel-inner {
    overflow: visible;
  }
  .carousel-indicators {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  .container-img {
    width: fit-content;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .carousel-control-prev {
    left: 1.5rem;
  }
  .carousel-control-next {
    right: 1.5rem;
  }
  .slider-img {
    width: 100%;
    object-fit: cover;
  }
  .slider-placeholder-img {
    width: 85vw;
  }
  .delete-icon {
    position: absolute;
    bottom: -55px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 75px;
    width: 75px;
    z-index: 1;
    color: var(--bs-secondary);
    background-color: #f8ede3;
    border-radius: 100%;
  }
  .delete-button {
    position: absolute;
    bottom: -43px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
    width: 50px;
    z-index: 2;
    padding: 0;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: 100%;
  }
  .delete-disabled {
    cursor: not-allowed;
  }
  @media (min-width: 577px) {
    .slider-placeholder-img {
      width: 40vw;
    }
  }
`;

export default SliderWrapper;
