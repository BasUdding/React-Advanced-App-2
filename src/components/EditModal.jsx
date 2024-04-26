import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export const EditModal = ({ isOpen, onClose, event, onSave }) => {
  const [editedEvent, setEditedEvent] = useState(event); // Initialize with event data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };
  const toast = useToast();
  const handleSave = async () => {
    try {
      await onSave(editedEvent);
      onClose();

      // Display the toast message
      toast({
        title: 'Event updated.',
        status: 'success',
        duration: 5000, // Set the duration of the toast message
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: 'An error occurred.',
        description: 'Failed to update event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              name='title'
              value={editedEvent?.title || ''} // Ensure value is defined
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name='description'
              value={editedEvent?.description || ''} // Ensure value is defined
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              name='image'
              value={editedEvent?.image || ''} // Ensure value is defined
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type='datetime-local'
              name='start-time'
              value={editedEvent?.startTime || ''} // Ensure value is defined
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type='datetime-local'
              name='end-time'
              value={editedEvent?.endTime || ''} // Ensure value is defined
              onChange={handleChange}
            />
          </FormControl>
          {/* Add more form controls for other event properties */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
