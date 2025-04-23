import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a changelog item by ID
const getChangelogItemQuery = graphql(/* GraphQL */ `
  query getChangelogItem($id: UUID!) {
    changelogItem(id: $id) {
      id
      title
      contentMarkdown
      isPublished
      publishedAt
      relatedPosts {
        id
        title
        slug
        slugId
      }
    }
  }
`);

// Get all changelog items with pagination
const getChangelogItemsQuery = graphql(/* GraphQL */ `
  query getChangelogItems($first: Int, $after: String, $publishedOnly: Boolean) {
    changelogItems(first: $first, after: $after, publishedOnly: $publishedOnly) {
      edges {
        cursor
        node {
          id
          title
          contentMarkdown
          isPublished
          publishedAt
          relatedPosts {
            id
            title
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

// Get changelog items by post ID
const getChangelogItemsByPostQuery = graphql(/* GraphQL */ `
  query getChangelogItemsByPost($postId: UUID!, $first: Int, $after: String, $publishedOnly: Boolean) {
    changelogItemsByPost(postId: $postId, first: $first, after: $after, publishedOnly: $publishedOnly) {
      edges {
        cursor
        node {
          id
          title
          contentMarkdown
          isPublished
          publishedAt
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

export function useGetChangelogItemQuery(id: string) {
  return useQuery({
    query: getChangelogItemQuery,
    variables: { id },
  });
}

export function useGetChangelogItemsQuery(options?: { 
  first?: number, 
  after?: string, 
  publishedOnly?: boolean 
}) {
  return useQuery({
    query: getChangelogItemsQuery,
    variables: options,
  });
}

export function useGetChangelogItemsByPostQuery(
  postId: string, 
  options?: { 
    first?: number, 
    after?: string, 
    publishedOnly?: boolean 
  }
) {
  return useQuery({
    query: getChangelogItemsByPostQuery,
    variables: { postId, ...options },
  });
}