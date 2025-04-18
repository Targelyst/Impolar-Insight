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
  posts: Array<Post>;
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
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
  viewVoters?: InputMaybe<BooleanOperationFilterInput>;
};

export type BoardSortInput = {
  color?: InputMaybe<SortEnumType>;
  display?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
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

export type Comment = {
  __typename?: 'Comment';
  activityId: Scalars['UUID']['output'];
  body: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isEdited: Scalars['Boolean']['output'];
  isInternal: Scalars['Boolean']['output'];
  isSpam: Scalars['Boolean']['output'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  tenant: Tenant;
};

export type CommentFilterInput = {
  activityId?: InputMaybe<UuidOperationFilterInput>;
  and?: InputMaybe<Array<CommentFilterInput>>;
  body?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isEdited?: InputMaybe<BooleanOperationFilterInput>;
  isInternal?: InputMaybe<BooleanOperationFilterInput>;
  isSpam?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CommentFilterInput>>;
  parent?: InputMaybe<CommentFilterInput>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
};

export type CommentSortInput = {
  activityId?: InputMaybe<SortEnumType>;
  body?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isEdited?: InputMaybe<SortEnumType>;
  isInternal?: InputMaybe<SortEnumType>;
  isSpam?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<CommentSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
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
  id: Scalars['UUID']['output'];
  roadmap?: Maybe<Roadmap>;
  roadmapId?: Maybe<Scalars['UUID']['output']>;
  slug: Scalars['String']['output'];
  slugId: Scalars['String']['output'];
  tenant: Tenant;
  title: Scalars['String']['output'];
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
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<PostFilterInput>>;
  roadmap?: InputMaybe<RoadmapFilterInput>;
  roadmapId?: InputMaybe<UuidOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
  slugId?: InputMaybe<StringOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  votes?: InputMaybe<ListFilterInputTypeOfVoteFilterInput>;
};

export type PostSortInput = {
  board?: InputMaybe<BoardSortInput>;
  boardId?: InputMaybe<SortEnumType>;
  contentMarkdown?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  roadmap?: InputMaybe<RoadmapSortInput>;
  roadmapId?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
  slugId?: InputMaybe<SortEnumType>;
  tenant?: InputMaybe<TenantSortInput>;
  title?: InputMaybe<SortEnumType>;
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
  comment?: Maybe<Comment>;
  comments?: Maybe<CommentsConnection>;
  commentsByParent?: Maybe<CommentsByParentConnection>;
  post?: Maybe<Post>;
  postActivities?: Maybe<PostActivitiesConnection>;
  postActivitiesByAuthor?: Maybe<PostActivitiesByAuthorConnection>;
  postActivitiesByPost?: Maybe<PostActivitiesByPostConnection>;
  postActivity?: Maybe<PostActivity>;
  postBySlug?: Maybe<Post>;
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
  where?: InputMaybe<BoardFilterInput>;
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
  displayOnly?: InputMaybe<Scalars['Boolean']['input']>;
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
  id: Scalars['UUID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  roadmapCollection?: Maybe<RoadmapCollection>;
  roadmapCollectionId?: Maybe<Scalars['UUID']['output']>;
  tenant: Tenant;
  url: Scalars['String']['output'];
};

export type RoadmapCollection = {
  __typename?: 'RoadmapCollection';
  description?: Maybe<Scalars['String']['output']>;
  display: Scalars['Boolean']['output'];
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
  display?: InputMaybe<BooleanOperationFilterInput>;
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
  display?: InputMaybe<SortEnumType>;
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
  id?: InputMaybe<UuidOperationFilterInput>;
  index?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoadmapFilterInput>>;
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  roadmapCollection?: InputMaybe<RoadmapCollectionFilterInput>;
  roadmapCollectionId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type RoadmapSortInput = {
  color?: InputMaybe<SortEnumType>;
  display?: InputMaybe<SortEnumType>;
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
  id: Scalars['UUID']['output'];
  postId: Scalars['UUID']['output'];
  tenant: Tenant;
  userId: Scalars['UUID']['output'];
};

export type VoteFilterInput = {
  and?: InputMaybe<Array<VoteFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<VoteFilterInput>>;
  postId?: InputMaybe<UuidOperationFilterInput>;
  tenant?: InputMaybe<TenantFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type VoteSortInput = {
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

export type GetSiteSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSiteSettingsQuery = { __typename?: 'Query', siteSettings?: { __typename?: 'SiteSettings', id: any, title?: string | null, description?: string | null, logo?: string | null, icon?: string | null, accentColor?: string | null, googleAnalyticsId?: string | null, isPoweredBy: boolean, allowSignup: boolean, developerMode: boolean, labs: string, theme: string } | null };


export const GetSiteSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSiteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"googleAnalyticsId"}},{"kind":"Field","name":{"kind":"Name","value":"isPoweredBy"}},{"kind":"Field","name":{"kind":"Name","value":"allowSignup"}},{"kind":"Field","name":{"kind":"Name","value":"developerMode"}},{"kind":"Field","name":{"kind":"Name","value":"labs"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<GetSiteSettingsQuery, GetSiteSettingsQueryVariables>;