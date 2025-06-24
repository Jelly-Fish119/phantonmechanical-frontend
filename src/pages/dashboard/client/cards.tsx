import { CONFIG } from 'src/global-config';

import { ClientCardsView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

const metadata = { title: `User cards | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ClientCardsView />
    </>
  );
}
