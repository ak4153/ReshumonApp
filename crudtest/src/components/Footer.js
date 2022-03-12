import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  const date = new Date();
  return (
    <FooterWrapper>
      {' '}
      <Typography>
        All Rights Reserved Alex Kreizelman {date.getFullYear()}
      </Typography>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  background-color: grey;

  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
