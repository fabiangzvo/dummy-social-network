import { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/react";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  containerClass?: string;
  size?: string;
  modalContentId?: string;
}

function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    containerClass,
    size = "4xl",
    modalContentId,
  } = props;

  return (
    <ChakraModal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={size}
    >
      <ModalOverlay />
      <ModalContent className={modalContentId}>
        <ModalCloseButton />
        <ModalBody className={containerClass}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
