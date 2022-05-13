import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../styles/pages/Tasks.css';
import AuthContext from '../context/AuthContext';
import { doCreateNote, doRemoveNote, getNotes } from '../services/api';
import { Alert, Box, CircularProgress, LinearProgress, Modal, Snackbar, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Task from '../components/Task';
import ReactHowler from 'react-howler';
import notification from '../sounds/notification.mp3';

const Tasks = () => {

  /* context */

  const authContext = useContext(AuthContext);

  /* state */

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingTaks, setLoadingTaks] = useState(false);

  const [task, setTask] = useState(null);
  const [TaskProgress, setTaskProgress] = useState(0);
  const [breakTask, setBreakTask] = useState(null);
  const [breakProgress, setBreakProgress] = useState(0);
  const [completed, setCompleted] = useState(null);
  const [cycle, setCycle] = useState(1);

  const [audio, setAudio] = useState(false);
  const [alert, setAlert] = useState('');
  const [snack, setSnack] = useState('');

  /* hooks */

  useEffect(() => {
    setLoadingTaks(true);

    getNotes(authContext.token)
      .then(res => {
        setTasks(res.data);
        setLoadingTaks(false);
      })
      .catch((e) => {
        console.log(e);
        setAlert('Something went wrong while fetching your tasks');
        setLoadingTaks(false);
      });
  }, []);

  if (task && !completed) {
    setTimeout(() => {

      if (TaskProgress !== 100) {
        setTaskProgress(TaskProgress + 1);

      } else {
        startBreak(task);
      }
    }, 15000);
  }

  if (breakTask) {
    setTimeout(() => {

      if (breakProgress !== 100) {
        setBreakProgress(breakProgress + 1);
      } else {
        startCompleted(breakTask);
      }
    }, cycle % 4 ? 3000 : 9000);
  }

  /* handlers */

  const startTask = (id) => {

    if (task) {

      if (task === id) {
        startBreak(task);

      } else {
        setCompleted(task);
        setTask(id);
      }
      return;
    }

    setTaskProgress(0);
    setTask(id);
  };

  const startBreak = () => {
    setTaskProgress(100);
    setAudio(true);
    setTask(null);

    if (breakTask) {
      startCompleted(breakTask);
    }

    setBreakProgress(0);
    setBreakTask(task);
  };

  const startCompleted = (id) => {
    setAudio(true);
    setCycle(cycle % 4 ? cycle + 1 : 1);
    setBreakProgress(100);
    setBreakTask(null);
    setCompleted(id);
  };

  const createTask = async () => {

    if (!title) {
      setAlert('Please enter a title');
      setTimeout(() => setAlert(''), 5000);
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
        priority: res.data.priority,
      }));
      setTitle('');
      setDescription('');
      setDate(null);
      setPriority(null);
      setSnack('Task created');

    } catch (e) {
      console.log(e);
      setAlert('Something went wrong while creating a new task');
      setTimeout(() => setAlert(''), 5000);
    }
    setLoading(false);
  };

  const removeTask = async (id) => {

    try {
      await doRemoveNote(authContext.token, id);
      setTasks(tasks.filter((task) => task.id !== id));
      setSnack('Task removed');

    } catch (e) {
      console.log(e.error);
      setAlert('Something went wrong while deleting the task');
      setTimeout(() => setAlert(''), 5000);
    }

  };

  const currentTaskTitle = (id) => {

    for (const task of tasks) {
      if (task.id === id) {
        return ` (${task.title})`;
      }
    }
  };

  /* return tasks */

  return (
    <Row id={'main'}>
      {loadingTaks
        ? <LinearProgress id={'lp'} color={'inherit'} />
        : <span id={'lp'}></span>}

      <Col />
      <Col xs={'auto'}>

        {
          tasks.map((t, i) => (
            <Task
              key={i}
              startHandler={startTask}
              deleteHandler={removeTask}
              id={t.id}
              title={t.title}
              description={t.description}
              progress={task && t.id === task ? TaskProgress : 100}
              due={t.due}
            />
          ))
        }

        <Card id={'create'} >

          <Container id={'container'}>
            <Form>

              <h4>
                Create a new task!
              </h4>

              <Form.Group controlId={'title'} id={'in'}>
                <Form.Control
                  placeholder={'Enter a title'}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description" id={'in'}>
                <Form.Control
                  placeholder={'Enter a description (optional)'}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
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
                    label="Choose a due date (optional)"
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

        <div id={'alertDiv'}>

          {alert && <Alert
            id={'alert'}
            open={alert && true}
            onClose={() => setAlert('')}
            severity={'error'}
            sx={{
              borderRadius: '1rem',
              marginTop: '5px',
              maxWidth: '100%'
            }}
          >{alert}</Alert>}

        </div>

      </Col>
      <Col />

      <Modal
        open={!!breakTask}
        onClose={() => () => startCompleted(breakTask)}
      >
        <Box sx={{
          borderRadius: '1rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Time to take a break!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {'You have been working hard; take some to chill and recharge. We will notify you when it\'s time to get back to work.'}
          </Typography>

          <br />

          <div id={'breakBar'}>
            <LinearProgress variant={'determinate'} color={'inherit'} value={breakProgress} />
          </div>

          <br />

          <div>

            <Button variant={'danger'} id={'genButton'} onClick={() => startCompleted(breakTask)}>Skip Break</Button>

          </div>

        </Box>
      </Modal>

      <Modal
        open={!!completed}
        onClose={() => () => setCompleted(null)}
      >
        <Box sx={{
          borderRadius: '1rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Did you complete the task?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Did you complete the task you have been working on${currentTaskTitle(completed)}?`}
          </Typography>

          <br />

          <Button
            style={{
              marginBottom: '.5rem'
            }}
            variant={'danger'}
            id={'genButton'}
            onClick={() => {
              removeTask(completed).then(() => {
                setCompleted(null);
              });
            }}
          >
            Yes! Go ahead and remove it.
          </Button>

          <Button
            variant={'danger'}
            id={'genButton'}
            onClick={() => {
              setCompleted(null);
            }}
          >
            No! Keep it there.</Button>

        </Box>
      </Modal>

      <Snackbar
        open={!!snack}
        autoHideDuration={5000}
        onClose={() => setSnack('')}
        message={snack}
      />

      <ReactHowler preload={true} playing={audio} onEnd={() => setAudio(false)} src={notification} />

    </Row>

  );
};

export default Tasks;