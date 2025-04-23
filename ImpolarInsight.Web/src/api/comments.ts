import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a comment by ID
const getCommentQuery = graphql(/* GraphQL */ `
  query getComment($id: UUID!) {
    comment(id: $id) {
      id
      body
      activityId
      isEdited
      isInternal
      isSpam
      parentId
      parent {
        id
        body
      }
    }
  }
`);

// Get all comments with pagination
const getCommentsQuery = graphql(/* GraphQL */ `
  query getComments($first: Int, $after: String) {
    comments(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          body
          activityId
          isEdited
          isInternal
          isSpam
          parentId
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

// Get comments by parent ID
const getCommentsByParentQuery = graphql(/* GraphQL */ `
  query getCommentsByParent($parentId: UUID!, $first: Int, $after: String) {
    commentsByParent(parentId: $parentId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          body
          activityId
          isEdited
          isInternal
          isSpam
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

export function useGetCommentQuery(id: string) {
  return useQuery({
    query: getCommentQuery,
    variables: { id },
  });
}

export function useGetCommentsQuery(options?: { first?: number, after?: string }) {
  return useQuery({
    query: getCommentsQuery,
    variables: options,
  });
}

export function useGetCommentsByParentQuery(parentId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getCommentsByParentQuery,
    variables: { parentId, ...options },
  });
}