import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a post by ID
const getPostQuery = graphql(/* GraphQL */ `
  query getPost($id: UUID!) {
    post(id: $id) {
      id
      title
      slug
      slugId
      contentMarkdown
      board {
        id
        name
      }
      roadmap {
        id
        name
      }
      votes {
        id
        userId
      }
      activities {
        id
        type
        authorId
      }
    }
  }
`);

// Get a post by slug and slugId
const getPostBySlugQuery = graphql(/* GraphQL */ `
  query getPostBySlug($slug: String!, $slugId: String!) {
    postBySlug(slug: $slug, slugId: $slugId) {
      id
      title
      slug
      slugId
      contentMarkdown
      board {
        id
        name
      }
      roadmap {
        id
        name
      }
      votes {
        id
        userId
      }
      activities {
        id
        type
        authorId
      }
    }
  }
`);

// Get all posts with pagination
const getPostsQuery = graphql(/* GraphQL */ `
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          slug
          slugId
          votes {
            id
          }
          board {
            id
            name
          }
          roadmap {
            id
            name
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

// Get posts by board ID
const getPostsByBoardQuery = graphql(/* GraphQL */ `
  query getPostsByBoard($boardId: UUID!, $first: Int, $after: String) {
    postsByBoard(boardId: $boardId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          slug
          slugId
          contentMarkdown
          votes {
            id
          }
          roadmap {
            id
            name
          }
          activities {
            id
            type
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

// Get posts by roadmap ID
const getPostsByRoadmapQuery = graphql(/* GraphQL */ `
  query getPostsByRoadmap($roadmapId: UUID!, $first: Int, $after: String) {
    postsByRoadmap(roadmapId: $roadmapId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          slug
          slugId
          votes {
            id
          }
          board {
            id
            name
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

// Get posts by user ID
const getPostsByUserQuery = graphql(/* GraphQL */ `
  query getPostsByUser($userId: UUID!, $first: Int, $after: String) {
    postsByUser(userId: $userId, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          slug
          slugId
          votes {
            id
          }
          board {
            id
            name
          }
          roadmap {
            id
            name
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

export function useGetPostQuery(id: string) {
  return useQuery({
    query: getPostQuery,
    variables: { id },
  });
}

export function useGetPostBySlugQuery(slug: string, slugId: string) {
  return useQuery({
    query: getPostBySlugQuery,
    variables: { slug, slugId },
  });
}

export function useGetPostsQuery(options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostsQuery,
    variables: options,
  });
}

export function useGetPostsByBoardQuery(boardId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostsByBoardQuery,
    variables: { boardId, ...options },
  });
}

export function useGetPostsByRoadmapQuery(roadmapId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostsByRoadmapQuery,
    variables: { roadmapId, ...options },
  });
}

export function useGetPostsByUserQuery(userId: string, options?: { first?: number, after?: string }) {
  return useQuery({
    query: getPostsByUserQuery,
    variables: { userId, ...options },
  });
}