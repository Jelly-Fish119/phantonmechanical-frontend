import { CONFIG } from 'src/global-config';

import { ClientCreateView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new client | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ClientCreateView />
    </>
  );
}
