import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import LogContext from './LogContext';

import { getNotes } from '../services/api';

/**
 * default initial state
 */
const initialState = {
  tasks: [],
  sort: 'c',
  loadingTasks: false,
};

const TaskContext = createContext({
  tasks: [],
  sort: 'c',
  loadingTasks: false,
  setSort: () => { },
  setTasks: () => { },
  setLoadingTasks: () => { },
});

const TaskContextProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  const [tasks, setTasks] = useState(initialState.tasks);
  const [sortedTasks, setSortedTasks] = useState(initialState.tasks);
  const [sort, setSort] = useState(initialState.sort);

  const [loadingTasks, setLoadingTasks] = useState(initialState.loadingTasks);

  useEffect(() => {

    if (!authContext.token) {
      return;
    }

    setLoadingTasks(true);
    getNotes(authContext.token)
      .then(res => {
        setTasks(res.data);
        setLoadingTasks(false);
      })
      .catch((e) => {
        console.log(e);
        logContext.setError('Something went wrong while fetching your tasks');
        setLoadingTasks(false);
      });
  }, [authContext.token]);

  useEffect(() => {
    setLoadingTasks(true);
    const deepCopy = [...tasks];

    setSortedTasks(deepCopy.sort((a, b) => {

      if (sort == 'p') {
        return b.priority - a.priority;
      }
      else if (sort == 'd') {
        if (!a.due) {
          return 1;
        }

        if (!b.due) {
          return -1;
        }

        return new Date(a.due) - new Date(b.due);
      }
      else {
        return a.id - b.id;
      }

    }));

    setLoadingTasks(false);

  }, [tasks, sort]);

  return (
    <TaskContext.Provider value={{
      tasks: sortedTasks,
      sort,
      loadingTasks,
      setSort,
      setTasks,
      setLoadingTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );

};

// == prototyping == //

TaskContextProvider.propTypes = {
  children: PropTypes.any
};

// == export == //

export default TaskContext;
export {
  TaskContextProvider
};
