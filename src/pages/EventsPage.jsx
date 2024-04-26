import {
  Flex,
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  Checkbox,
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
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      // Optionally, update local state or perform other actions
      console.log('Event deleted successfully');
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
  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter events based on selected categories
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
      <Input
        placeholder='Search events...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Filters */}
      <Flex>
        <Checkbox
          isChecked={selectedCategories.includes(1)}
          onChange={() => toggleCategoryFilter(1)}
        >
          Sports
        </Checkbox>
        <Checkbox
          isChecked={selectedCategories.includes(2)}
          onChange={() => toggleCategoryFilter(2)}
        >
          Games
        </Checkbox>
        <Checkbox
          isChecked={selectedCategories.includes(3)}
          onChange={() => toggleCategoryFilter(3)}
        >
          Relaxation
        </Checkbox>
        {/* Add more checkboxes for other categories */}
      </Flex>

      {/* Display Filtered Events */}
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
      <AddEventButton />
    </>
  );
};
