import { defineMessages } from 'react-intl';

const messages = defineMessages({
  comparisonSlider: {
    id: 'Comparison Slider',
    defaultMessage: 'Comparison Slider',
  },
  beforeImage: {
    id: 'Before Image',
    defaultMessage: 'Before Image',
  },
  afterImage: {
    id: 'After Image',
    defaultMessage: 'After Image',
  },
  beforeLabel: {
    id: 'Before Label',
    defaultMessage: 'Before Label',
  },
  afterLabel: {
    id: 'After Label',
    defaultMessage: 'After Label',
  },
  initialPosition: {
    id: 'Initial Position',
    defaultMessage: 'Initial Position',
  },
  initialPositionDescription: {
    id: 'Initial slider position (0-100)',
    defaultMessage: 'Initial slider position (0-100)',
  },
  showLabels: {
    id: 'Show Labels',
    defaultMessage: 'Show Labels',
  },
  sliderOrientation: {
    id: 'Slider Orientation',
    defaultMessage: 'Slider Orientation',
  },
  horizontal: {
    id: 'Horizontal',
    defaultMessage: 'Horizontal',
  },
  vertical: {
    id: 'Vertical',
    defaultMessage: 'Vertical',
  },
  handleType: {
    id: 'Handle Type',
    defaultMessage: 'Handle Type',
  },
  handleIcon: {
    id: 'Icon',
    defaultMessage: 'Icon',
  },
  handleText: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  handleTextValue: {
    id: 'Handle Text',
    defaultMessage: 'Handle Text',
  },
  handleTextDescription: {
    id: 'Text displayed on the slider handle (e.g. DRAG)',
    defaultMessage: 'Text displayed on the slider handle (e.g. DRAG)',
  },
});

export const ComparisonSliderSchema = (intl) => ({
  title: intl.formatMessage(messages.comparisonSlider),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'beforeImage',
        'afterImage',
        'beforeLabel',
        'afterLabel',
        'initialPosition',
        'showLabels',
        'orientation',
        'handleType',
        'handleText',
      ],
    },
  ],
  properties: {
    beforeImage: {
      title: intl.formatMessage(messages.beforeImage),
      widget: 'object_browser',
      mode: 'image',
      allowExternals: true,
    },
    afterImage: {
      title: intl.formatMessage(messages.afterImage),
      widget: 'object_browser',
      mode: 'image',
      allowExternals: true,
    },
    beforeLabel: {
      title: intl.formatMessage(messages.beforeLabel),
      default: 'Before',
    },
    afterLabel: {
      title: intl.formatMessage(messages.afterLabel),
      default: 'After',
    },
    initialPosition: {
      title: intl.formatMessage(messages.initialPosition),
      description: intl.formatMessage(messages.initialPositionDescription),
      type: 'integer',
      minimum: 0,
      maximum: 100,
      default: 50,
    },
    showLabels: {
      title: intl.formatMessage(messages.showLabels),
      type: 'boolean',
      default: true,
    },
    orientation: {
      title: intl.formatMessage(messages.sliderOrientation),
      choices: [
        ['horizontal', intl.formatMessage(messages.horizontal)],
        ['vertical', intl.formatMessage(messages.vertical)],
      ],
      default: 'horizontal',
    },
    handleType: {
      title: intl.formatMessage(messages.handleType),
      choices: [
        ['icon', intl.formatMessage(messages.handleIcon)],
        ['text', intl.formatMessage(messages.handleText)],
      ],
      default: 'icon',
    },
    handleText: {
      title: intl.formatMessage(messages.handleTextValue),
      description: intl.formatMessage(messages.handleTextDescription),
      default: 'DRAG',
    },
  },
  required: ['beforeImage', 'afterImage'],
});

export default ComparisonSliderSchema;
