import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const EventCard = ({ event, categories }) => {
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

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p='4'
      m='4'
      maxW='300px'
      shadow='md'
      overflow='hidden'
    >
      <Link to={`/event/${event.id}`}>
        <Image
          src={event.image}
          alt={event.title}
          width='100%'
          height='200px'
          objectFit='cover'
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
