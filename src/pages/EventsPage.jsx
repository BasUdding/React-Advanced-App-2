import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventData = await response.json();
        console.log(eventData);

        setEvents(eventData.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    console.log('useEffect was rendered');
  }, []); // Empty dependency array ensures the effect runs only once on mount
  return (
    <div>
      <h1>All Events</h1>
      <ul>
        {events &&
          events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
