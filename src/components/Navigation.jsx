import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <Flex
      as='nav'
      bg='gray.800' // Background color
      p={4} // Padding
      justifyContent='center' // Center align items horizontally
    >
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ display: 'inline-block', marginRight: '20px' }}>
          <ChakraLink
            as={RouterLink}
            to='/'
            color='white'
            _hover={{ color: 'cyan.300' }}
          >
            Events
          </ChakraLink>
        </li>
        <li style={{ display: 'inline-block', marginRight: '20px' }}>
          <ChakraLink
            as={RouterLink}
            to='/event/1'
            color='white'
            _hover={{ color: 'cyan.300' }}
          >
            Event
          </ChakraLink>
        </li>
      </ul>
    </Flex>
  );
};
