import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a post activity by ID
const getPostActivityQuery = graphql(/* GraphQL */ `
  query getPostActivity($id: UUID!) {
    postActivity(id: $id) {
      id
      type
      authorId
      postId
      commentId
      comment {
        id
        body
      }
    }
  }
`);

// Get all post activities with pagination
const getPostActivitiesQuery = graphql(/* GraphQL */ `
  query getPostActivities($first: Int, $after: String) {
    postActivities(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          type
          authorId
          postId
          commentId
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`);

// Get post activities by post ID
const getPostActivitiesByPostQuery = graphql(/* GraphQL */ `
  query getPostActivitiesByPost($postId: UUID!, $first: Int, $after: String) {
    postActivitiesByPost(postId: $postId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          type
          authorId
          commentId
          comment {
            id
            body
            isInternal
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`);

// Get post activities by author ID
const getPostActivitiesByAuthorQuery = graphql(/* GraphQL */ `
  query getPostActivitiesByAuthor($authorId: UUID!, $first: Int, $after: String) {
    postActivitiesByAuthor(authorId: $authorId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          type
          postId
          commentId
          comment {
            id
            body
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`);

export function useGetPostActivityQuery(id: string) {
  return useQuery({
    query: getPostActivityQuery,
    variables: { id },
  });
}

export function useGetPostActivitiesQuery(options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostActivitiesQuery,
    variables: options,
  });
}

export function useGetPostActivitiesByPostQuery(postId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostActivitiesByPostQuery,
    variables: { postId, ...options },
  });
}

export function useGetPostActivitiesByAuthorQuery(authorId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostActivitiesByAuthorQuery,
    variables: { authorId, ...options },
  });
}