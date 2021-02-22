import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import styled from 'styled-components';

type Props = {
    name?: string,
    label: string,
    type: string,
    placeholder?:string,
    error?: string
}

const InputField = styled.input`
padding: 17px 52px 17px 17px;
border: ${props => props.hasError ? "1px solid #FF377F" : "1px solid #989FDB"};
background:  #FAF5FF;
border-style: outset;
box-sizing:border-box;
border-radius: 8px;
width: 256px;
height: 48px;
font-size: 10px;
line-height: 48px;
color: #989FDB;`;

const ErrorMsg = styled.span`
 font-size: 10px;
  line-height: 48px;    
  color: #FF377F;
  margin-left:20px;     
`;

export default function Input({ name, label, ...rest } : Props) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, clearError, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
        { label && <label>{label}</label> }
        <InputField 
          ref={inputRef} 
          defaultValue={defaultValue}
          onFocus={clearError}
          hasError={error ? 'hasError' : ''}
          {...rest} 
        />
        { error && <ErrorMsg>{error}</ErrorMsg> }
    </div>
  );
}