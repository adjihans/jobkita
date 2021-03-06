import { gql } from "@apollo/client";

export const GET_JOB = gql`
  query Job($input: JobInput!) {
    job(input: $input) {
      company {
        name
        logoUrl
      }
      title
      description
      applyUrl
      postedAt
      tags {
        name
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      description
      applyUrl
      slug
      locationNames
      countries {
        name
      }
      cities {
        name
      }
      company {
        name
        logoUrl
        slug
      }
      tags {
        name
      }
      postedAt
      createdAt
      updatedAt
    }
  }
`;

export const POST_JOB = gql`
  mutation PostJob($input: PostJobInput!) {
    postJob(input: $input) {
      id
    }
  }
`;
