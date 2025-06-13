import { CONFIG } from 'src/global-config';

import { ProjectListView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

const metadata = { title: `Ongoing projects | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ProjectListView />
    </>
  );
}
