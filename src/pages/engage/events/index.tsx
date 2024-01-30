import { graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../../components/Seo';

/**
 * Redirect to /events/overview because there is no top-level /events page
 */
const EventsPage: React.FC = () => {
  // useEffect(() => {
  //   navigate('/engage/events/overview');
  // }, []);
  return <p>Events Test</p>;
};

// export const query = graphql`
//   query {
//     allMdx(sort: {frontmatter: {date: DESC}}) {
//       nodes {
//         id
//         frontmatter {
//           date(formatString: "MMMM D, YYYY")
//           title
//           slug
//         }
//         excerpt
//       }
//     }
//   }
// `;

export const Head = () => <Seo title="Events" />

export default EventsPage