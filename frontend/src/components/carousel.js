import React from 'react';
import { Skeleton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';
import CarouselItem from './CarouselItem';

const CarouselContainer = styled(motion.div)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    height: '300px',
});

const Card = styled(Skeleton)(({ theme }) => ({
    position: 'absolute',
    width: '300px',
    height: '200px',
    borderRadius: '10px',
    filter: 'blur(2px)',
}));

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

function Carousel({ items }) {
    const [[page, direction], setPage] = React.useState([0, 0]);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <CarouselContainer>
            <AnimatePresence initial={false} custom={direction}>
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            if (offset.x > 400) {
                                paginate(-1);
                            } else if (offset.x < -400) {
                                paginate(1);
                            }
                        }}
                    >
                        <CarouselItem item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
            <button onClick={() => paginate(-1)}>{"<"}</button>
            <button onClick={() => paginate(1)}>{">"}</button>
        </CarouselContainer>
    );
}

export default Carousel;