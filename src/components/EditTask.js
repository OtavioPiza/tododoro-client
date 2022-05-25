import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../context/AuthContext';
import LogContext from '../context/LogContext';

import '../styles/pages/Tasks.css';

import { Button, Container, Form, Card } from 'react-bootstrap';
import { CircularProgress, TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditTask = ({ task, setTasks }) => {

  /* context */

  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  /* state */

  console.log(task);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.due);
  const [priority, setPriority] = useState(task.priority);
  const [loading, setLoading] = useState(false);

  /* handlers */

  /**
   * creates a task
   */
  const createTask = async () => {

    if (!title) {
      logContext.setError('Please enter a title');
      return;
    }

    setLoading(true);

    setLoading(false);
  };

  return (
    <Card id={'create'} style={{
      borderRadius: '1rem',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(400px, 80%)',
      p: 4,
      padding: '1.5rem 0',
    }}>
      <Container id={'container'}>
        <Form>

          <h4>
            Edit Your Task
          </h4>

          <Form.Group controlId={'title'} id={'in'} >

            <TextField
              style={{
                width: '100%',
              }}
              id="outlined-password-input"
              label="Title"
              autoComplete="current-password"
              placeholder={'Enter a title'}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </Form.Group>

          <Form.Group controlId="description" id={'in'}>

            <TextField
              style={{
                width: '100%',
              }}
              id="outlined-password-input"
              placeholder={'Enter a description (optional)'}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              value={description}
              multiline
            />
          </Form.Group>

          <Form.Group controlId="description" id={'in'}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value={-1}>None</MenuItem>
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Normal</MenuItem>
                <MenuItem value={2}>High</MenuItem>
                <MenuItem value={3}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Form.Group>

          <Form.Group controlId="date" id={'in'} style={{
            width: '100%',
          }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                id={'indate'}
                renderInput={(props) => <TextField {...props} style={{
                  width: '100%',
                }} />}
                label="Due"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Form.Group>

          <div id={'buttonHolder'}>

            <Button id={'button'} variant="danger" onClick={createTask}>
              Create
            </Button>

            {loading && <CircularProgress color={'inherit'} />}

          </div>

        </Form>
      </Container>
    </Card>
  );
};

EditTask.propTypes = {
  task: PropTypes.any,
  setTasks: PropTypes.func,
};

export default EditTask;