import useForm from './../../hooks/useForm';

export const useFormHook = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({ name: '', age: '' });

  const submitForm = formValues => {
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>
          이름:
          <input type='text' name='name' value={values.name} onChange={handleChange} />
        </label>
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>
          나이대:
          <select name='age' value={values.age} onChange={handleChange}>
            <option value=''>선택하세요</option>
            <option value='10대'>10대</option>
            <option value='20대'>20대</option>
            <option value='30대'>30대</option>
            <option value='40대'>40대</option>
            <option value='50대'>50대</option>
            <option value='60대'>60대</option>
          </select>
        </label>
        {errors.age && <span>{errors.age}</span>}
      </div>
      <button type='submit'>제출</button>
    </form>
  );
};

export default {
  title: 'Hooks/useForm',
  component: useFormHook,
};
