import React from 'react';
import MediaContainer from "../../../Components/Media/MediaContainer";
import Layout from "../../../Components/Common/layout";
import ProjectLayout from '../../../Components/Common/ProjectLayout';

const Media = () => {
  return (
    <Layout>
      <ProjectLayout activePage={'media'}>
        <MediaContainer />
      </ProjectLayout>
    </Layout>
  );
};;;

export default Media;