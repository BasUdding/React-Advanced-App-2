import {
  Flex,
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  Checkbox,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { AddEventButton } from '../components/AddButton';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetchting events:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchEvents();
    fetchCategories();
    console.log('useEffect was rendered');
  }, []);

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const toggleCategoryFilter = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEventsByCategories =
    selectedCategories.length > 0
      ? filteredEvents.filter(
          (event) =>
            event.categoryIds &&
            event.categoryIds.some((categoryId) =>
              selectedCategories.includes(categoryId)
            )
        )
      : filteredEvents;

  return (
    <>
      <Heading textAlign='center' mt={8} mb={4}>
        All Events
      </Heading>
      <Center>
        <Input
          placeholder='Search events...'
          w={450}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Flex flexWrap='wrap'>
          <Box mx={2}>
            <Checkbox
              isChecked={selectedCategories.includes(1)}
              onChange={() => toggleCategoryFilter(1)}
            >
              Sports
            </Checkbox>
          </Box>

          <Box mx={2}>
            <Checkbox
              isChecked={selectedCategories.includes(2)}
              onChange={() => toggleCategoryFilter(2)}
            >
              Games
            </Checkbox>
          </Box>

          <Box mx={2}>
            <Checkbox
              isChecked={selectedCategories.includes(3)}
              onChange={() => toggleCategoryFilter(3)}
            >
              Relaxation
            </Checkbox>
          </Box>
          <AddEventButton />
        </Flex>
      </Center>
      <Flex flexWrap='wrap' justifyContent='center'>
        {filteredEventsByCategories.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            categories={categories}
            onDelete={deleteEvent}
          />
        ))}
      </Flex>
    </>
  );
};
