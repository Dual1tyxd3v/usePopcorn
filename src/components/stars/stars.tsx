import React, { useState } from 'react';
import { STAR_CONFIG } from '../../const';
import Star from '../star/star';

type StarsProps = {
  changeUserRating: (v: number) => void;
};

export default function Stars({ changeUserRating }: StarsProps) {
  const [rate, setRate] = useState(0);
  const [tempRate, setTempRate] = useState(0);

  const { color, size, starsCount } = STAR_CONFIG;

  function onChangeRating(value: number) {
    setRate(value);
    changeUserRating(value);
  }

  function onHoverRating(value: number) {
    setTempRate(value);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: starsCount }, (_, i: number) => (
        <React.Fragment key={`star_${i + 1}`}>
          <Star
            key={`star_${i + 1}`}
            value={i + 1}
            full={tempRate <= 0 ? rate >= i + 1 : tempRate >= i + 1}
            onRateChange={onChangeRating}
            onHoverRate={onHoverRating}
            color={color}
            size={size}
          />
        </React.Fragment>
      ))}
      <p style={{ fontSize: size, color: color, lineHeight: '1' }}>
        {tempRate || rate || ''}
      </p>
    </div>
  );
}
