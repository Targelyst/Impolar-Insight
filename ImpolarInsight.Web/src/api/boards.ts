import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a single board by ID
const getBoardQuery = graphql(/* GraphQL */ `
  query getBoard($id: UUID!) {
    board(id: $id) {
      id
      name
      url
      color
      display
      viewVoters
      parentBoardId
      posts {
        id
        title
        slug
        slugId
      }
    }
  }
`);

// Get a board by URL
const getBoardByUrlQuery = graphql(/* GraphQL */ `
  query getBoardByUrl($url: String!) {
    boardByUrl(url: $url) {
      id
      name
      url
      color
      display
      viewVoters
      parentBoardId
      posts {
        id
        title
        slug
        slugId
      }
    }
  }
`);

// Get all boards with pagination
const getBoardsQuery = graphql(/* GraphQL */ `
  query getBoards($first: Int, $after: String, $displayOnly: Boolean) {
    boards(first: $first, after: $after, displayOnly: $displayOnly) {
      edges {
        cursor
        node {
          id
          name
          url
          color
          display
          viewVoters
          parentBoardId
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

export function useGetBoardQuery(id: string) {
  return useQuery({
    query: getBoardQuery,
    variables: { id },
  });
}

export function useGetBoardByUrlQuery(url: string) {
  return useQuery({
    query: getBoardByUrlQuery,
    variables: { url },
  });
}

export function useGetBoardsQuery(options?: { 
  first?: number, 
  after?: string, 
  displayOnly?: boolean 
}) {
  return useQuery({
    query: getBoardsQuery,
    variables: options,
  });
}