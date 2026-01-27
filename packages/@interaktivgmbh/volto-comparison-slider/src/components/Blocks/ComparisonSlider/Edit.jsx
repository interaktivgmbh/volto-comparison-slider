import { defineMessages } from 'react-intl';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import ComparisonSliderBody from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/ComparisonSliderBody';
import { ComparisonSliderSchema } from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/schema';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import comparisonSliderSVG from '@interaktivgmbh/volto-comparison-slider/icons/comparison-slider.svg';

const messages = defineMessages({
  selectImages: {
    id: 'Select before and after images in the sidebar',
    defaultMessage: 'Select before and after images in the sidebar',
  },
});

function Edit({ data, block, onChangeBlock, selected, intl }) {
  const schema = ComparisonSliderSchema(intl);

  const hasImages = data.beforeImage?.[0] && data.afterImage?.[0];

  return (
    <div className="block comparison-slider-block">
      {hasImages ? (
        <ComparisonSliderBody data={data} isEditMode={true} />
      ) : (
        <div className="comparison-slider-placeholder">
          <Icon
            name={comparisonSliderSVG}
            size="64px"
            className="placeholder-icon"
          />
          <p>{intl.formatMessage(messages.selectImages)}</p>
        </div>
      )}

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </div>
  );
}

export default Edit;
