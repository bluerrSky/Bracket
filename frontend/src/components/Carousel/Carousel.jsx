import styles from "./Carousel.module.css"
import React, { useRef } from 'react';

import recursionCard from '../../assets/images/recursionCard.png';
import treeCard from '../../assets/images/treeCard.png';
import dpCard from '../../assets/images/dpCard.png';
import arrayCard from '../../assets/images/arrayCard.png';
import graphCard from '../../assets/images/graphCard.png';
import greedyCard from '../../assets/images/greedyCard.png';
import stackCard from '../../assets/images/stackCard.png';
import arrowImage from '../../assets/images/arrow5.png';


const cardImages = [
    recursionCard,
    treeCard,
    dpCard,
    arrayCard,
    graphCard,
    greedyCard,
    stackCard,
]



const Carousel = () => {
  const scrollContainerRef = useRef(null);

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.arrow} ${styles.arrowLeft}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
      ></div>
      <div className={styles.cardContainerScroll} ref={scrollContainerRef}>
        {cardImages.map((image, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div
        className={`${styles.arrow} ${styles.arrowRight}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
      ></div>
    </div>
  );
};

export default Carousel;