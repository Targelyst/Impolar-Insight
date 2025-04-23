import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a vote by ID
const getVoteQuery = graphql(/* GraphQL */ `
  query getVote($id: UUID!) {
    vote(id: $id) {
      id
      postId
      userId
    }
  }
`);

// Get all votes with pagination
const getVotesQuery = graphql(/* GraphQL */ `
  query getVotes($first: Int, $after: String) {
    votes(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          postId
          userId
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

// Get votes by post ID
const getVotesByPostQuery = graphql(/* GraphQL */ `
  query getVotesByPost($postId: UUID!, $first: Int, $after: String) {
    votesByPost(postId: $postId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          userId
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

// Get votes by user ID
const getVotesByUserQuery = graphql(/* GraphQL */ `
  query getVotesByUser($userId: UUID!, $first: Int, $after: String) {
    votesByUser(userId: $userId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          postId
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

export function useGetVoteQuery(id: string) {
  return useQuery({
    query: getVoteQuery,
    variables: { id },
  });
}

export function useGetVotesQuery(options?: { first?: number, after?: string }) {
  return useQuery({
    query: getVotesQuery,
    variables: options,
  });
}

export function useGetVotesByPostQuery(postId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getVotesByPostQuery,
    variables: { postId, ...options },
  });
}

export function useGetVotesByUserQuery(userId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getVotesByUserQuery,
    variables: { userId, ...options },
  });
}