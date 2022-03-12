import {
  Button,
  Card,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import styledComponents from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

import axios from 'axios';
import { useReducer } from 'react';
import Error from './components/Error';
import VisitorCount from './components/VisitorCount';

function reducer(state, action) {
  switch (action.type) {
    case 'POST_REQUEST': {
      return { ...state, loading: true, error: '', success: false };
    }
    case 'POST_SUCCESS': {
      return { ...state, loading: false, error: '', success: true };
    }
    case 'POST_FAIL': {
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    }

    default:
      return { ...state };
  }
}
function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      ID: '',
    },
  });
  const [{ loading, error, success }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    success: false,
  });

  const onSubmit = ({ firstName, lastName, ID }) => {
    dispatch({ type: 'POST_REQUEST' });
    axios
      .post('/', {
        firstName: firstName,
        lastName: lastName,
        ID: ID,
      })
      .then((result) => {
        console.log(result.data);
        reset();
        dispatch({ type: 'POST_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'POST_FAIL', payload: err.response.data.message });
      });
  };
  return (
    <AppWrapper className="App">
      {error && <Error message={error} severity="error"></Error>}
      {success && (
        <Error message="successfuly added entry" severity="success"></Error>
      )}
      <Typography variant="h4">Add Entry</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardWrapper>
          <List>
            <ListItem>
              <Controller
                name="ID"
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                  maxLength: 9,
                  pattern: /^[0-9]+$/,
                }}
                render={({ field }) => (
                  <TextField
                    {...register('ID', { required: true })}
                    id="teudatZeut"
                    label="ID"
                    fullWidth
                    variant="outlined"
                    type="text"
                    inputProps={{ type: 'ID' }}
                    error={Boolean(errors.ID)}
                    helperText={
                      errors.ID
                        ? errors.ID.type === 'minLength'
                          ? "ID isn't valid, minimum of 6 numbers and maximum of 9 numbers"
                          : errors.ID.type === 'pattern'
                          ? "ID isn't valid, ID should be numbers only"
                          : 'ID is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: true,
                  minLength: 2,
                  pattern: /^[^0-9()]+$/,
                }}
                render={({ field }) => (
                  <TextField
                    {...register('firstName', { required: true })}
                    id="firstName"
                    label="First name"
                    fullWidth
                    variant="outlined"
                    type="text"
                    inputProps={{ type: 'firstName' }}
                    error={Boolean(errors.firstName)}
                    helperText={
                      errors.firstName
                        ? errors.firstName.type === 'minLength'
                          ? "first-name isn't valid, minimum of 2 characters"
                          : errors.firstName.type === 'pattern'
                          ? 'Should include letters only'
                          : 'first-name is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: true,
                  minLength: 2,
                  pattern: /^[^0-9()]+$/,
                }}
                render={({ field }) => (
                  <TextField
                    {...register('lastName', { required: true })}
                    id="lastName"
                    label="Last name"
                    fullWidth
                    variant="outlined"
                    type="text"
                    inputProps={{ type: 'lastName' }}
                    error={Boolean(errors.lastName)}
                    helperText={
                      errors.lastName
                        ? errors.lastName.type === 'minLength'
                          ? "last name isn't valid, minimum of 2 characters"
                          : errors.lastName.type === 'pattern'
                          ? 'should include letters only'
                          : 'last name is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button fullWidth variant="contained" type="submit">
                  ADD
                </Button>
              )}
            </ListItem>
          </List>
        </CardWrapper>
      </form>
      <VisitorCount />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styledComponents.div`
  
  display:flex;
align-items:center;
flex-direction:column;
margin-top:10px;
min-height:100vh;
padding-bottom:50px;
`;

const CardWrapper = styledComponents(Card)`

`;
