import styled from 'styled-components';

const SliderWrapper = styled.main`
  .full-slider {
    background-color: var(--bs-light);
    position: absolute;
    left: 0;
    right: 0;
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
  @media (min-width: 577px) {
    .slider-placeholder-img {
      width: 40vw;
    }
  }
`;

export default SliderWrapper;
