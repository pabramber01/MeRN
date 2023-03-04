import { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { PublicationFormWrapper, publicationFormService } from '.';
import { FormInput, FormTextArea, Slider, sliderVH } from '../../layout';

const initialValues = {
  title: { value: '', hasError: null, errorMsg: '' },
  description: { value: '', hasError: null, errorMsg: '' },
  images: { value: [], hasError: null, errorMsg: '' },
  previews: [],
};

function PublicationForm() {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (values.images.value.length !== values.previews.length) {
      const urls = values.images.value.map((img) => URL.createObjectURL(img));
      setValues({ ...values, previews: urls });
      return () => urls.map((url) => URL.revokeObjectURL(url));
    } // eslint-disable-next-line
  }, [values.images.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, images, previews } = values;

    const validation = publicationFormService.validate(
      title.value,
      description.value,
      images.value,
      previews
    );

    setValues(validation);
    if (publicationFormService.checkErrors(validation)) {
      return;
    }

    // dispatch(createUser({ username, email, password }));
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
    const { title, description } = values;
    const name = e.target.name;
    let res;

    switch (name) {
      case 'title':
        res = publicationFormService.validateTitle(title.value);
        break;
      case 'description':
        res = publicationFormService.validateDescription(description.value);
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
            name="description"
            value={values.description.value}
            label="Description"
            placeholder="This is my description"
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={values.description.hasError}
            errorMsg={values.description.errorMsg}
          />
          <div className="d-grid gap-2 my-3">
            <button type="submit" className="btn btn-primary">
              {'Submit'}
            </button>
          </div>
        </div>
      </form>
    </PublicationFormWrapper>
  );
}

export default PublicationForm;
