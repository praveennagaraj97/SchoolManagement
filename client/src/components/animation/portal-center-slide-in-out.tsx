import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface PortalCenterSlideInOutAnimationProps {
  children: ReactNode;
  width: number;
}

const PortalCenterSlideInOutAnimation: FC<
  PortalCenterSlideInOutAnimationProps
> = ({ children, width }) => {
  return (
    <motion.div
      animate={{ y: 0, marginTop: width <= 640 ? '100%' : '' }}
      initial={width <= 640 ? { y: '100%' } : { y: '-100%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      exit={width <= 640 ? { y: '100%' } : { y: '-100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PortalCenterSlideInOutAnimation;
