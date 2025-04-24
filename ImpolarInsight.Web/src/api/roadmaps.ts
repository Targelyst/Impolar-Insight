import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a roadmap by ID
const getRoadmapQuery = graphql(/* GraphQL */ `
  query getRoadmap($id: UUID!) {
    roadmap(id: $id) {
      id
      name
      url
      color
      icon
      index
      display
      roadmapCollectionId
      posts {
        id
        title
        slug
        slugId
      }
    }
  }
`);

// Get a roadmap by URL
const getRoadmapByUrlQuery = graphql(/* GraphQL */ `
  query getRoadmapByUrl($url: String!) {
    roadmapByUrl(url: $url) {
      id
      name
      url
      color
      icon
      index
      display
      roadmapCollectionId
      posts {
        id
        title
        slug
        slugId
      }
    }
  }
`);

// Get all roadmaps with pagination
const getRoadmapsQuery = graphql(/* GraphQL */ `
  query getRoadmaps($first: Int, $after: String, $displayOnly: Boolean) {
    roadmaps(first: $first, after: $after, displayOnly: $displayOnly) {
      edges {
        cursor
        node {
          id
          name
          url
          color
          icon
          index
          display
          roadmapCollectionId
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

// Get roadmaps by collection ID
const getRoadmapsByCollectionQuery = graphql(/* GraphQL */ `
  query getRoadmapsByCollection($collectionId: UUID!, $first: Int, $after: String, $displayOnly: Boolean) {
    roadmapsByCollection(collectionId: $collectionId, first: $first, after: $after, displayOnly: $displayOnly) {
      edges {
        cursor
        node {
          id
          name
          url
          color
          icon
          index
          display
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

export function useGetRoadmapQuery(id: string) {
  return useQuery({
    query: getRoadmapQuery,
    variables: { id },
  });
}

export function useGetRoadmapByUrlQuery(url: string) {
  return useQuery({
    query: getRoadmapByUrlQuery,
    variables: { url },
  });
}

export function useGetRoadmapsQuery(options?: { 
  first?: number, 
  after?: string, 
  displayOnly?: boolean 
}) {
  return useQuery({
    query: getRoadmapsQuery,
    variables: options,
  });
}

export function useGetRoadmapsByCollectionQuery(
  collectionId: string, 
  options?: { 
    first?: number, 
    after?: string, 
    displayOnly?: boolean 
  }
) {
  return useQuery({
    query: getRoadmapsByCollectionQuery,
    variables: { collectionId, ...options },
  });
}