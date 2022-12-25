import { motion } from 'framer-motion';
import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';

interface PortalSwipeInAndOutProps extends RefAttributes<HTMLDivElement> {
  width: number;
  children: ReactNode;
  className?: string | undefined;
}

const PortalSwipeInAndOut: ForwardRefExoticComponent<PortalSwipeInAndOutProps> =
  forwardRef(({ children, width, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={width > 640 ? { x: '200%' } : { y: '100%' }}
        animate={width > 640 ? { x: 0 } : { y: 0 }}
        exit={width > 640 ? { x: '200%' } : { y: '100%' }}
        transition={{ duration: 0.5, damping: '0' }}
        className={className}
      >
        {children}
      </motion.div>
    );
  });

export default PortalSwipeInAndOut;
