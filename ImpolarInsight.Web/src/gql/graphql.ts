/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type Board = {
  __typename?: 'Board';
  color: Scalars['String']['output'];
  display: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  parentBoard?: Maybe<Board>;
  parentBoardId?: Maybe<Scalars['UUID']['output']>;
  posts: Array<Post>;
  subBoards: Array<Board>;
  tenant: Tenant;
  url: Scalars['String']['output'];
  viewVoters: Scalars['Boolean']['output'];
};

export type BoardFilterInput = {
  and?: InputMaybe<Array<BoardFilterInput>>;
  color?: InputMaybe<StringOperationFilterInput>;
  display?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BoardFilterInput>>;
  parentBoard?: InputMaybe<BoardFilterInput>;
  parentBoardId?: InputMaybe<UuidOperationFilterInput>;
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  subBoards?: InputMaybe<ListFilterInputTypeOfBoardFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
  viewVoters?: InputMaybe<BooleanOperationFilterInput>;
};

export type BoardSortInput = {
  color?: InputMaybe<SortEnumType>;
  display?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parentBoard?: InputMaybe<BoardSortInput>;
  parentBoardId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  url?: InputMaybe<SortEnumType>;
  viewVoters?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type BoardsConnection = {
  __typename?: 'BoardsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<BoardsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Board>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type BoardsEdge = {
  __typename?: 'BoardsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Board;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangelogItem = {
  __typename?: 'ChangelogItem';
  contentMarkdown?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isPublished: Scalars['Boolean']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  relatedPosts: Array<Post>;
  tenant: Tenant;
  title: Scalars['String']['output'];
};

export type ChangelogItemFilterInput = {
  and?: InputMaybe<Array<ChangelogItemFilterInput>>;
  contentMarkdown?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isPublished?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ChangelogItemFilterInput>>;
  publishedAt?: InputMaybe<DateTimeOperationFilterInput>;
  relatedPosts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type ChangelogItemSortInput = {
  contentMarkdown?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublished?: InputMaybe<SortEnumType>;
  publishedAt?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  title?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ChangelogItemsByPostConnection = {
  __typename?: 'ChangelogItemsByPostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChangelogItemsByPostEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ChangelogItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ChangelogItemsByPostEdge = {
  __typename?: 'ChangelogItemsByPostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ChangelogItem;
};

/** A connection to a list of items. */
export type ChangelogItemsConnection = {
  __typename?: 'ChangelogItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChangelogItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ChangelogItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ChangelogItemsEdge = {
  __typename?: 'ChangelogItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ChangelogItem;
};

export type Comment = {
  __typename?: 'Comment';
  activityId: Scalars['UUID']['output'];
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isEdited: Scalars['Boolean']['output'];
  isInternal: Scalars['Boolean']['output'];
  isSpam: Scalars['Boolean']['output'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  tenant: Tenant;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentFilterInput = {
  activityId?: InputMaybe<UuidOperationFilterInput>;
  and?: InputMaybe<Array<CommentFilterInput>>;
  body?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isEdited?: InputMaybe<BooleanOperationFilterInput>;
  isInternal?: InputMaybe<BooleanOperationFilterInput>;
  isSpam?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CommentFilterInput>>;
  parent?: InputMaybe<CommentFilterInput>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type CommentSortInput = {
  activityId?: InputMaybe<SortEnumType>;
  body?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isEdited?: InputMaybe<SortEnumType>;
  isInternal?: InputMaybe<SortEnumType>;
  isSpam?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<CommentSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CommentsByParentConnection = {
  __typename?: 'CommentsByParentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CommentsByParentEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Comment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CommentsByParentEdge = {
  __typename?: 'CommentsByParentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Comment;
};

/** A connection to a list of items. */
export type CommentsConnection = {
  __typename?: 'CommentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CommentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Comment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CommentsEdge = {
  __typename?: 'CommentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Comment;
};

export type CreateBoardInput = {
  color: Scalars['String']['input'];
  display?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  viewVoters?: Scalars['Boolean']['input'];
};

export type CreateCommentInput = {
  authorId: Scalars['UUID']['input'];
  body: Scalars['String']['input'];
  isInternal?: Scalars['Boolean']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  postId: Scalars['UUID']['input'];
};

export type CreatePostActivityInput = {
  authorId: Scalars['UUID']['input'];
  postId: Scalars['UUID']['input'];
  type: Scalars['String']['input'];
};

export type CreatePostInput = {
  boardId?: InputMaybe<Scalars['UUID']['input']>;
  contentMarkdown?: InputMaybe<Scalars['String']['input']>;
  roadmapId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type CreateRoadmapCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  display?: Scalars['Boolean']['input'];
  index?: Scalars['Int']['input'];
  isPublic?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateRoadmapInput = {
  color: Scalars['String']['input'];
  display?: Scalars['Boolean']['input'];
  index: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  roadmapCollectionId?: InputMaybe<Scalars['UUID']['input']>;
  url: Scalars['String']['input'];
};

export type CreateSiteSettingsInput = {
  accentColor?: InputMaybe<Scalars['String']['input']>;
  allowSignup?: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  developerMode?: Scalars['Boolean']['input'];
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isPoweredBy?: Scalars['Boolean']['input'];
  labs?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTenantInput = {
  domain: Scalars['String']['input'];
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  isBlocked?: Scalars['Boolean']['input'];
  isOwner?: Scalars['Boolean']['input'];
  isVerified?: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateVoteInput = {
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfBoardFilterInput = {
  all?: InputMaybe<BoardFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BoardFilterInput>;
  some?: InputMaybe<BoardFilterInput>;
};

export type ListFilterInputTypeOfChangelogItemFilterInput = {
  all?: InputMaybe<ChangelogItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ChangelogItemFilterInput>;
  some?: InputMaybe<ChangelogItemFilterInput>;
};

export type ListFilterInputTypeOfPostActivityFilterInput = {
  all?: InputMaybe<PostActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostActivityFilterInput>;
  some?: InputMaybe<PostActivityFilterInput>;
};

export type ListFilterInputTypeOfPostFilterInput = {
  all?: InputMaybe<PostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostFilterInput>;
  some?: InputMaybe<PostFilterInput>;
};

export type ListFilterInputTypeOfPostRoadmapHistoryFilterInput = {
  all?: InputMaybe<PostRoadmapHistoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostRoadmapHistoryFilterInput>;
  some?: InputMaybe<PostRoadmapHistoryFilterInput>;
};

export type ListFilterInputTypeOfRoadmapFilterInput = {
  all?: InputMaybe<RoadmapFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RoadmapFilterInput>;
  some?: InputMaybe<RoadmapFilterInput>;
};

export type ListFilterInputTypeOfSiteSettingsFilterInput = {
  all?: InputMaybe<SiteSettingsFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SiteSettingsFilterInput>;
  some?: InputMaybe<SiteSettingsFilterInput>;
};

export type ListFilterInputTypeOfVoteFilterInput = {
  all?: InputMaybe<VoteFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<VoteFilterInput>;
  some?: InputMaybe<VoteFilterInput>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  activities: Array<PostActivity>;
  board?: Maybe<Board>;
  boardId?: Maybe<Scalars['UUID']['output']>;
  contentMarkdown?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  relatedChangelogs: Array<ChangelogItem>;
  roadmap?: Maybe<Roadmap>;
  roadmapHistory: Array<PostRoadmapHistory>;
  roadmapId?: Maybe<Scalars['UUID']['output']>;
  slug: Scalars['String']['output'];
  slugId: Scalars['String']['output'];
  tenant: Tenant;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['UUID']['output'];
  votes: Array<Vote>;
};

/** A connection to a list of items. */
export type PostActivitiesByAuthorConnection = {
  __typename?: 'PostActivitiesByAuthorConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostActivitiesByAuthorEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostActivity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostActivitiesByAuthorEdge = {
  __typename?: 'PostActivitiesByAuthorEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostActivity;
};

/** A connection to a list of items. */
export type PostActivitiesByPostConnection = {
  __typename?: 'PostActivitiesByPostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostActivitiesByPostEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostActivity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostActivitiesByPostEdge = {
  __typename?: 'PostActivitiesByPostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostActivity;
};

/** A connection to a list of items. */
export type PostActivitiesConnection = {
  __typename?: 'PostActivitiesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostActivitiesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostActivity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostActivitiesEdge = {
  __typename?: 'PostActivitiesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostActivity;
};

export type PostActivity = {
  __typename?: 'PostActivity';
  authorId: Scalars['UUID']['output'];
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  postId: Scalars['UUID']['output'];
  tenant: Tenant;
  type: Scalars['String']['output'];
};

export type PostActivityFilterInput = {
  and?: InputMaybe<Array<PostActivityFilterInput>>;
  authorId?: InputMaybe<UuidOperationFilterInput>;
  comment?: InputMaybe<CommentFilterInput>;
  commentId?: InputMaybe<UuidOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<PostActivityFilterInput>>;
  postId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  type?: InputMaybe<StringOperationFilterInput>;
};

export type PostActivitySortInput = {
  authorId?: InputMaybe<SortEnumType>;
  comment?: InputMaybe<CommentSortInput>;
  commentId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  postId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  type?: InputMaybe<SortEnumType>;
};

export type PostFilterInput = {
  activities?: InputMaybe<ListFilterInputTypeOfPostActivityFilterInput>;
  and?: InputMaybe<Array<PostFilterInput>>;
  board?: InputMaybe<BoardFilterInput>;
  boardId?: InputMaybe<UuidOperationFilterInput>;
  contentMarkdown?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<PostFilterInput>>;
  relatedChangelogs?: InputMaybe<ListFilterInputTypeOfChangelogItemFilterInput>;
  roadmap?: InputMaybe<RoadmapFilterInput>;
  roadmapHistory?: InputMaybe<ListFilterInputTypeOfPostRoadmapHistoryFilterInput>;
  roadmapId?: InputMaybe<UuidOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
  slugId?: InputMaybe<StringOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  votes?: InputMaybe<ListFilterInputTypeOfVoteFilterInput>;
};

export type PostRoadmapHistory = {
  __typename?: 'PostRoadmapHistory';
  fromRoadmap?: Maybe<Roadmap>;
  fromRoadmapId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  movedAt: Scalars['DateTime']['output'];
  movedByUser?: Maybe<User>;
  movedByUserId?: Maybe<Scalars['UUID']['output']>;
  postId: Scalars['UUID']['output'];
  tenant: Tenant;
  toRoadmap?: Maybe<Roadmap>;
  toRoadmapId?: Maybe<Scalars['UUID']['output']>;
};

/** A connection to a list of items. */
export type PostRoadmapHistoryByPostConnection = {
  __typename?: 'PostRoadmapHistoryByPostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostRoadmapHistoryByPostEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostRoadmapHistory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostRoadmapHistoryByPostEdge = {
  __typename?: 'PostRoadmapHistoryByPostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostRoadmapHistory;
};

/** A connection to a list of items. */
export type PostRoadmapHistoryByRoadmapConnection = {
  __typename?: 'PostRoadmapHistoryByRoadmapConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostRoadmapHistoryByRoadmapEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostRoadmapHistory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostRoadmapHistoryByRoadmapEdge = {
  __typename?: 'PostRoadmapHistoryByRoadmapEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostRoadmapHistory;
};

/** A connection to a list of items. */
export type PostRoadmapHistoryConnection = {
  __typename?: 'PostRoadmapHistoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostRoadmapHistoryEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PostRoadmapHistory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostRoadmapHistoryEdge = {
  __typename?: 'PostRoadmapHistoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PostRoadmapHistory;
};

export type PostRoadmapHistoryFilterInput = {
  and?: InputMaybe<Array<PostRoadmapHistoryFilterInput>>;
  fromRoadmap?: InputMaybe<RoadmapFilterInput>;
  fromRoadmapId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  movedAt?: InputMaybe<DateTimeOperationFilterInput>;
  movedByUser?: InputMaybe<UserFilterInput>;
  movedByUserId?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<PostRoadmapHistoryFilterInput>>;
  postId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  toRoadmap?: InputMaybe<RoadmapFilterInput>;
  toRoadmapId?: InputMaybe<UuidOperationFilterInput>;
};

export type PostRoadmapHistorySortInput = {
  fromRoadmap?: InputMaybe<RoadmapSortInput>;
  fromRoadmapId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  movedAt?: InputMaybe<SortEnumType>;
  movedByUser?: InputMaybe<UserSortInput>;
  movedByUserId?: InputMaybe<SortEnumType>;
  postId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  toRoadmap?: InputMaybe<RoadmapSortInput>;
  toRoadmapId?: InputMaybe<SortEnumType>;
};

export type PostSortInput = {
  board?: InputMaybe<BoardSortInput>;
  boardId?: InputMaybe<SortEnumType>;
  contentMarkdown?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  roadmap?: InputMaybe<RoadmapSortInput>;
  roadmapId?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
  slugId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  title?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type PostsByBoardConnection = {
  __typename?: 'PostsByBoardConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostsByBoardEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostsByBoardEdge = {
  __typename?: 'PostsByBoardEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Post;
};

/** A connection to a list of items. */
export type PostsByRoadmapConnection = {
  __typename?: 'PostsByRoadmapConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostsByRoadmapEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostsByRoadmapEdge = {
  __typename?: 'PostsByRoadmapEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Post;
};

/** A connection to a list of items. */
export type PostsByUserConnection = {
  __typename?: 'PostsByUserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostsByUserEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostsByUserEdge = {
  __typename?: 'PostsByUserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Post;
};

/** A connection to a list of items. */
export type PostsConnection = {
  __typename?: 'PostsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PostsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostsEdge = {
  __typename?: 'PostsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boardByUrl?: Maybe<Board>;
  boards?: Maybe<BoardsConnection>;
  changelogItem?: Maybe<ChangelogItem>;
  changelogItems?: Maybe<ChangelogItemsConnection>;
  changelogItemsByPost?: Maybe<ChangelogItemsByPostConnection>;
  comment?: Maybe<Comment>;
  comments?: Maybe<CommentsConnection>;
  commentsByParent?: Maybe<CommentsByParentConnection>;
  post?: Maybe<Post>;
  postActivities?: Maybe<PostActivitiesConnection>;
  postActivitiesByAuthor?: Maybe<PostActivitiesByAuthorConnection>;
  postActivitiesByPost?: Maybe<PostActivitiesByPostConnection>;
  postActivity?: Maybe<PostActivity>;
  postBySlug?: Maybe<Post>;
  postRoadmapHistory?: Maybe<PostRoadmapHistoryConnection>;
  postRoadmapHistoryByPost?: Maybe<PostRoadmapHistoryByPostConnection>;
  postRoadmapHistoryByRoadmap?: Maybe<PostRoadmapHistoryByRoadmapConnection>;
  postRoadmapHistoryEntry?: Maybe<PostRoadmapHistory>;
  posts?: Maybe<PostsConnection>;
  postsByBoard?: Maybe<PostsByBoardConnection>;
  postsByRoadmap?: Maybe<PostsByRoadmapConnection>;
  postsByUser?: Maybe<PostsByUserConnection>;
  roadmap?: Maybe<Roadmap>;
  roadmapByUrl?: Maybe<Roadmap>;
  roadmapCollection?: Maybe<RoadmapCollection>;
  roadmapCollections?: Maybe<RoadmapCollectionsConnection>;
  roadmaps?: Maybe<RoadmapsConnection>;
  roadmapsByCollection?: Maybe<RoadmapsByCollectionConnection>;
  siteSettings?: Maybe<SiteSettings>;
  subBoards?: Maybe<SubBoardsConnection>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUsername?: Maybe<User>;
  users?: Maybe<UsersConnection>;
  vote?: Maybe<Vote>;
  votes?: Maybe<VotesConnection>;
  votesByPost?: Maybe<VotesByPostConnection>;
  votesByUser?: Maybe<VotesByUserConnection>;
};


export type QueryBoardArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryBoardByUrlArgs = {
  url: Scalars['String']['input'];
};


export type QueryBoardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BoardSortInput>>;
  rootOnly?: Scalars['Boolean']['input'];
  where?: InputMaybe<BoardFilterInput>;
};


export type QueryChangelogItemArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryChangelogItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ChangelogItemSortInput>>;
  publishedOnly?: Scalars['Boolean']['input'];
  where?: InputMaybe<ChangelogItemFilterInput>;
};


export type QueryChangelogItemsByPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ChangelogItemSortInput>>;
  postId: Scalars['UUID']['input'];
  publishedOnly?: Scalars['Boolean']['input'];
  where?: InputMaybe<ChangelogItemFilterInput>;
};


export type QueryCommentArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CommentSortInput>>;
  where?: InputMaybe<CommentFilterInput>;
};


export type QueryCommentsByParentArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CommentSortInput>>;
  parentId: Scalars['UUID']['input'];
  where?: InputMaybe<CommentFilterInput>;
};


export type QueryPostArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPostActivitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostActivitySortInput>>;
  where?: InputMaybe<PostActivityFilterInput>;
};


export type QueryPostActivitiesByAuthorArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  authorId: Scalars['UUID']['input'];
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostActivitySortInput>>;
  where?: InputMaybe<PostActivityFilterInput>;
};


export type QueryPostActivitiesByPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostActivitySortInput>>;
  postId: Scalars['UUID']['input'];
  where?: InputMaybe<PostActivityFilterInput>;
};


export type QueryPostActivityArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPostBySlugArgs = {
  slug: Scalars['String']['input'];
  slugId: Scalars['String']['input'];
};


export type QueryPostRoadmapHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostRoadmapHistorySortInput>>;
  where?: InputMaybe<PostRoadmapHistoryFilterInput>;
};


export type QueryPostRoadmapHistoryByPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostRoadmapHistorySortInput>>;
  postId: Scalars['UUID']['input'];
  where?: InputMaybe<PostRoadmapHistoryFilterInput>;
};


export type QueryPostRoadmapHistoryByRoadmapArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostRoadmapHistorySortInput>>;
  roadmapId: Scalars['UUID']['input'];
  where?: InputMaybe<PostRoadmapHistoryFilterInput>;
};


export type QueryPostRoadmapHistoryEntryArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostSortInput>>;
  where?: InputMaybe<PostFilterInput>;
};


