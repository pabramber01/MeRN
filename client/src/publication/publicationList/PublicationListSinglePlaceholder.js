import {
  PublicationListWrapper,
  PublicationListSinglePlaceholderImage,
} from '.';
import { AvatarPlaceholder } from '../../layout';

function PublicationListSinglePlaceholder() {
  return (
    <PublicationListWrapper>
      <div className="photo">
        <PublicationListSinglePlaceholderImage />
        <div className="photo-info d-flex justify-content-between align-items-center placeholder placeholder-wave">
          <span className="placeholder placeholder-wave col-6"></span>
          <AvatarPlaceholder size="sm" shadow={false} color="light" />
        </div>
      </div>
    </PublicationListWrapper>
  );
}

export default PublicationListSinglePlaceholder;
