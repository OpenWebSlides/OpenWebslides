const examples = [
  // TITLE
  {
    id: '23-1-1',
    contentItemType: TITLE,
    text: 'Sic parvis magna',
    inlineProperties: [],
  },

  // PARAGRAPH
  {
    id: '23-1-1',
    contentItemType: PARAGRAPH,
    text: 'Sic parvis magna',
    inlineProperties: [],
  },

  // LIST
  {
    id: '23-1-1',
    contentItemType: LIST,
    ordered: true,
    childItemIds: ['23-1-2'],
  },

  // LIST ITEM
  {
    id: '23-1-1',
    contentItemType: LIST_ITEM,
    text: 'Sic parvis magna',
    inlineProperties: [],
  },

  // ILLUSTRATIVE_IMAGE
  {
    id: '23-1-1',
    contentItemType: ILLUSTRATIVE_IMAGE,
    src: 'http://google.com/blbla.jpg',
    alt: 'blablallb',
    caption: 'Blbablale',
  },

  // DECORATIVE_IMAGE
  {
    id: '23-1-1',
    contentItemType: DECORATIVE_IMAGE,
    src: 'http://google.com/blbla.jpg',
    alt: 'blablallb',
  },

  // BLOCK_QUOTE
  {
    id: '23-1-1',
    contentItemType: BLOCK_QUOTE,
    text: 'Sic parvis magna',
    author: 'Francis Drake',
  },

  // IFRAME
  {
    id: '23-1-1',
    contentItemType: IFRAME,
    src: 'http://google.com/blbla.jpg',
    alt: 'blablallb',
  },

  // SECTION
  {
    id: '23-1-1',
    contentItemType: SECTION,
    childItemIds: [],
  },

  // ASIDE
  {
    id: '23-1-1',
    contentItemType: ASIDE,
    childItemIds: [],
  },

  // IMAGE_CONTAINER
  {
    id: '23-1-1',
    contentItemType: IMAGE_CONTAINER,
    childItemIds: [],
    imageType: ILLUSTRATIVE_IMAGE,
  }
];
