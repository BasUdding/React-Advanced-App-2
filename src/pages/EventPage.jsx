import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Flex,
  Button,
  Tag,
  Center,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { EditButton } from '../components/EditButton';
import { EditModal } from '../components/EditModal';
import { DeleteEvent } from '../components/DeleteEvent';

export const EventPage = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [creator, setCreator] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await response.json();
        setEvent(eventData);
        const categoriesResponse = await fetch(
          'http://localhost:3000/categories'
        );

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const creatorResponse = await fetch(
          `http://localhost:3000/users/${eventData.createdBy}`
        );

        const creatorData = await creatorResponse.json();
        setCreator(creatorData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEvent({ ...event });
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setEditedEvent(null);
  };

  const handleSaveEdit = (editedEventData) => {
    setEvent(editedEventData);

    handleSubmitEdit(editedEventData);
  };

  const handleSubmitEdit = async (editedEventData) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const responseData = await response.json();

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      console.log('DELETE request successful.');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!event || !creator) {
    return <div>Loading...</div>;
  }
  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  });

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
      p='4'
      maxW='900px'
      m='auto'
    >
      <Heading size='lg' mb='4'>
        Event Details
      </Heading>
      <Box mb='4'>
        <Image
          src={event.image}
          alt={event.title}
          w='100%'
          h='300px'
          objectFit='cover'
          borderRadius='lg'
        />
      </Box>
      <Box mb='4'>
        <Center>
          <Heading size='md' mb='2'>
            {event.title}
          </Heading>
        </Center>
        <Text mb='2'>
          <b>Description:</b> {event.description}
        </Text>
        <Text mb='2'>
          <b>Start Time:</b> {event.startTime}
        </Text>
        <Text mb='2'>
          <b>End Time:</b> {event.endTime}
        </Text>
        <Text mb='2'>
          <b>Categories:</b> {eventCategories.join(', ')}
        </Text>
        <Flex align='center'>
          <Text mb='0'>
            <b>Created By:</b> {creator.name}
          </Text>
          <Image
            src={creator.image}
            alt={creator.name}
            boxSize='100px'
            borderRadius='full'
            ml='2'
          />
        </Flex>
      </Box>
      <Flex justify='space-between' mb='4'>
        <DeleteEvent event={event} onDelete={handleDelete} />
        <EditButton onEdit={handleEdit} />
      </Flex>
      <EditModal
        isOpen={isEditing}
        onClose={handleCloseEditModal}
        event={editedEvent || event}
        onSave={handleSaveEdit}
      />
    </Box>
  );
};
