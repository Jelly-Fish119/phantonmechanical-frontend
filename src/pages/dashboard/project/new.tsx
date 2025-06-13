import { CONFIG } from 'src/global-config';

import { ProjectCreateView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new project | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ProjectCreateView />
    </>
  );
}
