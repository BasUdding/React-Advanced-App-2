import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const EventCard = ({ event, categories, onDelete }) => {
  const getCategoryNames = () => {
    if (!categories || categories.length === 0 || !event.categoryIds) {
      return '';
    }
    return event.categoryIds
      .map((categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : '';
      })
      .join(', ');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p='4'
      m='4'
      maxW='300px'
      shadow='md'
    >
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
      <Link to={`/event/${event.id}`}>
        <Image
          src={event.image}
          alt={event.title}
          maxW='100%'
          mb='2'
          borderRadius='lg'
        />
        <Heading as='h2' size='md' mb='2' textAlign='center' color='teal.500'>
          {event.title}
        </Heading>
        <Text fontSize='sm' textAlign='center' color='gray.600'>
          {event.description}
        </Text>
        <Text fontSize='sm' textAlign='center' color='gray.600'>
          Start Time: {event.startTime}
        </Text>
        <Text fontSize='sm' textAlign='center' color='gray.600'>
          End Time: {event.endTime}
        </Text>
        <Text fontSize='sm' textAlign='center' color='gray.600'>
          Location: {event.location}
        </Text>
        <Text fontSize='sm' textAlign='center' color='gray.600'>
          Categories: {getCategoryNames()}
        </Text>
      </Link>
    </Box>
  );
};
