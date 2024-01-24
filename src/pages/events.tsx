import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../components/Seo';

/**
 * Redirect to /events/overview because there is no top-level /events page
 */
const EventsPage: React.FC = () => {
  useEffect(() => {
    navigate('/engage/events/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="Events" />

export default EventsPage