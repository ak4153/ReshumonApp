import { Alert } from '@mui/material/';
import React from 'react';

/**
 *
 * @param {*} message
 * @param {*} severity
 * @returns
 */
export default function Error({ message, severity }) {
  return (
    <>
      {message ? (
        <Alert severity={severity || 'warning'}>{message || 'error'}</Alert>
      ) : (
        ''
      )}
    </>
  );
}
