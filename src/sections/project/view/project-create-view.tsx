import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProjectNewEditForm } from '../project-new-edit-form';

// ----------------------------------------------------------------------

export function ProjectCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new project"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Project', href: paths.dashboard.project.root },
          { name: 'New project' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProjectNewEditForm />
    </DashboardContent>
  );
}
