import PublicationList, {
  publicationListSlice,
  changeView,
  clearFeed,
  getAll,
  PublicationListPlaceholder,
} from './publicationList';
import PublicationShow, {
  publicationShowSlice,
  getPublication,
  clearPublication,
  changeLiked,
  PublicationShowPlaceholder,
} from './publicationShow';
import PublicationForm, {
  publicationFormSlice,
  createPublication,
  updatePublication,
  deletePublication,
  loadPublication,
  likePublication,
  dislikePublication,
} from './publicationForm';

export {
  PublicationList,
  publicationListSlice,
  changeView,
  clearFeed,
  getAll,
  PublicationListPlaceholder,
  PublicationShow,
  publicationShowSlice,
  getPublication,
  clearPublication,
  changeLiked,
  PublicationShowPlaceholder,
  PublicationForm,
  publicationFormSlice,
  createPublication,
  updatePublication,
  deletePublication,
  loadPublication,
  likePublication,
  dislikePublication,
};
