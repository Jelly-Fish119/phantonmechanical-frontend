import { CONFIG } from 'src/global-config';

import { ClientProfileView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

const metadata = { title: `User profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ClientProfileView />
    </>
  );
}
