import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { IProjectTableFilters } from 'src/types/project';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';
import { upperFirst } from 'es-toolkit';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = {
  filters: any;
  totalResults: number;
  sx?: object;
};

export function ProjectTableFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters } = filters;

  const handleRemoveFilter = (key: string) => {
    updateFilters({ [key]: undefined });
  };

  const renderLabel = (key: string) => {
    switch (key) {
      case 'project_status':
        return 'Project status';
      default:
        return key;
    }
  };

  return (
    <Box sx={{ ...sx }}>
      <Stack
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        sx={{ typography: 'body2' }}
      >
        <Typography variant="subtitle2" sx={{ mr: 1 }}>
          {totalResults} results found
        </Typography>

        {Object.entries(currentFilters).map(([key, value]) => {
          if (!value) return null;

          return (
            <Chip
              key={key}
              label={`${renderLabel(key)}: ${value}`}
              size="small"
              onDelete={() => handleRemoveFilter(key)}
              deleteIcon={<Iconify icon="solar:close-circle-bold" />}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
