import PublicationShowWrapper from './PublicationShowWrapper';
import PublicationShow from './PublicationShow';
import PublicationShowPlaceholder from './PublicationShowPlaceholder';
import PublicationShowPlaceholderAvatar from './PublicationShowPlaceholderAvatar';
import publicationShowSlice, {
  getPublication,
  clearPublication,
  changeLiked,
} from './publicationShowSlice';

export default PublicationShow;
export {
  publicationShowSlice,
  getPublication,
  clearPublication,
  changeLiked,
  PublicationShowWrapper,
  PublicationShowPlaceholder,
  PublicationShowPlaceholderAvatar,
};
