import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <Flex as='nav' bg='gray.800' p={4} justifyContent='center'>
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
      </ul>
    </Flex>
  );
};
