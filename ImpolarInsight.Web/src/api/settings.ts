import { useQuery } from "urql";
import { graphql } from "../gql";
// import { useCallback, useEffect, useState } from "react";
// import type { Project } from "../gql/graphql";

// const allProjectsQuery = graphql(/* GraphQL */ `
//   query allProjects {
//     projects {
//       id
//       name
//     }
//   }
// `);

const getSiteSettingsQuery = graphql(/* GraphQL */ `
  query getSiteSettings {
	siteSettings {
		id
		title
		description
		logo
		icon
		accentColor
		googleAnalyticsId
		isPoweredBy
		allowSignup
		developerMode
		labs
		theme
	}
  }
`);

// export function useAvailableProjects() {
// 	return useQuery({
// 		query: allProjectsQuery,
// 	});
// }

export function useGetSiteSettingsQuery() {
	return useQuery({
		query: getSiteSettingsQuery,
	});
}

// export function useCurrentProject() {
// 	const [availableProjects] = useAvailableProjects();
// 	const [currentProject, setCurrentProjectInternal] = useState<Project>();

// 	const setCurrentProject = useCallback(
// 		(id: string) => {
// 			const newCurrentProject = availableProjects.data?.projects.find(
// 				(p) => p.id === id,
// 			);
// 			setCurrentProjectInternal(newCurrentProject);
// 		},
// 		[availableProjects],
// 	);

// 	useEffect(() => {
// 		if (
// 			currentProject === undefined &&
// 			availableProjects.data &&
// 			availableProjects.data.projects.length > 0
// 		) {
// 			setCurrentProjectInternal(availableProjects.data.projects[0]);
// 		}
// 	}, [availableProjects, currentProject]);

// 	return { currentProject, setCurrentProject };
// }
