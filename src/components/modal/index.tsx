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
  bodyId?: string;
  size?: string;
  modalContentId?: string;
}

function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    bodyId,
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
        <ModalBody id={bodyId}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
