import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../components/Seo';

/**
 * Redirect to /design-system/task-flows/overview because there is no top-level /design-system/task-flows page
 */
const TaskFlowsPage: React.FC = () => {
  useEffect(() => {
    navigate('/design-system/task-flows/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="Task Flows" />

export default TaskFlowsPage