export type QueryPostsByBoardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  boardId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostSortInput>>;
  where?: InputMaybe<PostFilterInput>;
};


export type QueryPostsByRoadmapArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostSortInput>>;
  roadmapId: Scalars['UUID']['input'];
  where?: InputMaybe<PostFilterInput>;
};


export type QueryPostsByUserArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PostSortInput>>;
  userId: Scalars['UUID']['input'];
  where?: InputMaybe<PostFilterInput>;
};


export type QueryRoadmapArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryRoadmapByUrlArgs = {
  url: Scalars['String']['input'];
};


export type QueryRoadmapCollectionArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryRoadmapCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoadmapCollectionSortInput>>;
  where?: InputMaybe<RoadmapCollectionFilterInput>;
};


export type QueryRoadmapsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoadmapSortInput>>;
  where?: InputMaybe<RoadmapFilterInput>;
};


export type QueryRoadmapsByCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  collectionId: Scalars['UUID']['input'];
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoadmapSortInput>>;
  where?: InputMaybe<RoadmapFilterInput>;
};


export type QuerySubBoardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BoardSortInput>>;
  parentId: Scalars['UUID']['input'];
  where?: InputMaybe<BoardFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryVoteArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryVotesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<VoteSortInput>>;
  where?: InputMaybe<VoteFilterInput>;
};


