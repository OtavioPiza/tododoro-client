import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import '../styles/components/Task.css';

const Task = ({ startHandler, deleteHandler, editHandler,
  id, title, description, progress, due, priority }) => {

  /* context */

  const dueDate = new Date(due);
  const priorityString = priority == 3
    ? 'URGENT'
    : priority === 2
      ? 'HIGH'
      : priority === 1
        ? 'NORMAL'
        : priority === 0 ? 'LOW' : null;

  return (
    <Card id={'task'} >

      <Container id={'container'}>

        <div id={'header'}>

          <Button id={'titleButton'} variant="danger" onClick={() => startHandler(id)}>

            <div id={'titleContainer'}>

              <CircularProgress color={'inherit'} variant="determinate" value={progress} id={'bar'} sx={{
                padding: '.2rem'
              }} />

              <h5>
                {title}
              </h5>

            </div>

          </Button>

          <button id={'delButton'} onClick={() => deleteHandler(id)}>
            X
          </button>

          <button id='editButton' onClick={() => editHandler(id)} >
            E
          </button>

        </div>

        {description && <p>
          {description}
        </p>}

        {
          (due || priority) && <p>
            <small sytle={{
            }}>
              <b>{priorityString ? priorityString : ''}</b> {due ? `Due: ${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
            </small>
          </p>
        }

      </Container>

    </Card>
  );
};

Task.propTypes = {
  startHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  progress: PropTypes.number,
  due: PropTypes.any,
  priority: PropTypes.number
};

export default Task;