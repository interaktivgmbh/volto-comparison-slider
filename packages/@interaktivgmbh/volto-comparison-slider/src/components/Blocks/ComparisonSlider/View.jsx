import ComparisonSliderBody from '@interaktivgmbh/volto-comparison-slider/components/Blocks/ComparisonSlider/ComparisonSliderBody';

function View(props) {
  const { data, className } = props;
  const beforeImage = data.beforeImage;
  const afterImage = data.afterImage;

  if (!beforeImage?.[0] || !afterImage?.[0]) {
    return null;
  }

  return (
    <div className={`block comparison-slider-block ${className || ''}`}>
      <ComparisonSliderBody data={data} isEditMode={false} />
    </div>
  );
}

export default View;
