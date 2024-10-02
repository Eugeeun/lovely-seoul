import useForm from '../../hooks/useForm';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './Login.module.scss';
import useStore from '../../store';
import PropTypes from 'prop-types';

const Login = ({ handleClose }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({ name: '', age: '' });
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', { name: '', age: '' });
  const { setSavedUserInfo } = useStore();

  const onSubmit = formData => {
    setUserInfo(formData);
    setSavedUserInfo(formData);
    handleClose();
  };

  return (
    <div className={styles.loginCon}>
      <span className={styles.title}>로그인</span>
      <p className={styles.desc}>간단한 정보를 입력하시면 좋은 정보를 추천해드릴게요!</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <input
            type='text'
            id='name'
            name='name'
            value={values.name}
            onChange={handleChange}
            placeholder='이름을 입력하세요'
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <select id='age' name='age' value={values.age} onChange={handleChange}>
            <option value=''>나이를 선택하세요</option>
            {[10, 20, 30, 40, 50, 60].map(age => (
              <option key={age} value={age}>
                {age}대
              </option>
            ))}
          </select>
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>
        <button type='submit'>Continue</button>
      </form>
      <div className={styles.closeBtn} onClick={handleClose}>
        <img src='/closeBtn.svg' alt='Close' />
      </div>
    </div>
  );
};

Login.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Login;
