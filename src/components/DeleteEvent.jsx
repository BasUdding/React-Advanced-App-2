import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export const DeleteEvent = ({ event, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete {event.title}?</ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleDelete}>
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