export type QueryVotesByPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<VoteSortInput>>;
  postId: Scalars['UUID']['input'];
  where?: InputMaybe<VoteFilterInput>;
};


export type QueryVotesByUserArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<VoteSortInput>>;
  userId: Scalars['UUID']['input'];
  where?: InputMaybe<VoteFilterInput>;
};

export type Roadmap = {
  __typename?: 'Roadmap';
  color: Scalars['String']['output'];
  display: Scalars['Boolean']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  postHistory: Array<PostRoadmapHistory>;
  posts: Array<Post>;
  roadmapCollection?: Maybe<RoadmapCollection>;
  roadmapCollectionId?: Maybe<Scalars['UUID']['output']>;
  tenant: Tenant;
  url: Scalars['String']['output'];
};

export type RoadmapCollection = {
  __typename?: 'RoadmapCollection';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  index: Scalars['Int']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  roadmaps: Array<Roadmap>;
  tenant: Tenant;
};

export type RoadmapCollectionFilterInput = {
  and?: InputMaybe<Array<RoadmapCollectionFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  index?: InputMaybe<IntOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoadmapCollectionFilterInput>>;
  roadmaps?: InputMaybe<ListFilterInputTypeOfRoadmapFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
};

export type RoadmapCollectionSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  index?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
};

