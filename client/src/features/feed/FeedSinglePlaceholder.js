import {
  Wrapper,
  FeedSinglePlaceholderAvatar,
  FeedSinglePlaceholderImage,
} from '.';

function FeedSinglePlaceholder() {
  return (
    <Wrapper>
      <div className="photo">
        <FeedSinglePlaceholderImage />
        <div className="photo-info d-flex justify-content-between align-items-center placeholder placeholder-wave">
          <span className="placeholder placeholder-wave col-6"></span>
          <FeedSinglePlaceholderAvatar />
        </div>
      </div>
    </Wrapper>
  );
}

export default FeedSinglePlaceholder;
