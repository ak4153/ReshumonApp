import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import styledComponents from 'styled-components';

export default function Navbar() {
  return (
    <AppBarWrapper position="static">
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs={3} md={2}>
            <Typography>
              <LinkWrapper to="/add">Add</LinkWrapper>
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography>
              <LinkWrapper to="/entries">View</LinkWrapper>
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography>
              <LinkWrapper to="/dashboard">Dashboard</LinkWrapper>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarWrapper>
  );
}
const LinkWrapper = styledComponents(NavLink)`
color:white;
&:hover{
  color:lightblue;
}
text-decoration: none;

`;
const AppBarWrapper = styledComponents(AppBar)`

`;
