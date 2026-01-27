import View from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/View';
import Edit from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/Edit';
import { ComparisonSliderSchema } from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/schema';
import comparisonSliderSVG from '@interaktivgmbh/volto-comparison-slider/icons/comparison-slider.svg';
import '@interaktivgmbh/volto-comparison-slider/theme/_main.css';

const applyConfig = (config) => {
  config.blocks.blocksConfig.comparisonSlider = {
    id: 'comparisonSlider',
    title: 'Comparison Slider',
    icon: comparisonSliderSVG,
    group: 'media',
    view: View,
    edit: Edit,
    blockSchema: ({ intl }) => ComparisonSliderSchema(intl),
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  return config;
};

export default applyConfig;
