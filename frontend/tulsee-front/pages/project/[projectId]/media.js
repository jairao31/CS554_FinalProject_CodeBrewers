import React from 'react';
import MediaContainer from "../../../Components/Media/MediaContainer";
import Layout from "../../../Components/Common/layout";
import TopNavBar from "../../../Components/Common/TopNavBar";

const Media = () => {
  return (
    <Layout>
      <TopNavBar activePage="media" title={"Project Name"} />
      <MediaContainer />
    </Layout>
  );
};;;

export default Media;