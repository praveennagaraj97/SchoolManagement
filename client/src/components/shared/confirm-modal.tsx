import { motion } from 'framer-motion';
import { FC, Fragment, ReactNode, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';
import useHandleClose from '../../hooks/useHandleClose';
import useWindowResize from '../../hooks/useWindowResize';
import PortalContainer from '../container/portal';
import Portal, { PortalProps } from '../portal';

interface ConfirmModalProps
  extends Omit<PortalProps, 'children' | 'shouldDisableBackgroundScroll'> {
  children?: ReactNode;
  onConfirm: () => Promise<any> | void;
  onCancel?: () => void;
  content?: {
    heading?: string;
    description?: string;
  };
  confirmBtn?: string;
  cancelBtn?: string;
  isAsync?: boolean;
  responseMsgChildren?: ReactNode;
  zIndex?: number | string;
  setShowModal: (state: boolean) => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  setShowModal,
  showModal,
  children,
  onCancel,
  onConfirm,
  content,
  cancelBtn = 'Cancel',
  confirmBtn = 'Confirm',
  isAsync = false,
  responseMsgChildren,
  zIndex = 'auto',
}) => {
  const { width } = useWindowResize(true);
  const closeRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  useHandleClose(() => {
    if (showModal) {
      if (onCancel) {
        onCancel();
      } else {
        setShowModal(false);
      }
    }
  }, closeRef);

  return (
    <Portal shouldDisableBackgroundScroll showModal={showModal}>
      <PortalContainer style={{ zIndex }}>
        <div className="sm:w-auto w-full  sm:py-72 sm:px-10 lg:px-20 sm:mt-0 mt-auto ">
          <motion.div
            animate={{ y: 0 }}
            initial={width <= 640 ? { y: '100%' } : { y: '-100%' }}
            exit={width <= 640 ? { y: '100%' } : { y: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            ref={closeRef}
            className="relative sm:rounded-xl rounded-t-xl shadow-2xl border m-auto bg-gray-50 p-3"
          >
            <div className="sm:w-96 border-blue-zodiac rounded-xl border p-2">
              {children ? (
                children
              ) : (
                <Fragment>
                  <AiOutlineExclamationCircle size={48} className="mx-auto" />
                  <h1 className="text-xl text-center my-2">
                    {content?.heading || 'Are you sure you want to continue ?'}
                  </h1>
                  <p className="opacity-80 sm:text-sm text-center whitespace-pre-line">
                    {content?.description}
                  </p>
                  <hr
                    className={`${
                      responseMsgChildren ? 'mb-1 mt-4' : 'my-4'
                    } border-blue-zodiac/30`}
                  />
                  {responseMsgChildren}
                  <div className="flex flex-wrap space-x-2 my-2 justify-center">
                    {onCancel ? (
                      <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="text-sm bg-gray-400 smooth-animate text-gray-50 hover:bg-gray-600 py-1 px-4 rounded-md"
                      >
                        {cancelBtn}
                      </button>
                    ) : (
                      ''
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        if (isAsync) {
                          setLoading(true);
                          await onConfirm();
                          setLoading(false);
                          setShowModal(false);
                        } else {
                          onConfirm();
                        }
                      }}
                      disabled={loading}
                      className="text-sm action-btn py-1 px-4 flex space-x-2 
                      items-center"
                    >
                      {loading ? <ImSpinner2 className="animate-spin" /> : ''}
                      <span>{loading ? 'Please wait' : confirmBtn}</span>
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </motion.div>
        </div>
      </PortalContainer>
    </Portal>
  );
};

export default ConfirmModal;
