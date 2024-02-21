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

interface PdfLinkProps extends PropsWithChildren {
  /** Name of the PDF file. Including the file extension in the name is optional. */
  filename: string;
}

/**
 * Link to a PDF that exists in the content directory.
 * Supply the name of the file (file extension is optional)
 * in the filename prop.
 */
export const PdfLink: React.FC<PdfLinkProps> = ({ filename, children }) => {
  const data = useStaticQuery<Result>(graphql`
    {
      allFile(filter: { extension: { eq: "pdf" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `);

  const pdfEdge = data.allFile.edges.find((d) => d.node.name === filename || `${d.node.name}.pdf` === filename);
  const pdf = pdfEdge?.node;
  
  return (
    <a href={pdf?.publicURL} target='_blank'>
      {children}
    </a>
  );
}