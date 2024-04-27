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
  Stack,
  Checkbox,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export const EditModal = ({ isOpen, onClose, event, onSave }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const [categories, setCategories] = useState({
    sports: false,
    games: false,
    relaxation: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };
  const handleCheckboxChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };

  const toast = useToast();
  const handleSave = async () => {
    try {
      const categoryMapping = {
        sports: 1,
        games: 2,
        relaxation: 3,
      };

      const selectedCategoryIds = Object.entries(categories)
        .filter(([category, isSelected]) => isSelected)
        .map(([category, _]) => categoryMapping[category]);

      const editedEventData = {
        ...editedEvent,
        categoryIds: selectedCategoryIds,
      };

      await onSave(editedEventData);
      onClose();

      toast({
        title: 'Event updated.',
        status: 'success',
        duration: 5000,
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
              value={editedEvent?.title || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name='description'
              value={editedEvent?.description || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              name='image'
              value={editedEvent?.image || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type='datetime-local'
              name='start-time'
              value={editedEvent?.startTime || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type='datetime-local'
              name='end-time'
              value={editedEvent?.endTime || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Categories</FormLabel>
            <Stack direction='column'>
              <Checkbox
                isChecked={categories.sports}
                onChange={() => handleCheckboxChange('sports')}
              >
                Sports
              </Checkbox>
              <Checkbox
                isChecked={categories.games}
                onChange={() => handleCheckboxChange('games')}
              >
                Games
              </Checkbox>
              <Checkbox
                isChecked={categories.relaxation}
                onChange={() => handleCheckboxChange('relaxation')}
              >
                Relaxation
              </Checkbox>
            </Stack>
          </FormControl>
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
