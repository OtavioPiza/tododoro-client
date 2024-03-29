import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import '../styles/components/Task.css';

const Task = ({ startHandler, deleteHandler, editHandler,
  id, title, description, progress, due, priority }) => {

  /* context */

  const dueDate = new Date(due);
  const priorityString = priority == 4
    ? 'URGENT'
    : priority === 3
      ? 'HIGH'
      : priority === 2
        ? 'NORMAL'
        : priority === 1 ? 'LOW' : null;

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


        {description && <ReactMarkdown>{description}</ReactMarkdown>}

        {
          (due || priority)
            ?
            <p>
              <small sytle={{
              }}>
                <b>{priorityString ? priorityString : ''}</b> {due ? `Due: ${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
              </small>
            </p>
            :
            <></>
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