import { useQuery } from "urql";
import { graphql } from "../gql";

// Get a roadmap collection by ID
const getRoadmapCollectionQuery = graphql(/* GraphQL */ `
  query getRoadmapCollection($id: UUID!) {
    roadmapCollection(id: $id) {
      id
      name
      description
      index
      isPublic
      roadmaps {
        id
        name
        url
        color
        index
      }
    }
  }
`);

// Get all roadmap collections with pagination
const getRoadmapCollectionsQuery = graphql(/* GraphQL */ `
  query getRoadmapCollections($first: Int, $after: String) {
    roadmapCollections(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          name
          description
          index
          isPublic
          roadmaps {
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

export function useGetRoadmapCollectionQuery(id: string) {
  return useQuery({
    query: getRoadmapCollectionQuery,
    variables: { id },
  });
}

export function useGetRoadmapCollectionsQuery(options?: { 
  first?: number, 
  after?: string, 
}) {
  return useQuery({
    query: getRoadmapCollectionsQuery,
    variables: options,
  });
}