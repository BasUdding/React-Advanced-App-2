import {
  Button,
  useDisclosure,
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
  Textarea,
  Select,
  Stack,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

export const AddEventButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState('');

  const [id, setId] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [categories, setCategories] = useState({
    sports: false,
    games: false,
    relaxation: false,
  });

  const handleCheckboxChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };
  const toast = useToast();
  const handleSubmit = async () => {
    try {
      const categoryMapping = {
        sports: 1,
        games: 2,
        relaxation: 3,
      };

      const selectedCategoryIds = Object.keys(categories)
        .filter((category) => categories[category])
        .map((category) => categoryMapping[category]);

      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          createdBy: Math.floor(Math.random() * 2) + 1,
          title,
          description,
          image,
          categoryIds: selectedCategoryIds,
          location,
          startTime,
          endTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const eventData = await response.json();

      // Update local state with the newly created event
      setEvents((prevEvents) => [...prevEvents, eventData]);

      // Clear form fields
      setTitle('');
      setDescription('');
      setImage('');
      setCategoryIds(selectedCategoryIds); // Clear categoryIds
      setStartTime('');
      setEndTime('');
      setLocation('');

      // Close the modal
      onClose();
      toast({
        title: 'Event added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: 'An error occurred.',
        description: 'Failed to add event.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='teal' variant='solid'>
        Add Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type='datetime-local'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type='datetime-local'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
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
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
