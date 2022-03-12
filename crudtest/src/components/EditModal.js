import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { CircularProgress, List, ListItem, TextField } from '@mui/material';
import Error from './Error';
import styled from 'styled-components';

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
export default function EditModal({
  firstNameEntry,
  lastNameEntry,
  _idEntry,
  IDentry,
  setEntryUpdated,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [{ loading, error, success }, dispatch] = React.useReducer(reducer, {
    loading: false,
    error: '',
    success: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      firstName: firstNameEntry,
      lastName: lastNameEntry,
      ID: IDentry,
    },
  });
  const onSubmit = ({ firstName, lastName, ID }) => {
    dispatch({ type: 'POST_REQUEST' });
    setEntryUpdated((prev) => (prev = false));
    axios
      .put('/edit', {
        data: {
          _id: _idEntry,
          firstName: firstName,
          lastName: lastName,
          // ID: ID,
        },
      })
      .then((result) => {
        console.log(result.data);
        reset();
        setEntryUpdated((prev) => (prev = true));
        dispatch({ type: 'POST_SUCCESS' });
      })
      .catch((err) => {
        setEntryUpdated((prev) => (prev = false));
        dispatch({ type: 'POST_FAIL', payload: err.response.data.message });
      });
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxWrapper xs={12} md={6} className="modal__container">
          <Error message={error} severity="error"></Error>
          <Error
            message={success && 'successfully updated entry'}
            severity="success"
          ></Error>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Entry id: {_idEntry}
          </Typography>
          <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
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
                      disabled={true}
                      {...register('ID', { required: true })}
                      id="modal_teudatZeut"
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
                      id="modal_firstName"
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
                      id="modal_lastName"
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
                    EDIT
                  </Button>
                )}
              </ListItem>
            </List>
          </form>
        </BoxWrapper>
      </Modal>
    </div>
  );
}
const BoxWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: '50%';
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 20px;
  .modal__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
