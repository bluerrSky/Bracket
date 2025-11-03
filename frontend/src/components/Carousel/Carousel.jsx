import styles from "./Carousel.module.css"
import React, { useRef } from 'react';

// --- 1. IMPORT YOUR IMAGES ---
import recursionCard from '../../assets/images/recursionCard.png';
import treeCard from '../../assets/images/treeCard.png';
import dpCard from '../../assets/images/dpCard.png';
import arrayCard from '../../assets/images/arrayCard.png';
import graphCard from '../../assets/images/graphCard.png';
import greedyCard from '../../assets/images/greedyCard.png';
import stackCard from '../../assets/images/stackCard.png';
import arrowImage from '../../assets/images/arrow5.png';

// --- 2. IMPORT LINK ---
import { Link } from "react-router-dom"; 

// --- 3. CREATE THE DATA ARRAY ---
const cardsData = [
    {
        name: 'Recursion',
        path: '/page/recursion',
        image: recursionCard
    },
    {
        name: 'Trees',
        path: '/page/trees',
        image: treeCard
    },
    {
        name: 'Dynamic Programming',
        path: '/page/dp',
        image: dpCard
    },
    {
        name: 'Arrays',
        path: '/page/arrays',
        image: arrayCard
    },
    {
        name: 'Graphs',
        path: '/page/graphs',
        image: graphCard
    },
    {
        name: 'Greedy',
        path: '/page/greedy',
        image: greedyCard
    },
    {
        name: 'Stack',
        path: '/page/stack',
        image: stackCard
    }
];

const Carousel = () => {
  const scrollContainerRef = useRef(null);

  // --- 4. IMPLEMENT THE SCROLL FUNCTIONS ---
  
  /**
   * Scrolls the container to the left.
   */
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // We scroll by the width of one card (320px) + the gap (1.5rem ≈ 24px)
      // A value of 350 provides a good clean scroll.
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Scrolls the container to the right.
   */
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };
  // --- END OF FIX ---

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.arrow} ${styles.arrowLeft}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
        // --- 5. ATTACH THE ONCLICK HANDLER ---
        onClick={scrollLeft}
      ></div>
      <div className={styles.cardContainerScroll} ref={scrollContainerRef}>
        
        {cardsData.map((card) => (
            <Link to={card.path} key={card.name} className={styles.cardLink}>
              <div
                className={styles.card}
                style={{ backgroundImage: `url(${card.image})` }}
                aria-label={`Go to ${card.name} tutorial`}
            >
            </div>
            </Link>
        ))}

      </div>
      <div
        className={`${styles.arrow} ${styles.arrowRight}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
        // --- 6. ATTACH THE ONCLICK HANDLER ---
        onClick={scrollRight}
      ></div>
    </div>
  );
};

export default Carousel;