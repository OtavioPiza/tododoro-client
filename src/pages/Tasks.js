import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import '../styles/pages/Tasks.css';
import { doRemoveNote } from '../services/api';
import { Alert, Box, LinearProgress, Modal, Snackbar, Typography } from '@mui/material';
import Task from '../components/Task';
import ReactHowler from 'react-howler';
import notification from '../sounds/notification.mp3';

import AuthContext from '../context/AuthContext';
import LogContext from '../context/LogContext';
import TaskContext from '../context/TaskContext';

import CreateTask from '../components/CreateTask';
import EditTask from '../components/EditTask';
import Sort from '../components/Sort';

const Tasks = () => {

  /* context */

  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);
  const taskContext = useContext(TaskContext);

  /* state */

  const [edit, setEdit] = useState(null);
  const [task, setTask] = useState(null);
  const [TaskProgress, setTaskProgress] = useState(0);
  const [breakTask, setBreakTask] = useState(null);
  const [breakProgress, setBreakProgress] = useState(0);
  const [completed, setCompleted] = useState(null);
  const [cycle, setCycle] = useState(1);

  const [audio, setAudio] = useState(false);


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

  const removeTask = async (id) => {
    taskContext.setLoadingTasks(true);

    try {
      await doRemoveNote(authContext.token, id);
      taskContext.setTasks(taskContext.tasks.filter((task) => task.id !== id));
      logContext.setInfo('Task removed');
      taskContext.setLoadingTasks(false);

    } catch (e) {
      logContext.setError('Something went wrong while deleting the task');
      taskContext.setLoadingTasks(false);
    }
  };

  const editTask = async (id) => {
    const task = taskContext.tasks.find((task) => task.id === id);
    setEdit(task);
  };

  const currentTaskTitle = (id) => {

    for (const task of taskContext.tasks) {
      if (task.id === id) {
        return ` (${task.title})`;
      }
    }
  };

  /* return tasks */

  return (
    <Row id={'main'}>
      {taskContext.loadingTasks
        ? <LinearProgress id={'lp'} color={'inherit'} />
        : <span id={'lp'}></span>}

      <Col />

      <Col xs={'auto'}>

        {
          taskContext.tasks.length >= 2 && <Sort setSort={taskContext.setSort} sort={taskContext.sort} />
        }

        {
          taskContext.tasks.map((t, i) => {
            return (
              <Task
                key={i}
                startHandler={startTask}
                deleteHandler={removeTask}
                editHandler={editTask}
                id={t.id}
                title={t.title}
                description={t.description}
                progress={task && t.id === task ? TaskProgress : 100}
                due={t.due}
                priority={t.priority}
              />
            );
          })
        }

        <CreateTask tasks={taskContext.tasks} setTasks={taskContext.setTasks} />

        <div id={'alertDiv'}>

          {logContext.error && <Alert
            id={'alert'}
            open={!!logContext.error}
            severity={'error'}
            sx={{
              borderRadius: '1rem',
              marginTop: '5px',
              maxWidth: '100%'
            }}
          >{logContext.error}</Alert>}

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
          width: 'min(400px, 80%)',
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
          width: 'min(400px, 80%)',
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

      <Modal
        open={!!edit}
        onClose={() => () => setEdit(false)}
      >
        <div id='edit'>
          <EditTask task={edit} tasks={taskContext.tasks} setTasks={taskContext.setTasks} setEdit={setEdit} />
        </div>
      </Modal>

      <Snackbar
        open={!!logContext.info}
        autoHideDuration={5000}
        message={logContext.info}
      />

      <ReactHowler preload={true} playing={audio} onEnd={() => setAudio(false)} src={notification} />

    </Row>

  );
};

export default Tasks;