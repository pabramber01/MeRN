import {
  FeedWrapper,
  FeedSinglePlaceholderAvatar,
  FeedSinglePlaceholderImage,
} from '.';

function FeedSinglePlaceholder() {
  return (
    <FeedWrapper>
      <div className="photo">
        <FeedSinglePlaceholderImage />
        <div className="photo-info d-flex justify-content-between align-items-center placeholder placeholder-wave">
          <span className="placeholder placeholder-wave col-6"></span>
          <FeedSinglePlaceholderAvatar />
        </div>
      </div>
    </FeedWrapper>
  );
}

export default FeedSinglePlaceholder;
