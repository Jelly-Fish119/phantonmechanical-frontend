import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { IClientTableFilters } from 'src/types/client';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import dayjs from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import { CLIENT_STATUS_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  filters: UseSetStateReturn<IClientTableFilters>;
};

export function ClientTableToolbar({ filters, onResetPage }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterStatus = useCallback(
    (event: SelectChangeEvent<string>) => {
      onResetPage();
      updateFilters({ status: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterAddress = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ address: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ email: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterPhoneNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ phoneNumber: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterCreatedAt = useCallback(
    (value: any) => {
      onResetPage();
      updateFilters({
        createdAt: value ? dayjs(value).format('YYYY-MM-DD') : undefined,
      });
    },
    [onResetPage, updateFilters]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          gap: 2,
          display: 'flex',
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-end', md: 'center' },
        }}
      >
        <Box
          sx={{
            gap: 2,
            width: 1,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box width={200} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}></Box>
          <TextField
            value={currentFilters.name}
            onChange={handleFilterName}
            placeholder="Search by name..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            sx={{ width: 400 }}
            value={currentFilters.address}
            onChange={handleFilterAddress}
            placeholder="Search by address..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            value={currentFilters.email}
            onChange={handleFilterEmail}
            placeholder="Search by email..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            sx={{ width: 180 }}
            value={currentFilters.phoneNumber}
            onChange={handleFilterPhoneNumber}
            placeholder="Search by phone number..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <DatePicker
            sx={{ width: 150 }}
            value={currentFilters.createdAt ? dayjs(currentFilters.createdAt) : null}
            onChange={handleFilterCreatedAt}
          />

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="filter-status-select">Status</InputLabel>
            <Select
              labelId="filter-status-select"
              id="filter-status-select"
              value={currentFilters.status}
              onChange={handleFilterStatus}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) => selected}
              inputProps={{ id: 'filter-status-select' }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
            >
              {CLIENT_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Box>

      {renderMenuActions()}
    </>
  );
}
