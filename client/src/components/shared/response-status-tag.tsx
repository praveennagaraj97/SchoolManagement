import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

const ResponseStatusTag: FC<{
  className?: string;
  successmessage?: string | null;
  errMessage?: string | null;
  infoMessage?: string | null;
}> = ({ className, errMessage, infoMessage, successmessage }) => {
  return (
    <div className={className || 'min-h-[25px] text-sm text-center'}>
      <AnimatePresence mode="wait">
        {successmessage || errMessage || infoMessage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className={`overflow-hidden  ${errMessage ? 'text-red-600 ' : ''} ${
              successmessage ? 'text-green-600 ' : ''
            } ${infoMessage ? 'text-blue-600 ' : ''}`}
          >
            {successmessage || errMessage || infoMessage || ''}
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponseStatusTag;
