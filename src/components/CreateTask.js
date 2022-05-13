import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../context/AuthContext';
import LogContext from '../context/LogContext';

import { doCreateNote } from '../services/api';

import '../styles/pages/Tasks.css';

import { Button, Card, Container, Form } from 'react-bootstrap';
import { CircularProgress, TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CreateTask = ({ tasks, setTasks }) => {

  /* context */

  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  /* state */

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState('');
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

    try {
      const res = await doCreateNote(authContext.token, title, description ? description : null,
        date ? new Date(date) : null, priority ? priority : null);

      setTasks(tasks.concat({
        id: res.data.id,
        title: res.data.title,
        description: res.data.description,
        due: res.data.due,
        priority: res.data.priority == -1 ? null : res.data.priority,
      }));
      setTitle('');
      setDescription('');
      setDate(null);
      setPriority(null);
      logContext.setInfo('Task created');

    } catch (e) {
      logContext.setError('Something went wrong while creating a new task');
    }

    setLoading(false);
  };

  return (
    <Card id={'create'} >

      <Container id={'container'}>
        <Form>

          <h4>
            Create a new task!
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

CreateTask.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
};

export default CreateTask;