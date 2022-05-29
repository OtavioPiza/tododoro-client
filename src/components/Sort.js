import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Form } from 'react-bootstrap';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import '../styles/components/Task.css';

const Sort = ({ setSort, sort }) => {
  return (
    <Card id={'task'} >

      <Container id={'container'}>
        <Form.Group controlId="description" id={'in'}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Priority"
              onChange={((event) => setSort(event.target.value))}
              value={sort}
            >
              <MenuItem value={'c'}>Creation</MenuItem>
              <MenuItem value={'p'}>Priority</MenuItem>
              <MenuItem value={'d'}>Due Date</MenuItem>
            </Select>
          </FormControl>
        </Form.Group>
      </Container>

    </Card>
  );
};

Sort.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

export default Sort;