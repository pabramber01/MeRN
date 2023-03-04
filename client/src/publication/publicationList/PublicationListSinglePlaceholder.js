import {
  PublicationListWrapper,
  PublicationListSinglePlaceholderAvatar,
  PublicationListSinglePlaceholderImage,
} from '.';

function PublicationListSinglePlaceholder() {
  return (
    <PublicationListWrapper>
      <div className="photo">
        <PublicationListSinglePlaceholderImage />
        <div className="photo-info d-flex justify-content-between align-items-center placeholder placeholder-wave">
          <span className="placeholder placeholder-wave col-6"></span>
          <PublicationListSinglePlaceholderAvatar />
        </div>
      </div>
    </PublicationListWrapper>
  );
}

export default PublicationListSinglePlaceholder;
