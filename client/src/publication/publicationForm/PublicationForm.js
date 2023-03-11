import { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearPublication, clearFeed } from '..';
import {
  PublicationFormWrapper,
  publicationFormService,
  createPublication,
  updatePublication,
} from '.';
import {
  FormInput,
  FormTextArea,
  Slider,
  sliderVH,
  SpinnerButton,
} from '../../layout';

const initialValues = {
  title: { value: '', hasError: null, errorMsg: '' },
  desc: { value: '', hasError: null, errorMsg: '' },
  images: { value: [], hasError: null, errorMsg: '' },
  previews: [],
};

function PublicationForm({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const { publication, isLoading } = useSelector(
    (state) => state.publicationForm
  );

  useEffect(() => {
    if (type === 'edit' && publication.id) {
      setValues({
        title: { value: publication.title, hasError: null, errorMsg: '' },
        desc: { value: publication.description, hasError: null, errorMsg: '' },
        images: { value: publication.images, hasError: null, errorMsg: '' },
        previews: publication.images,
      });
    } else {
      setValues(initialValues);
    } // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    if (values.images.value.length > 0) {
      dispatch(clearPublication());
      dispatch(clearFeed());
      navigate(`/publications/${publication.id}`);
    } // eslint-disable-next-line
  }, [publication]);

  useEffect(() => {
    if (values.images.value.length !== values.previews.length) {
      const urls = values.images.value.map((img) =>
        typeof img === 'string' ? img : URL.createObjectURL(img)
      );
      setValues({ ...values, previews: urls });

      return () =>
        urls.forEach((url) => {
          typeof img !== 'string' && URL.revokeObjectURL(url);
        });
    } // eslint-disable-next-line
  }, [values.images.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, desc, images, previews } = values;

    const validation = publicationFormService.validate(
      title.value,
      desc.value,
      images.value,
      previews
    );

    setValues(validation);
    if (publicationFormService.checkErrors(validation)) {
      return;
    }

    const publication = new FormData();
    publication.append('title', title.value);
    publication.append('description', desc.value);
    if (type === 'new') {
      images.value.forEach((img) => publication.append('images', img));
      dispatch(createPublication(publication));
    } else if (type === 'edit') {
      images.value.forEach((img) =>
        typeof img === 'string'
          ? publication.append('oldImg', img)
          : publication.append('newImg', img)
      );
      dispatch(updatePublication(publication));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      name === 'images'
        ? [...values.images.value, e.target.files[0]]
        : e.target.value;

    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const handleBlur = (e) => {
    const { title, desc } = values;
    const name = e.target.name;
    let res;

    switch (name) {
      case 'title':
        res = publicationFormService.validateTitle(title.value);
        break;
      case 'desc':
        res = publicationFormService.validateDescription(desc.value);
        break;
      default:
        res = {};
    }

    setValues({ ...values, [name]: { ...values[name], ...res } });
  };

  const handleDelete = (e) => {
    const index = e.target.id;
    const value = [...values.images.value];

    value.splice(index, 1);

    setValues({ ...values, images: { ...values.images, value } });
  };

  return (
    <PublicationFormWrapper>
      <form onSubmit={handleSubmit}>
        <div className={`images-preview vh-${sliderVH}`}>
          <Slider
            id="previewSlider"
            images={values.previews.length > 0 ? values.previews : ['']}
            alt="preview"
            edit={handleDelete}
          />
        </div>
        <div className="input-container">
          <FormInput
            type="file"
            name="images"
            value=""
            label={
              <>
                <FiUploadCloud />
                <span className="ms-2">Upload image</span>
              </>
            }
            labelClass={`file-input form-control${
              values.images.value.length >= 4 ? ' disabled' : ''
            }`}
            onChange={handleChange}
            hasError={values.images.hasError}
            errorMsg={values.images.errorMsg}
            accept="image/*"
            disabled={values.images.value.length >= 4}
          />
          <FormInput
            type="input"
            name="title"
            value={values.title.value}
            label="Title"
            placeholder="My publication"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={values.title.hasError}
            errorMsg={values.title.errorMsg}
          />
          <FormTextArea
            name="desc"
            value={values.desc.value}
            label="Description"
            placeholder="This is my description"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={values.desc.hasError}
            errorMsg={values.desc.errorMsg}
          />
          <div className="d-grid gap-2 my-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? <SpinnerButton /> : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </PublicationFormWrapper>
  );
}

export default PublicationForm;
