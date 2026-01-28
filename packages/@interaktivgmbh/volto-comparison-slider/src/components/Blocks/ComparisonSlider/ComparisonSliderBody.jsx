import React, { useState, useRef, useCallback, useEffect } from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import Image from '@plone/volto/components/theme/Image/Image';

const getImageUrl = (image) =>
  image?.[0] ? flattenToAppURL(`${image[0]['@id']}/@@images/image`) : null;

const ComparisonSliderBody = ({ data, isEditMode = false }) => {
  const {
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    initialPosition = 50,
    showLabels = true,
    orientation = 'horizontal',
    handleType = 'icon',
    handleText = 'DRAG',
  } = data;

  const isHorizontal = orientation === 'horizontal';
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeUrl = getImageUrl(beforeImage);
  const afterUrl = getImageUrl(afterImage);

  const updatePosition = useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const position = isHorizontal
        ? ((clientX - rect.left) / rect.width) * 100
        : ((clientY - rect.top) / rect.height) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    },
    [isHorizontal],
  );

  const handleStart = useCallback(
    (e) => {
      if (isEditMode) return;
      e.preventDefault();
      setIsDragging(true);
      const point = e.touches?.[0] || e;
      updatePosition(point.clientX, point.clientY);
    },
    [isEditMode, updatePosition],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (isEditMode) return;
      const step = e.shiftKey ? 10 : 1;
      const decreaseKeys = isHorizontal ? ['ArrowLeft'] : ['ArrowUp'];
      const increaseKeys = isHorizontal ? ['ArrowRight'] : ['ArrowDown'];

      if (decreaseKeys.includes(e.key)) {
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - step));
      } else if (increaseKeys.includes(e.key)) {
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + step));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setSliderPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setSliderPosition(100);
      }
    },
    [isEditMode, isHorizontal],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const point = e.touches?.[0] || e;
      updatePosition(point.clientX, point.clientY);
    };
    const handleEnd = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updatePosition]);

  useEffect(() => {
    setSliderPosition(initialPosition);
  }, [initialPosition]);

  if (!beforeUrl || !afterUrl) {
    return null;
  }

  const clipPath = isHorizontal
    ? `inset(0 ${100 - sliderPosition}% 0 0)`
    : `inset(0 0 ${100 - sliderPosition}% 0)`;

  const sliderStyle = isHorizontal
    ? { left: `${sliderPosition}%` }
    : { top: `${sliderPosition}%` };

  return (
    <div
      ref={containerRef}
      className={`comparison-slider comparison-slider--${orientation} ${isDragging ? 'is-dragging' : ''}`}
      role="slider"
      tabIndex={isEditMode ? -1 : 0}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Image comparison slider: ${beforeLabel} vs ${afterLabel}`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onKeyDown={handleKeyDown}
    >
      <div className="comparison-slider__image-container">
        <Image
          src={afterUrl}
          alt={afterLabel}
          className="comparison-slider__image comparison-slider__image--after"
          draggable={false}
        />
        <Image
          src={beforeUrl}
          alt={beforeLabel}
          className="comparison-slider__image comparison-slider__image--before"
          style={{ clipPath }}
          draggable={false}
        />
      </div>

      <div
        className={`comparison-slider__handle ${isHorizontal ? 'comparison-slider__handle--horizontal' : 'comparison-slider__handle--vertical'}`}
        style={sliderStyle}
      >
        <div className="comparison-slider__handle-line" />
        <div
          className={`comparison-slider__handle-button ${handleType === 'text' ? 'comparison-slider__handle-button--text' : ''}`}
        >
          {handleType === 'text' ? (
            <span className="comparison-slider__handle-text">{handleText}</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d={
                  isHorizontal
                    ? 'M8 5v14l-7-7 7-7zm8 0v14l7-7-7-7z'
                    : 'M5 8h14l-7-7-7 7zm0 8h14l-7 7-7-7z'
                }
              />
            </svg>
          )}
        </div>
      </div>

      {showLabels && (
        <>
          <span className="comparison-slider__label comparison-slider__label--before">
            {beforeLabel}
          </span>
          <span className="comparison-slider__label comparison-slider__label--after">
            {afterLabel}
          </span>
        </>
      )}
    </div>
  );
};

export default ComparisonSliderBody;
