import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

export const EditButton = ({ onEdit }) => {
  return (
    <Button colorScheme='blue' onClick={onEdit}>
      Edit Event
    </Button>
  );
};
