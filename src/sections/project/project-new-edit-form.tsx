import type { IProjectItem } from 'src/types/project';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { _tags, PROJECT_STATUS_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewProjectSchemaType = zod.infer<typeof NewProjectSchema>;

export const NewProjectSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  client_information: zod.string().min(1, { message: 'Client information is required!' }),
  project_information: zod.string().min(1, { message: 'Project information is required!' }),
  project_status: zod.string().min(1, { message: 'Project status is required!' }),
  project_type: zod.string().min(1, { message: 'Project type is required!' }),
  project_start_date: zod.string().min(1, { message: 'Project start date is required!' }),
  project_end_date: zod.string().min(1, { message: 'Project end date is required!' }),
  project_budget: zod.number().min(1, { message: 'Project budget is required!' }),
  hourly_rate: zod.number().min(1, { message: 'Hourly rate is required!' }),
  // Not required
  images: zod.array(zod.instanceof(File)).optional(),
  description: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  currentProject?: IProjectItem;
};

export function ProjectNewEditForm({ currentProject }: Props) {
  const router = useRouter();

  const openDetails = useBoolean(true);
  const openProperties = useBoolean(true);
  const openPricing = useBoolean(true);

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues: NewProjectSchemaType = {
    name: '',
    client_information: '',
    project_information: '',
    project_status: '',
    project_type: '',
    project_start_date: '',
    project_end_date: '',
    project_budget: 0,
    hourly_rate: 0,
    description: '',
    images: [],
  };

  const methods = useForm<NewProjectSchemaType>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues,
    values: currentProject,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {
      ...data,
      // taxes: includeTaxes ? defaultValues.taxes : data.taxes,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProject ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.project.root);
      console.info('DATA', updatedData);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('description', '', { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderCollapseButton = (value: boolean, onToggle: () => void) => (
    <IconButton onClick={onToggle}>
      <Iconify icon={value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} />
    </IconButton>
  );

  const renderDetails = () => (
    <Card>
      <CardHeader
        title="Details"
        subheader="Title, short description, image..."
        action={renderCollapseButton(openDetails.value, openDetails.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openDetails.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Field.Text name="name" label="Project name" />

          <Field.Text name="subDescription" label="Sub description" multiline rows={4} />

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Content</Typography>
            <Field.Editor name="description" sx={{ maxHeight: 480 }} />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Images</Typography>
            <Field.Upload
              multiple
              thumbnail
              name="images"
              maxSize={3145728}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Card>
  );

  const renderProperties = () => (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        action={renderCollapseButton(openProperties.value, openProperties.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openProperties.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Box sx={{ rowGap: 3, columnGap: 2, display: 'grid' }}>
            <Field.Text name="client_information" label="Client contact information" />
            <Field.Text name="project_information" label="Project information" />
            <Field.Select name="project_status" label="Project status">
              {PROJECT_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name="project_type" label="Project type" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Field.DatePicker
                name="project_start_date"
                label="Project start date"
                slotProps={{
                  textField: { size: 'medium' },
                }}
              />
              <Field.DatePicker
                name="project_end_date"
                label="Project end date"
                slotProps={{
                  textField: { size: 'medium' },
                }}
              />
            </Box>
            {/* <Field.Text name="project_budget" label="Project budget" /> */}
          </Box>

          {/* <Field.Text name="cost" label="Cost" /> */}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>
      </Collapse>
    </Card>
  );

  const renderPricing = () => (
    <Card>
      <CardHeader
        title="Cost"
        subheader="Cost related inputs"
        action={renderCollapseButton(openPricing.value, openPricing.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openPricing.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Box
            sx={{ rowGap: 3, columnGap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
          >
            <Field.Text
              name="project_budget"
              label="Project budget"
              placeholder="0.00"
              type="number"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0.75 }}>
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Field.Text
              name="hourly_rate"
              label="Hourly rate"
              placeholder="0.00"
              type="number"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0.75 }}>
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 0.75 }}>
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        /hr
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* <FormControlLabel
            control={
              <Switch
                id="toggle-taxes"
                checked={includeTaxes}
                onChange={handleChangeIncludeTaxes}
              />
            }
            label="Price includes taxes"
          /> */}

          {/* {!includeTaxes && (
            <Field.Text
              name="taxes"
              label="Tax (%)"
              placeholder="0.00"
              type="number"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0.75 }}>
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        %
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )} */}
        </Stack>
      </Collapse>
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <FormControlLabel
        label="Publish"
        control={<Switch defaultChecked slotProps={{ input: { id: 'publish-switch' } }} />}
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProject ? 'Create project' : 'Save changes'}
      </Button>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderPricing()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
