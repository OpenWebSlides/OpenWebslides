import React from 'react';

import DefaultLayout from 'presentationals/layouts/DefaultLayout';
import FeedContainer from 'containers/FeedContainer';
import DeckManagementContainer from 'containers/DeckManagementContainer';

function Dashboard() {
  return (
    <DefaultLayout
      cssIdentifier="feed"
      components={{
        feed: <FeedContainer />,
        deckManagement: <DeckManagementContainer />,
      }}
    />
  );
}

export default Dashboard;
