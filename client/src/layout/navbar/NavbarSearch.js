import { FormInput } from '../form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  search: '',
};

function NavbarSearch() {
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { search } = values;

    document.getElementById('close-offcanvas').click();

    navigate(`/?q=${search}`);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="search-input">
      <FormInput
        type="input"
        name="search"
        value={values.search}
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
}
export default NavbarSearch;
