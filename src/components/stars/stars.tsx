import React, { useState } from 'react';
import { STARS_COUNT } from '../../const';
import Star from '../star/star';

export default function Stars() {
  const [rate, setRate] = useState(0);
  const [tempRate, setTempRate] = useState(0);

  function onChangeRating(value: number) {
    setRate(value);
  }

  function onHoverRating(value: number) {
    setTempRate(value);
  }

  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: STARS_COUNT }, (_, i: number) => (
        <React.Fragment key={`star_${i + 1}`}>
          {/* <input value={i + 1} name="star" type="radio" /> */}
          <Star
            key={`star_${i + 1}`}
            value={i + 1}
            full={tempRate <= 0 ? rate >= i + 1 : tempRate >= i + 1}
            onRateChange={onChangeRating}
            onHoverRate={onHoverRating}
          />
        </React.Fragment>
      ))}
      <p>{tempRate || rate || ''}</p>
    </div>
  );
}
