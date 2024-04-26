import React, { useEffect, useState } from 'react';
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
        // Fetch categories
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
    setEditedEvent({ ...event }); // Copy the event object for editing
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setEditedEvent(null);
  };

  const handleSaveEdit = (editedEventData) => {
    // Update event state with edited event data
    setEvent(editedEventData);

    // Trigger handleSubmitEdit to send updated data to backend
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

      // Log the response status and data
      const responseData = await response.json();
      console.log('PUT request successful. Response:', responseData);

      // Update the event state with the edited event
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const handleNavigateHome = () => {
    window.location.href = '/'; // Navigate to the home page
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Log the response status
      console.log('DELETE request successful.');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
    handleNavigateHome();
  };
  if (!event || !creator) {
    return <div>Loading...</div>;
  }

  // Map category IDs to category names
  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  });

  return (
    <div>
      <h1>Event Details</h1>
      <div>
        <h2>Title: {event.title}</h2>
        <p>Description: {event.description}</p>
        <p>Start Time: {event.startTime}</p>
        <p>End Time: {event.endTime}</p>
        <p>Categories: {eventCategories.join(', ')}</p>
        {/* Display creator information */}
        <div>
          <p>Created By: {creator.name}</p>
          <img src={creator.image} alt={creator.name} />
        </div>
        <img src={event.image} alt={event.title} />
      </div>

      {/* Edit button */}
      <DeleteEvent event={event} onDelete={handleDelete} />
      <EditButton onEdit={handleEdit} />
      <EditModal
        isOpen={isEditing}
        onClose={handleCloseEditModal}
        event={editedEvent || event} // Pass edited event or original event
        onSave={handleSaveEdit} // Pass the handleSaveEdit function
      />
    </div>
  );
};
