import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { IClientTableFilters } from 'src/types/client';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<IClientTableFilters>;
};

export function ClientTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveAddress = useCallback(() => {
    onResetPage();
    updateFilters({ address: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveEmail = useCallback(() => {
    onResetPage();
    updateFilters({ email: '' });
  }, [onResetPage, updateFilters]);

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={currentFilters.status !== 'all'}>
        <Chip
          {...chipProps}
          label={currentFilters.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Name:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>

      <FiltersBlock label="Address:" isShow={!!currentFilters.address}>
        <Chip {...chipProps} label={currentFilters.address} onDelete={handleRemoveAddress} />
      </FiltersBlock>

      <FiltersBlock label="Email:" isShow={!!currentFilters.email}>
        <Chip {...chipProps} label={currentFilters.email} onDelete={handleRemoveEmail} />
      </FiltersBlock>
    </FiltersResult>
  );
}