/** A connection to a list of items. */
export type RoadmapCollectionsConnection = {
  __typename?: 'RoadmapCollectionsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RoadmapCollectionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RoadmapCollection>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RoadmapCollectionsEdge = {
  __typename?: 'RoadmapCollectionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RoadmapCollection;
};

export type RoadmapFilterInput = {
  and?: InputMaybe<Array<RoadmapFilterInput>>;
  color?: InputMaybe<StringOperationFilterInput>;
  display?: InputMaybe<BooleanOperationFilterInput>;
  icon?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  index?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoadmapFilterInput>>;
  postHistory?: InputMaybe<ListFilterInputTypeOfPostRoadmapHistoryFilterInput>;
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  roadmapCollection?: InputMaybe<RoadmapCollectionFilterInput>;
  roadmapCollectionId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type RoadmapSortInput = {
  color?: InputMaybe<SortEnumType>;
  display?: InputMaybe<SortEnumType>;
  icon?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  index?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  roadmapCollection?: InputMaybe<RoadmapCollectionSortInput>;
  roadmapCollectionId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  url?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type RoadmapsByCollectionConnection = {
  __typename?: 'RoadmapsByCollectionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RoadmapsByCollectionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Roadmap>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RoadmapsByCollectionEdge = {
  __typename?: 'RoadmapsByCollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Roadmap;
};

/** A connection to a list of items. */
export type RoadmapsConnection = {
  __typename?: 'RoadmapsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RoadmapsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Roadmap>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RoadmapsEdge = {
  __typename?: 'RoadmapsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Roadmap;
};

export type SiteSettings = {
  __typename?: 'SiteSettings';
  accentColor?: Maybe<Scalars['String']['output']>;
  allowSignup: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  developerMode: Scalars['Boolean']['output'];
  googleAnalyticsId?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isPoweredBy: Scalars['Boolean']['output'];
  labs: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  tenant: Tenant;
  theme: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type SiteSettingsFilterInput = {
  accentColor?: InputMaybe<StringOperationFilterInput>;
  allowSignup?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<SiteSettingsFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  developerMode?: InputMaybe<BooleanOperationFilterInput>;
  googleAnalyticsId?: InputMaybe<StringOperationFilterInput>;
  icon?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isPoweredBy?: InputMaybe<BooleanOperationFilterInput>;
  labs?: InputMaybe<StringOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SiteSettingsFilterInput>>;
  tenant?: InputMaybe<TenantFilterInput>;
  theme?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of items. */
export type SubBoardsConnection = {
  __typename?: 'SubBoardsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SubBoardsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Board>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SubBoardsEdge = {
  __typename?: 'SubBoardsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Board;
};

export type Tenant = {
  __typename?: 'Tenant';
  boards: Array<Board>;
  domain: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  siteSettings: Array<SiteSettings>;
};

export type TenantFilterInput = {
  and?: InputMaybe<Array<TenantFilterInput>>;
  boards?: InputMaybe<ListFilterInputTypeOfBoardFilterInput>;
  domain?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<TenantFilterInput>>;
  siteSettings?: InputMaybe<ListFilterInputTypeOfSiteSettingsFilterInput>;
};

export type TenantSortInput = {
  domain?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

export type UpdateBoardInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  viewVoters?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCommentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isSpam?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePostInput = {
  boardId?: InputMaybe<Scalars['UUID']['input']>;
  contentMarkdown?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  roadmapId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoadmapCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['UUID']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoadmapInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['UUID']['input'];
  index?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roadmapCollectionId?: InputMaybe<Scalars['UUID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSiteSettingsInput = {
  accentColor?: InputMaybe<Scalars['String']['input']>;
  allowSignup?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  developerMode?: InputMaybe<Scalars['Boolean']['input']>;
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isPoweredBy?: InputMaybe<Scalars['Boolean']['input']>;
  labs?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTenantInput = {
  domain?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  isOwner?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  isOwner: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  posts: Array<Post>;
  tenant: Tenant;
  username: Scalars['String']['output'];
  votes: Array<Vote>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  avatar?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isBlocked?: InputMaybe<BooleanOperationFilterInput>;
  isOwner?: InputMaybe<BooleanOperationFilterInput>;
  isVerified?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  password?: InputMaybe<StringOperationFilterInput>;
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
  votes?: InputMaybe<ListFilterInputTypeOfVoteFilterInput>;
};

export type UserSortInput = {
  avatar?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isBlocked?: InputMaybe<SortEnumType>;
  isOwner?: InputMaybe<SortEnumType>;
  isVerified?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  password?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  username?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  postId: Scalars['UUID']['output'];
  tenant: Tenant;
  userId: Scalars['UUID']['output'];
};

export type VoteFilterInput = {
  and?: InputMaybe<Array<VoteFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<VoteFilterInput>>;
  postId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type VoteSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  postId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type VotesByPostConnection = {
  __typename?: 'VotesByPostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<VotesByPostEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Vote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type VotesByPostEdge = {
  __typename?: 'VotesByPostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Vote;
};

/** A connection to a list of items. */
export type VotesByUserConnection = {
  __typename?: 'VotesByUserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<VotesByUserEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Vote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type VotesByUserEdge = {
  __typename?: 'VotesByUserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Vote;
};

/** A connection to a list of items. */
export type VotesConnection = {
  __typename?: 'VotesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<VotesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Vote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type VotesEdge = {
  __typename?: 'VotesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Vote;
};

export type GetBoardQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetBoardQuery = { __typename?: 'Query', board?: { __typename?: 'Board', id: any, name: string, url: string, color: string, display: boolean, viewVoters: boolean, parentBoardId?: any | null, posts: Array<{ __typename?: 'Post', id: any, title: string, slug: string, slugId: string }> } | null };

export type GetBoardByUrlQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetBoardByUrlQuery = { __typename?: 'Query', boardByUrl?: { __typename?: 'Board', id: any, name: string, url: string, color: string, display: boolean, viewVoters: boolean, parentBoardId?: any | null, posts: Array<{ __typename?: 'Post', id: any, title: string, slug: string, slugId: string }> } | null };

export type GetBoardsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetBoardsQuery = { __typename?: 'Query', boards?: { __typename?: 'BoardsConnection', totalCount: number, edges?: Array<{ __typename?: 'BoardsEdge', cursor: string, node: { __typename?: 'Board', id: any, name: string, url: string, color: string, display: boolean, viewVoters: boolean, parentBoardId?: any | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetChangelogItemQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetChangelogItemQuery = { __typename?: 'Query', changelogItem?: { __typename?: 'ChangelogItem', id: any, title: string, contentMarkdown?: string | null, isPublished: boolean, publishedAt?: any | null, relatedPosts: Array<{ __typename?: 'Post', id: any, title: string, slug: string, slugId: string }> } | null };

export type GetChangelogItemsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  publishedOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetChangelogItemsQuery = { __typename?: 'Query', changelogItems?: { __typename?: 'ChangelogItemsConnection', totalCount: number, edges?: Array<{ __typename?: 'ChangelogItemsEdge', cursor: string, node: { __typename?: 'ChangelogItem', id: any, title: string, contentMarkdown?: string | null, isPublished: boolean, publishedAt?: any | null, relatedPosts: Array<{ __typename?: 'Post', id: any, title: string }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetChangelogItemsByPostQueryVariables = Exact<{
  postId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  publishedOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetChangelogItemsByPostQuery = { __typename?: 'Query', changelogItemsByPost?: { __typename?: 'ChangelogItemsByPostConnection', totalCount: number, edges?: Array<{ __typename?: 'ChangelogItemsByPostEdge', cursor: string, node: { __typename?: 'ChangelogItem', id: any, title: string, contentMarkdown?: string | null, isPublished: boolean, publishedAt?: any | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetCommentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCommentQuery = { __typename?: 'Query', comment?: { __typename?: 'Comment', id: any, body: string, activityId: any, isEdited: boolean, isInternal: boolean, isSpam: boolean, parentId?: any | null, parent?: { __typename?: 'Comment', id: any, body: string } | null } | null };

export type GetCommentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentsConnection', totalCount: number, edges?: Array<{ __typename?: 'CommentsEdge', cursor: string, node: { __typename?: 'Comment', id: any, body: string, activityId: any, isEdited: boolean, isInternal: boolean, isSpam: boolean, parentId?: any | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetCommentsByParentQueryVariables = Exact<{
  parentId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCommentsByParentQuery = { __typename?: 'Query', commentsByParent?: { __typename?: 'CommentsByParentConnection', totalCount: number, edges?: Array<{ __typename?: 'CommentsByParentEdge', cursor: string, node: { __typename?: 'Comment', id: any, body: string, activityId: any, isEdited: boolean, isInternal: boolean, isSpam: boolean } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostActivityQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetPostActivityQuery = { __typename?: 'Query', postActivity?: { __typename?: 'PostActivity', id: any, type: string, authorId: any, postId: any, commentId?: any | null, comment?: { __typename?: 'Comment', id: any, body: string } | null } | null };

export type GetPostActivitiesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostActivitiesQuery = { __typename?: 'Query', postActivities?: { __typename?: 'PostActivitiesConnection', totalCount: number, edges?: Array<{ __typename?: 'PostActivitiesEdge', cursor: string, node: { __typename?: 'PostActivity', id: any, type: string, authorId: any, postId: any, commentId?: any | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostActivitiesByPostQueryVariables = Exact<{
  postId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostActivitiesByPostQuery = { __typename?: 'Query', postActivitiesByPost?: { __typename?: 'PostActivitiesByPostConnection', totalCount: number, edges?: Array<{ __typename?: 'PostActivitiesByPostEdge', cursor: string, node: { __typename?: 'PostActivity', id: any, type: string, authorId: any, commentId?: any | null, comment?: { __typename?: 'Comment', id: any, body: string, isInternal: boolean } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostActivitiesByAuthorQueryVariables = Exact<{
  authorId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostActivitiesByAuthorQuery = { __typename?: 'Query', postActivitiesByAuthor?: { __typename?: 'PostActivitiesByAuthorConnection', totalCount: number, edges?: Array<{ __typename?: 'PostActivitiesByAuthorEdge', cursor: string, node: { __typename?: 'PostActivity', id: any, type: string, postId: any, commentId?: any | null, comment?: { __typename?: 'Comment', id: any, body: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, contentMarkdown?: string | null, board?: { __typename?: 'Board', id: any, name: string } | null, roadmap?: { __typename?: 'Roadmap', id: any, name: string } | null, votes: Array<{ __typename?: 'Vote', id: any, userId: any }>, activities: Array<{ __typename?: 'PostActivity', id: any, type: string, authorId: any }> } | null };

export type GetPostBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  slugId: Scalars['String']['input'];
}>;


export type GetPostBySlugQuery = { __typename?: 'Query', postBySlug?: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, contentMarkdown?: string | null, board?: { __typename?: 'Board', id: any, name: string } | null, roadmap?: { __typename?: 'Roadmap', id: any, name: string } | null, votes: Array<{ __typename?: 'Vote', id: any, userId: any }>, activities: Array<{ __typename?: 'PostActivity', id: any, type: string, authorId: any }> } | null };

export type GetPostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostsConnection', totalCount: number, edges?: Array<{ __typename?: 'PostsEdge', cursor: string, node: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, votes: Array<{ __typename?: 'Vote', id: any }>, board?: { __typename?: 'Board', id: any, name: string } | null, roadmap?: { __typename?: 'Roadmap', id: any, name: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostsByBoardQueryVariables = Exact<{
  boardId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsByBoardQuery = { __typename?: 'Query', postsByBoard?: { __typename?: 'PostsByBoardConnection', totalCount: number, edges?: Array<{ __typename?: 'PostsByBoardEdge', cursor: string, node: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, contentMarkdown?: string | null, votes: Array<{ __typename?: 'Vote', id: any }>, roadmap?: { __typename?: 'Roadmap', id: any, name: string } | null, activities: Array<{ __typename?: 'PostActivity', id: any, type: string }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostsByRoadmapQueryVariables = Exact<{
  roadmapId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsByRoadmapQuery = { __typename?: 'Query', postsByRoadmap?: { __typename?: 'PostsByRoadmapConnection', totalCount: number, edges?: Array<{ __typename?: 'PostsByRoadmapEdge', cursor: string, node: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, votes: Array<{ __typename?: 'Vote', id: any }>, board?: { __typename?: 'Board', id: any, name: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetPostsByUserQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsByUserQuery = { __typename?: 'Query', postsByUser?: { __typename?: 'PostsByUserConnection', totalCount: number, edges?: Array<{ __typename?: 'PostsByUserEdge', cursor: string, node: { __typename?: 'Post', id: any, title: string, slug: string, slugId: string, votes: Array<{ __typename?: 'Vote', id: any }>, board?: { __typename?: 'Board', id: any, name: string } | null, roadmap?: { __typename?: 'Roadmap', id: any, name: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetRoadmapCollectionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRoadmapCollectionQuery = { __typename?: 'Query', roadmapCollection?: { __typename?: 'RoadmapCollection', id: any, name: string, description?: string | null, index: number, isPublic: boolean, roadmaps: Array<{ __typename?: 'Roadmap', id: any, name: string, url: string, color: string, index: number }> } | null };

export type GetRoadmapCollectionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRoadmapCollectionsQuery = { __typename?: 'Query', roadmapCollections?: { __typename?: 'RoadmapCollectionsConnection', totalCount: number, edges?: Array<{ __typename?: 'RoadmapCollectionsEdge', cursor: string, node: { __typename?: 'RoadmapCollection', id: any, name: string, description?: string | null, index: number, isPublic: boolean, roadmaps: Array<{ __typename?: 'Roadmap', id: any, name: string }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetRoadmapQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRoadmapQuery = { __typename?: 'Query', roadmap?: { __typename?: 'Roadmap', id: any, name: string, url: string, color: string, icon?: string | null, index: number, display: boolean, roadmapCollectionId?: any | null, posts: Array<{ __typename?: 'Post', id: any, title: string, slug: string, slugId: string }> } | null };

export type GetRoadmapByUrlQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type GetRoadmapByUrlQuery = { __typename?: 'Query', roadmapByUrl?: { __typename?: 'Roadmap', id: any, name: string, url: string, color: string, icon?: string | null, index: number, display: boolean, roadmapCollectionId?: any | null, posts: Array<{ __typename?: 'Post', id: any, title: string, slug: string, slugId: string }> } | null };

export type GetRoadmapsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetRoadmapsQuery = { __typename?: 'Query', roadmaps?: { __typename?: 'RoadmapsConnection', totalCount: number, edges?: Array<{ __typename?: 'RoadmapsEdge', cursor: string, node: { __typename?: 'Roadmap', id: any, name: string, url: string, color: string, icon?: string | null, index: number, display: boolean, roadmapCollectionId?: any | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetRoadmapsByCollectionQueryVariables = Exact<{
  collectionId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetRoadmapsByCollectionQuery = { __typename?: 'Query', roadmapsByCollection?: { __typename?: 'RoadmapsByCollectionConnection', totalCount: number, edges?: Array<{ __typename?: 'RoadmapsByCollectionEdge', cursor: string, node: { __typename?: 'Roadmap', id: any, name: string, url: string, color: string, icon?: string | null, index: number, display: boolean } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetSiteSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteSettingsQuery = { __typename?: 'Query', siteSettings?: { __typename?: 'SiteSettings', id: any, title?: string | null, description?: string | null, logo?: string | null, icon?: string | null, accentColor?: string | null, googleAnalyticsId?: string | null, isPoweredBy: boolean, allowSignup: boolean, developerMode: boolean, labs: string, theme: string } | null };

export type GetVoteQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetVoteQuery = { __typename?: 'Query', vote?: { __typename?: 'Vote', id: any, postId: any, userId: any } | null };

export type GetVotesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVotesQuery = { __typename?: 'Query', votes?: { __typename?: 'VotesConnection', totalCount: number, edges?: Array<{ __typename?: 'VotesEdge', cursor: string, node: { __typename?: 'Vote', id: any, postId: any, userId: any } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetVotesByPostQueryVariables = Exact<{
  postId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVotesByPostQuery = { __typename?: 'Query', votesByPost?: { __typename?: 'VotesByPostConnection', totalCount: number, edges?: Array<{ __typename?: 'VotesByPostEdge', cursor: string, node: { __typename?: 'Vote', id: any, userId: any } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetVotesByUserQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVotesByUserQuery = { __typename?: 'Query', votesByUser?: { __typename?: 'VotesByUserConnection', totalCount: number, edges?: Array<{ __typename?: 'VotesByUserEdge', cursor: string, node: { __typename?: 'Vote', id: any, postId: any } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


export const GetBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"viewVoters"}},{"kind":"Field","name":{"kind":"Name","value":"parentBoardId"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}}]}}]}}]}}]} as unknown as DocumentNode<GetBoardQuery, GetBoardQueryVariables>;
export const GetBoardByUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoardByUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardByUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"viewVoters"}},{"kind":"Field","name":{"kind":"Name","value":"parentBoardId"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}}]}}]}}]}}]} as unknown as DocumentNode<GetBoardByUrlQuery, GetBoardByUrlQueryVariables>;
export const GetBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBoards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"viewVoters"}},{"kind":"Field","name":{"kind":"Name","value":"parentBoardId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetChangelogItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChangelogItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changelogItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relatedPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}}]}}]}}]}}]} as unknown as DocumentNode<GetChangelogItemQuery, GetChangelogItemQueryVariables>;
export const GetChangelogItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChangelogItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publishedOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changelogItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"publishedOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publishedOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"relatedPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetChangelogItemsQuery, GetChangelogItemsQueryVariables>;
export const GetChangelogItemsByPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChangelogItemsByPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publishedOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changelogItemsByPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"publishedOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publishedOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetChangelogItemsByPostQuery, GetChangelogItemsByPostQueryVariables>;
export const GetCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"isSpam"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentQuery, GetCommentQueryVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"isSpam"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetCommentsByParentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCommentsByParent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentsByParent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"activityId"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}},{"kind":"Field","name":{"kind":"Name","value":"isSpam"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetCommentsByParentQuery, GetCommentsByParentQueryVariables>;
export const GetPostActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostActivityQuery, GetPostActivityQueryVariables>;
export const GetPostActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostActivitiesQuery, GetPostActivitiesQueryVariables>;
export const GetPostActivitiesByPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostActivitiesByPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postActivitiesByPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"isInternal"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostActivitiesByPostQuery, GetPostActivitiesByPostQueryVariables>;
export const GetPostActivitiesByAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostActivitiesByAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postActivitiesByAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostActivitiesByAuthorQuery, GetPostActivitiesByAuthorQueryVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const GetPostBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slugId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"slugId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slugId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostBySlugQuery, GetPostBySlugQueryVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsByBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsByBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsByBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"contentMarkdown"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostsByBoardQuery, GetPostsByBoardQueryVariables>;
export const GetPostsByRoadmapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsByRoadmap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roadmapId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsByRoadmap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roadmapId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roadmapId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostsByRoadmapQuery, GetPostsByRoadmapQueryVariables>;
export const GetPostsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostsByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPostsByUserQuery, GetPostsByUserQueryVariables>;
export const GetRoadmapCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmapCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmapCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"roadmaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoadmapCollectionQuery, GetRoadmapCollectionQueryVariables>;
export const GetRoadmapCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmapCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmapCollections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"roadmaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetRoadmapCollectionsQuery, GetRoadmapCollectionsQueryVariables>;
export const GetRoadmapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"roadmapCollectionId"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoadmapQuery, GetRoadmapQueryVariables>;
export const GetRoadmapByUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmapByUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmapByUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"roadmapCollectionId"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"slugId"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoadmapByUrlQuery, GetRoadmapByUrlQueryVariables>;
export const GetRoadmapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"roadmapCollectionId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetRoadmapsQuery, GetRoadmapsQueryVariables>;
export const GetRoadmapsByCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoadmapsByCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roadmapsByCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetRoadmapsByCollectionQuery, GetRoadmapsByCollectionQueryVariables>;
export const GetSiteSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSiteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"googleAnalyticsId"}},{"kind":"Field","name":{"kind":"Name","value":"isPoweredBy"}},{"kind":"Field","name":{"kind":"Name","value":"allowSignup"}},{"kind":"Field","name":{"kind":"Name","value":"developerMode"}},{"kind":"Field","name":{"kind":"Name","value":"labs"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<GetSiteSettingsQuery, GetSiteSettingsQueryVariables>;
export const GetVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<GetVoteQuery, GetVoteQueryVariables>;
export const GetVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetVotesQuery, GetVotesQueryVariables>;
export const GetVotesByPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVotesByPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votesByPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetVotesByPostQuery, GetVotesByPostQueryVariables>;
export const GetVotesByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVotesByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votesByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetVotesByUserQuery, GetVotesByUserQueryVariables>;