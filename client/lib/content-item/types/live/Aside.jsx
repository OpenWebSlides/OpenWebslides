import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Aside(props) {
  const { contentItem } = props;

  return (
    <aside {...props.attributes}>
      {contentItem.childItemIds.map(id => (
        <ContentItemContainer
          key={id}
          slideViewType={props.slideViewType}
          contentItemId={id}
          ancestorItemIds={props.ancestorItemIds.concat(props.contentItem.id)}
          slideId={props.slideId}
          editable={props.editable}
          headingLevel={props.headingLevel + 1}
        />
      ))}
    </aside>
  );
}
