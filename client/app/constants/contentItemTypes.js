// #TODO this doesn't work, probably because of a circular dependency; refactor
// import { slideViewTypes } from 'constants/slideViewTypes';

export const contentItemTypes = {
  TITLE: 'TITLE',
  PARAGRAPH: 'PARAGRAPH',
  LIST: 'LIST',
  LIST_ITEM: 'LIST_ITEM',
  ILLUSTRATIVE_IMAGE: 'ILLUSTRATIVE_IMAGE',
  DECORATIVE_IMAGE: 'DECORATIVE_IMAGE',
  IFRAME: 'IFRAME',
  SECTION: 'SECTION',
  ASIDE: 'ASIDE',
};

export const plaintextContentItemTypes = [
  contentItemTypes.TITLE,
  contentItemTypes.PARAGRAPH,
  contentItemTypes.LIST_ITEM,
];
export const sectionContentItemTypes = [
  contentItemTypes.SECTION,
  contentItemTypes.ASIDE,
];
export const containerContentItemTypes = [
  ...sectionContentItemTypes,
  contentItemTypes.LIST,
];

export const toolbarContentItemTypes = [
  {
    id: contentItemTypes.TITLE,
    key: contentItemTypes.TITLE,
    props: {},
  },
  {
    id: contentItemTypes.PARAGRAPH,
    key: contentItemTypes.PARAGRAPH,
    props: {},
  },
  {
    id: contentItemTypes.LIST,
    key: `UNORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: false,
    },
  },
  {
    id: contentItemTypes.LIST,
    key: `ORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: true,
    },
  },
  {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    key: contentItemTypes.ILLUSTRATIVE_IMAGE,
    props: {},
  },
  {
    id: contentItemTypes.IFRAME,
    key: contentItemTypes.IFRAME,
    props: {},
  },
];

export const contentItemTypesById = {
  [contentItemTypes.TITLE]: {
    id: contentItemTypes.TITLE,
    name: 'Title',
    description: 'TODO: title description',
  },
  [contentItemTypes.PARAGRAPH]: {
    id: contentItemTypes.PARAGRAPH,
    name: 'Paragraph',
    description: 'TODO: paragraph description',
  },
  [contentItemTypes.LIST]: {
    id: contentItemTypes.LIST,
    name: 'List',
    description: 'TODO: list description',
  },
  [contentItemTypes.LIST_ITEM]: {
    id: contentItemTypes.LIST_ITEM,
    name: 'List item',
    description: 'TODO: list item description',
  },
  [contentItemTypes.ILLUSTRATIVE_IMAGE]: {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    name: 'Illustrative image',
    description: 'TODO: illustrative image description',
  },
  [contentItemTypes.DECORATIVE_IMAGE]: {
    id: contentItemTypes.DECORATIVE_IMAGE,
    name: 'Decorative image',
    description: 'TODO: decorative image description',
  },
  [contentItemTypes.IFRAME]: {
    id: contentItemTypes.IFRAME,
    name: 'Iframe',
    description: 'TODO: iframe description',
  },
  [contentItemTypes.SECTION]: {
    id: contentItemTypes.SECTION,
    name: 'Section',
    description: 'TODO: section description',
  },
  [contentItemTypes.ASIDE]: {
    id: contentItemTypes.ASIDE,
    name: 'Aside',
    description: 'TODO: aside description',
  },
};
