import { useState } from 'react';

const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name) {
      newErrors.name = '이름을 입력하세요.';
    }
    if (!values.age) {
      newErrors.age = '나이를 선택하세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = callback => event => {
    event.preventDefault();
    if (validate()) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
