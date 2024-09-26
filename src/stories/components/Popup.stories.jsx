import Popup from '../../components/Popup/Popup';
import '../../index.css';

export const PopupComponent = () => {
  return <Popup title={'서울역'} handleClose={() => console.log('close!')} />;
};

export default {
  title: 'Components/Popup',
  component: PopupComponent,
};
