import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import styles from './Loading.module.scss';

const Loading = ({ loading }) => {
  return (
    <div className={styles.loading}>
      <BounceLoader color='#0087ca' loading={loading} size={50} speedMultiplier={0.8} />
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
