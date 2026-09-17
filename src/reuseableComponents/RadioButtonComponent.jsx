import React from 'react';
import { Radio } from 'antd';

const RadioButtonComponent = ({ optionsList = [], value, onChange, directionRow, label, isLabel, labelStyle}) => {
  return (
    <div className={`flex ${directionRow ? 'sm:flex-row' : 'sm:flex-col'}`}>
      {isLabel && (
        <div className=''>
          <label className="font-roboto m-1  font-roboto text-xs" style={labelStyle}>
            {label}
          </label>
        </div>
      )}
      <Radio.Group value={value} onChange={onChange} className="font-roboto text-xs self-center">
        {optionsList.map((item) => (
          <Radio  className="font-roboto text-xs" key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioButtonComponent;
