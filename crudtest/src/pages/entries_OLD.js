import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import styledComponents from 'styled-components';
import axios from 'axios';
import Error from '../components/Error';
import EditModal from '../components/EditModal';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true, error: '', success: false };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
        entries: action.payload,
      };
    }
    case 'FETCH_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    }
    case 'DELETE_REQUEST': {
      return {
        ...state,
        loadingDelete: true,
        errorDelete: '',
        successDelete: false,
      };
    }
    case 'DELETE_SUCCESS': {
      return {
        ...state,
        loadingDelete: false,
        errorDelete: '',
        successDelete: true,
      };
    }
    case 'DELETE_FAIL': {
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        successDelete: false,
      };
    }
    default:
      return { ...state };
  }
}

export default function Entries() {
  //modal related

  const [entryUpdated, setEntryUpdated] = useState(false);
  //reducer
  const [
    {
      loading,
      error,
      success,
      entries,
      loadingDelete,
      errorDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: false,
    error: '',
    success: false,
    entries: [],
    loadingDelete: false,
    errorDelete: '',
    successDelete: false,
  });

  //fetcher
  useEffect(() => {
    dispatch({ type: 'FETCH_REQUEST' });
    axios
      .get('/getentries')
      .then((result) => {
        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_FAIL', payload: err.response.data.message });
      });
  }, [successDelete, entryUpdated]);
  /**
   * delete entry by _id
   * @param {*} _id
   */
  function handleDelete(_id) {
    dispatch({ type: 'DELETE_REQUEST' });
    setEntryUpdated((prev) => (prev = false));
    axios
      .delete('/deleteentry', {
        data: { _id: _id },
      })
      .then((result) => {
        dispatch({ type: 'DELETE_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FAIL' });
      });
  }
  /**
   * opens modal with relevan entry by _id
   * @param {*} _id
   */

  return (
    <EntriesWrapper>
      {entryUpdated && (
        <Error message="successfully updated entry" severity="success"></Error>
      )}
      <Error message={error} severity="error"></Error>
      {successDelete && (
        <Error message="successfully delete entry" severity="success"></Error>
      )}
      {errorDelete && (
        <Error message="couldn't delete entry" severity="error"></Error>
      )}
      <Typography variant="h4">Entries</Typography>
      {success && entries.length < 1 ? (
        <Typography variant="h6">
          Sorry, currently there aren't any entries, but you can add some
        </Typography>
      ) : (
        ''
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <GridWrapper container justifyContent={'center'} spacing={3}>
            {entries.map((entry) => (
              <Grid item xs={5} md={3} key={entry._id}>
                <Card>
                  <List>
                    <ListItem>ID: {entry.ID}</ListItem>
                    <ListItem>First Name: {entry.firstName}</ListItem>
                    <ListItem>Last Name: {entry.lastName}</ListItem>
                    <ListItem>
                      <EditModal
                        _idEntry={entry._id}
                        IDentry={entry.ID}
                        firstNameEntry={entry.firstName}
                        lastNameEntry={entry.lastName}
                        setEntryUpdated={setEntryUpdated}
                      ></EditModal>
                    </ListItem>
                    <ListItem>
                      {loadingDelete ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(entry._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            ))}
          </GridWrapper>
        </>
      )}
    </EntriesWrapper>
  );
}
const EntriesWrapper = styledComponents.div`
display:flex;
min-height: 100vh;
padding-bottom:50px;
margin-top:10px;
margin-left:20px;
flex-direction:column;
align-items:center;
`;
const GridWrapper = styledComponents(Grid)`
padding-bottom:100px;
`;
