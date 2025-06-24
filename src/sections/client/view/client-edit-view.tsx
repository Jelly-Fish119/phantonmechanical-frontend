import type { IUserItem } from 'src/types/user';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClientNewEditForm } from '../client-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  user?: IUserItem;
};

export function ClientEditView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.user.list}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Client', href: paths.dashboard.client.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ClientNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
