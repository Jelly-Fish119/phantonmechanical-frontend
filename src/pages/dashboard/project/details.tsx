import { useParams } from 'src/routes/hooks';
// import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';
import { useGetProduct } from 'src/actions/product';

import { ProjectDetailsView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product details | Dashboard - ${CONFIG.appName}` };

export default function ProjectDetailsPage() {
  return (
    <>
      {/* <Helmet> */}
      <title>Project: Details</title>
      {/* </Helmet> */}

      <ProjectDetailsView />
    </>
  );
}
