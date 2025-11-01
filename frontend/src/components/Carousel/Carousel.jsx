import styles from "./Carousel.module.css"
import React, { useRef } from 'react';

// --- 1. IMPORT YOUR IMAGES (This is correct) ---
import recursionCard from '../../assets/images/recursionCard.png';
import treeCard from '../../assets/images/treeCard.png';
import dpCard from '../../assets/images/dpCard.png';
import arrayCard from '../../assets/images/arrayCard.png';
import graphCard from '../../assets/images/graphCard.png';
import greedyCard from '../../assets/images/greedyCard.png';
import stackCard from '../../assets/images/stackCard.png';
import arrowImage from '../../assets/images/arrow5.png';

// --- 2. FIX THE LINK IMPORT ---
// 'react-router' is obsolete. The correct package is 'react-router-dom'.
import { Link } from "react-router-dom"; 

// --- 3. CREATE THE DATA ARRAY ---
// We need to group the image with its correct name and path.
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

  // You would add your scroll functions here
  // const scrollLeft = () => { ... }
  // const scrollRight = () => { ... }

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.arrow} ${styles.arrowLeft}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
        // onClick={scrollLeft}
      ></div>
      <div className={styles.cardContainerScroll} ref={scrollContainerRef}>
        
        {/* --- 4. MAP OVER THE NEW DATA ARRAY --- */}
        {cardsData.map((card) => (
            // Use the dynamic 'card.path' for the link
            <Link to={card.path} key={card.name} className={styles.cardLink}>
              <div
                className={styles.card}
                style={{ backgroundImage: `url(${card.image})` }}
                // We add an aria-label for accessibility
                aria-label={`Go to ${card.name} tutorial`}
            >
                {/* You can add the title inside the card if you want */}
                {/* <div className={styles.cardTitle}>{card.name}</div> */}
            </div>
            </Link>
        ))}
        {/* --- END OF FIX --- */}

      </div>
      <div
        className={`${styles.arrow} ${styles.arrowRight}`}
        style={{ backgroundImage: `url(${arrowImage})` }}
        // onClick={scrollRight}
      ></div>
    </div>
  );
};

export default Carousel;