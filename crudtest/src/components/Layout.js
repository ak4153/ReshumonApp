import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
export default function Layout({ children, title }) {
  return (
    <>
      <Navbar></Navbar>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer></Footer>
    </>
  );
}

const ContentWrapper = styled.div`
  padding-bottom: 150px;
  height: 100vh;
`;
