import {
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import axios from 'axios';
import Error from '../components/Error';
import Chart from '../components/Chart';
export default function Dashboard() {
  //useState instead of reducer
  const [stats, setStats] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prev) => (prev = true));
    setError((prev) => (prev = ''));
    axios
      .get('/geter')
      .then((result) => {
        console.log(result.data);

        setStats((prev) => (prev = result.data));
        setError((prev) => (prev = ''));
        setLoading((prev) => (prev = false));
      })
      .catch((err) => {
        setLoading((prev) => (prev = false));

        setError((prev) => (prev = err.response.data.message));
      });
  }, []);
  //chart

  return (
    <DashboardWrapper>
      <Typography variant="h4">Dashboard</Typography>
      <Error message={error}></Error>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <List>
              {loading ? (
                <CircularProgress />
              ) : (
                <ListItem>
                  Total Entries: {stats ? stats.allEntries.length : ''}{' '}
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <List>
              {loading ? (
                <CircularProgress />
              ) : (
                <ListItem>
                  Visitors: {stats ? stats.allVisitors.length : ''}
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            {stats ? <Chart allVisitors={stats.allVisitors}></Chart> : ''}
          </Card>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
}
const DashboardWrapper = styledComponents.div`
display:flex;
min-height: 100vh;
padding-bottom:50px;
margin-top:10px;
margin-left:20px;
flex-direction:column;
align-items:center;
padding-bottom:150px;
`;
