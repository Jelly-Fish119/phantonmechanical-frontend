import { CONFIG } from 'src/global-config';

import { ClientListView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

const metadata = { title: `Clients list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ClientListView />
    </>
  );
}
