import type { SWRConfiguration } from 'swr';
import type { IProjectItem } from 'src/types/project';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type ProjectsData = {
  projects: IProjectItem[];
};

export function useGetProjects() {
  const url = endpoints.project.list;

  const { data, isLoading, error, isValidating } = useSWR<ProjectsData>(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      projects: data?.projects || [],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !isValidating && !data?.projects.length,
    }),
    [data?.projects, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type ProjectData = {
  project: IProjectItem;
};

export function useGetProject(projectId: string) {
  const url = projectId ? [endpoints.project.details, { params: { projectId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<ProjectData>(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      project: data?.project,
      projectLoading: isLoading,
      projectError: error,
      projectValidating: isValidating,
    }),
    [data?.project, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IProjectItem[];
};

export function useSearchProjects(query: string) {
  const url = query ? [endpoints.project.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
