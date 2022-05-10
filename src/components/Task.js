import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {CircularProgress} from '@mui/material';
import PropTypes from 'prop-types';

import '../styles/components/Task.css';

const Task = ({ startHandler, deleteHandler, id, title, description, progress }) => {

  /* context */

  return (
    <Card id={'task'} >

      <Container id={'container'}>

        <div id={'header'}>

          <Button id={'titleButton'} variant="danger" onClick={() => startHandler(id)}>

            <div id={'titleContainer'}>

              <CircularProgress color={'inherit'} variant="determinate" value={progress} id={'bar'} sx={{
                padding: '.2rem'
              }}/>

              <h5>
                {title}
              </h5>

            </div>

          </Button>

          <button id={'delButton'} onClick={() => deleteHandler(id)}>
            X
          </button>

        </div>

        { description && <p>
          {description}
        </p>}

      </Container>

    </Card>
  );
};

Task.propTypes = {
  startHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  progress: PropTypes.number
};

export default Task;