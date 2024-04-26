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
  useToast,
} from '@chakra-ui/react';

export const DeleteEvent = ({ event, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast(); // Use useToast hook to display toast message

  const handleDelete = async () => {
    try {
      await onDelete(); // Wait for the onDelete function to complete

      // Close the modal
      onClose();

      // Display the toast message
      toast({
        title: 'Event deleted.',
        status: 'success',
        duration: 3000, // Set the duration of the toast message
        isClosable: true,
      });

      // Navigate back to the homepage after a delay
      setTimeout(() => {
        window.location.href = '/'; // Navigate back to the homepage
      }, 2000); // Adjust the delay time as needed
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'An error occurred.',
        description: 'Failed to delete event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
            <Button colorScheme='red' mr={3} onClick={handleDelete}>
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
