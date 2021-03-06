import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'presentationals/components/shared/PageHeader';
import Footer from 'presentationals/components/shared/Footer';

function DefaultLayout(props) {
  // Two different ways of providing page content:
  // 1) passing an array of child components; wrappers are autogenerated
  // 2) including JSX directly via props.children
  // (If an array of components is passed, props.children is ignored.)
  let layoutContent;
  if (Object.keys(props.components).length > 0) {
    layoutContent = (
      <main className="l_main">
        <div className="l_main__wrapper">
          {Object.keys(props.components).map(id => (
            <div className={`l_main__item l_main__item--${id}`} key={id}>
              <div className="l_main__item__wrapper">
                {props.components[id]}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  else {
    layoutContent = props.children;
  }

  return (
    <div
      className={`l_page l_page--${props.layoutIdentifier} l_page--id_${props.cssIdentifier}`}
    >
      <div className="l_page__wrapper">
        <div className="l_page__item l_page__item--header">
          <div className="l_page__item__wrapper">
            <PageHeader />
          </div>
        </div>
        <div className="l_page__item l_page__item--main">
          <div className="l_page__item__wrapper">
            {layoutContent}
          </div>
        </div>
        <div className="l_page__item l_page__item--footer">
          <div className="l_page__item__wrapper">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
  children: PropTypes.node,
  components: PropTypes.objectOf(PropTypes.element),
  layoutIdentifier: PropTypes.string.isRequired,
};

DefaultLayout.defaultProps = {
  children: null,
  components: {},
  layoutIdentifier: 'default',
};

export default DefaultLayout;
