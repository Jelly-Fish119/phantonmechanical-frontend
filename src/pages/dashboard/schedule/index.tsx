import { CONFIG } from 'src/global-config';

import { ScheduleView } from 'src/sections/schedule/view';

// ----------------------------------------------------------------------

const metadata = { title: `Schedule | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ScheduleView />
    </>
  );
}
