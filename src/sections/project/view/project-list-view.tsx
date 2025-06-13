import type {
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';
// import type { IProductItem, IProductTableFilters } from 'src/types/product';
import type { IProjectItem, IProjectTableFilters } from 'src/types/project';

import { useBoolean, useSetState } from 'minimal-shared/hooks';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProjects } from 'src/actions/project';
import { DashboardContent } from 'src/layouts/dashboard';
import { PROJECT_TYPE_OPTIONS, PROJECT_STATUS_OPTIONS } from 'src/_mock/_project';
// import { useGetProducts } from 'src/actions/product';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useToolbarSettings, CustomGridActionsCellItem } from 'src/components/custom-data-grid';

// import { ProductTableToolbar } from '../product-table-toolbar';
import { ProjectTableToolbar } from '../project-table-toolbar';
import {
  RenderCellProject,
  RenderCellProjectType,
  RenderCellProjectStatus,
  RenderCellCreatedAt,
  RenderCellHourlyRate,
} from '../project-table-row';

// ----------------------------------------------------------------------

const HIDE_COLUMNS = { category: false };
const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProjectListView() {
  const confirmDialog = useBoolean();
  const toolbarOptions = useToolbarSettings();
  const { projects, projectsLoading } = useGetProjects();

  const [tableData, setTableData] = useState<IProjectItem[]>(projects);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  const filters = useSetState<IProjectTableFilters>({
    project_status: [],
    project_type: [],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    setTableData(projects);
  }, [projects]);

  const canReset = filters.state.project_status.length > 0;

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const handleDeleteRow = useCallback((id: string) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
    toast.success('Delete success!');
  }, []);

  const handleDeleteRows = useCallback(() => {
    setTableData((prev) => prev.filter((row) => !selectedRows.ids.has(row.id)));
    toast.success('Delete success!');
  }, [selectedRows.ids]);

  const columns = useGetColumns({ onDeleteRow: handleDeleteRow });

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {selectedRows.ids.size} </strong> items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Project', href: paths.dashboard.product.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            minHeight: 640,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: '1px' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            {...toolbarOptions.settings}
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={projectsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 20, { value: -1, label: 'All' }]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRows(newSelectionModel)}
            slots={{
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
              toolbar: () => (
                <ProjectTableToolbar
                  filters={filters}
                  canReset={canReset}
                  filteredResults={dataFiltered.length}
                  selectedRowCount={selectedRows.ids.size}
                  onOpenConfirmDeleteRows={confirmDialog.onTrue}
                  options={{
                    project_type: PROJECT_TYPE_OPTIONS,
                    project_status: PROJECT_STATUS_OPTIONS,
                  }}
                  /********/
                  settings={toolbarOptions.settings}
                  onChangeSettings={toolbarOptions.onChangeSettings}
                />
              ),
            }}
            slotProps={{
              columnsManagement: {
                getTogglableColumns: () =>
                  columns
                    .filter((col) => !HIDE_COLUMNS_TOGGLABLE.includes(col.field))
                    .map((col) => col.field),
              },
            }}
            sx={{
              [`& .${gridClasses.cell}`]: {
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type UseGetColumnsProps = {
  onDeleteRow: (id: string) => void;
};

const useGetColumns = ({ onDeleteRow }: UseGetColumnsProps) => {
  const theme = useTheme();

  const columns: GridColDef[] = useMemo(
    () => [
      //   {
      //     field: 'category',
      //     headerName: 'Category',
      //     filterable: false,
      //   },
      {
        field: 'name',
        headerName: 'Project',
        flex: 1,
        minWidth: 360,
        hideable: false,
        renderCell: (params) => (
          <RenderCellProject
            params={params}
            href={paths.dashboard.product.details(params.row.id)}
          />
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Create at',
        width: 160,
        renderCell: (params) => <RenderCellCreatedAt params={params} />,
      },
      {
        field: 'inventoryType',
        headerName: 'Stock',
        width: 160,
        type: 'singleSelect',
        filterable: false,
        valueOptions: PROJECT_STATUS_OPTIONS,
        renderCell: (params) => <RenderCellProjectStatus params={params} />,
      },
      {
        field: 'hourly_rate',
        headerName: 'Hourly rate',
        width: 120,
        editable: true,
        renderCell: (params) => <RenderCellHourlyRate params={params} />,
      },
      {
        field: 'publish',
        headerName: 'Publish',
        width: 120,
        type: 'singleSelect',
        editable: true,
        filterable: false,
        valueOptions: PROJECT_TYPE_OPTIONS,
        renderCell: (params) => <RenderCellProjectType params={params} />,
      },
      {
        type: 'actions',
        field: 'actions',
        headerName: ' ',
        width: 64,
        align: 'right',
        headerAlign: 'right',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        getActions: (params) => [
          <CustomGridActionsCellItem
            showInMenu
            label="View"
            icon={<Iconify icon="solar:eye-bold" />}
            href={paths.dashboard.product.details(params.row.id)}
          />,
          <CustomGridActionsCellItem
            showInMenu
            label="Edit"
            icon={<Iconify icon="solar:pen-bold" />}
            href={paths.dashboard.product.edit(params.row.id)}
          />,
          <CustomGridActionsCellItem
            showInMenu
            label="Delete"
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={() => onDeleteRow(params.row.id)}
            style={{ color: theme.vars.palette.error.main }}
          />,
        ],
      },
    ],
    [onDeleteRow, theme.vars.palette.error.main]
  );

  return columns;
};

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IProjectItem[];
  filters: IProjectTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { project_status } = filters;

  if (project_status.length) {
    inputData = inputData.filter((project) => project_status.includes(project.project_status));
  }

  if (project_status.length) {
    inputData = inputData.filter((project) =>
      project.project_status.includes(project.project_status)
    );
  }

  return inputData;
}
