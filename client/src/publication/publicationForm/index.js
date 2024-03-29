import PublicationForm from './PublicationForm';
import PublicationFormWrapper from './PublicationFormWrapper';
import publicationFormService from './publicationFormService';
import publicationFormSlice, {
  createPublication,
  updatePublication,
  deletePublication,
  loadPublication,
  likePublication,
  dislikePublication,
  clearPublicationForm,
} from './publicationFormSlice';

export default PublicationForm;
export {
  PublicationFormWrapper,
  publicationFormService,
  publicationFormSlice,
  createPublication,
  updatePublication,
  deletePublication,
  loadPublication,
  likePublication,
  dislikePublication,
  clearPublicationForm,
};
