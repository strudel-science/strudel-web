import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import { PropsWithChildren } from "react";

interface Result {
  allFile: {
    edges: {
      node: {
        publicURL: string;
        name: string;
      }
    }[]
  }
};

interface FileLinkProps extends PropsWithChildren {
  /** Name of the file. DO NOT include the file extension. */
  filename: string;
}

/**
 * Link to a file that exists in the content directory.
 * Supply the name of the file (WITHOUT the extension)
 * in the filename prop.
 */
export const FileLink: React.FC<FileLinkProps> = ({ filename, children }) => {
  const data = useStaticQuery<Result>(graphql`
    {
      allFile {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `);

  const fileEdge = data.allFile.edges.find((d) => d.node.name === filename);
  const file = fileEdge?.node;
  
  return (
    <a href={file?.publicURL} target='_blank'>
      {children}
    </a>
  );
}