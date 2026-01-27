import React, { useState, useRef, useCallback, useEffect } from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';

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

  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeUrl = beforeImage?.[0]
    ? flattenToAppURL(`${beforeImage[0]['@id']}/@@images/image`)
    : null;
  const afterUrl = afterImage?.[0]
    ? flattenToAppURL(`${afterImage[0]['@id']}/@@images/image`)
    : null;

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let position;

      if (orientation === 'horizontal') {
        position = ((clientX - rect.left) / rect.width) * 100;
      } else {
        position = ((clientY - rect.top) / rect.height) * 100;
      }

      setSliderPosition(Math.max(0, Math.min(100, position)));
    },
    [orientation],
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (isEditMode) return;
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX, e.clientY);
    },
    [isEditMode, handleMove],
  );

  const handleTouchStart = useCallback(
    (e) => {
      if (isEditMode) return;
      setIsDragging(true);
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [isEditMode, handleMove],
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  useEffect(() => {
    setSliderPosition(initialPosition);
  }, [initialPosition]);

  if (!beforeUrl || !afterUrl) {
    return null;
  }

  const isHorizontal = orientation === 'horizontal';

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
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="comparison-slider__image-container">
        <img
          src={afterUrl}
          alt={afterLabel}
          className="comparison-slider__image comparison-slider__image--after"
          draggable={false}
        />
        <img
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
          ) : isHorizontal ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l-7-7 7-7zm8 0v14l7-7-7-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 8h14l-7-7-7 7zm0 8h14l-7 7-7-7z" />
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
