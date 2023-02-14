import { getAllThunk, getAllPublicationsThunk } from './publicationThunk';
import publicationSlice, {
  getAll,
  getAllPublications,
  changeView,
} from './publicationSlice';

export default publicationSlice;
export {
  getAll,
  getAllPublications,
  changeView,
  getAllThunk,
  getAllPublicationsThunk,
};
