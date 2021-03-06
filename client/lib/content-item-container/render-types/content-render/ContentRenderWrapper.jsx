import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypes } from 'constants/slideViewTypes';
import { contentItemShape } from 'constants/propTypeShapes';
import { directions } from 'constants/directions';

import makeContentItemEditable from '../../higher-order-components/makeContentItemEditable';

const directionsMenu = {
  [directions.UP]: 'Up',
  [directions.RIGHT]: 'Right',
  [directions.LEFT]: 'Left',
  [directions.DOWN]: 'Down',
};

function ContentRenderWrapper(props) {
  const contentItem = props.contentItem;
  const cssClass = 'c_slide-content-view-item';
  const cssClasses = [
    `${cssClass}`,
    `${cssClass}--type-${contentItem.contentItemType.toLowerCase().replace('_', '-')}`,
  ];

  return (
    <div className={cssClasses.join(' ')}>
      <div className={`${cssClass}__wrapper`}>
        <div className={`${cssClass}__type-indicator`}>
          <span className={`${cssClass}__type-indicator__wrapper`}>
            {contentItem.contentItemType.name}
          </span>
        </div>
        <div className={`${cssClass}__content`}>
          <div
            className={`${cssClass}__content-item ${cssClass}__content-item--text`}
          >
            {props.children}
          </div>
          <div
            className={`${cssClass}__content-item ${cssClass}__content-item--options`}
          >
            <div className={`${cssClass}__options`}>
              <div className={`${cssClass}__options__wrapper`}>
                <div
                  className={`${cssClass}__options-item ${cssClass}__options-item--on-slide-checkbox`}
                >
                  <label className="o_view-type-switcher" title="Display on slide">
                    <input
                      className="o_view-type-switcher__input"
                      type="checkbox"
                      checked={contentItem.viewType === slideViewTypes.LIVE}
                      onChange={props.onToggleContentItemViewType}
                      tabIndex="-1"
                    />
                    <span className="o_view-type-switcher__text">
                      <span className="o_view-type-switcher__text__wrapper">
                        Display on slide
                      </span>
                    </span>
                  </label>
                </div>
                <div
                  className={`${cssClass}__options-item ${cssClass}__options-item--direction-menu`}
                >
                  <menu className="o_direction-menu">
                    {Object.keys(directionsMenu).map(direction => (
                      <li className="o_direction-menu__item" key={direction}>
                        <button
                          className={`o_direction-menu__button o_direction-menu__button--${direction.toLowerCase()}`}
                          tabIndex="-1"
                          onClick={() => props.onMoveContentItemInDirection(direction)}
                        >
                          <span className="o_direction-menu__button__wrapper">
                            {directionsMenu[direction]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ContentRenderWrapper.propTypes = {
  contentItem: PropTypes.shape(contentItemShape).isRequired,
  children: PropTypes.node.isRequired,
  onMoveContentItemInDirection: PropTypes.func.isRequired,
  onToggleContentItemViewType: PropTypes.func.isRequired,
};

export default makeContentItemEditable({})(ContentRenderWrapper);
