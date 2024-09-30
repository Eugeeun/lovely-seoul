import useForm from '../../hooks/useForm';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './Login.module.scss';
import useStore from '../../store';

const Login = ({ handleClose }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    name: '',
    age: '',
  });
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
            <option value='10'>10대</option>
            <option value='20'>20대</option>
            <option value='30'>30대</option>
            <option value='40'>40대</option>
            <option value='50'>50대</option>
          </select>
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>
        <button type='submit'>Continue</button>
      </form>
      <div className={styles.closeBtn} onClick={handleClose}>
        <img src='/closeBtn.svg' alt='' />
      </div>
    </div>
  );
};

export default Login;
