
import styles from './ChoosePath.module.css';
import Carousel from '../../components/Carousel/Carousel';
import choosePathImage from '../../assets/images/choosePath.png';

const ChoosePath = () => {
  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.title}
        style={{ backgroundImage: `url(${choosePathImage})` }}
      >
      </div>
      <Carousel />
    </div>
  );
};

export default ChoosePath;