import styles from './button-group.module.scss';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  JSXElementConstructor,
} from "react";
import {Button, ButtonProps} from "../button/button";

/* eslint-disable-next-line */
export interface ButtonGroupProps<T> extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLInputElement>, 'onChange'> {
  selectedValue: T
  name?: string
  onChange?: (value: T) => void
  children: React.ReactElement<ButtonProps, JSXElementConstructor<typeof Button>> | React.ReactElement<ButtonProps, JSXElementConstructor<typeof Button>>[]
}

export function ButtonGroup<T>({ children, onChange, selectedValue, name }: ButtonGroupProps<T>) {
  return (
    <div className={styles.host}>
      { name && <input type="hidden" name={name} value={String(selectedValue)} /> }
      {React.Children.map(children, ((child, index) => {
        const value = child.props.value as T
        return <span key={index} className={styles.buttonContainer} data-selected={value === selectedValue} onClick={() => onChange?.(value)}>
          {React.cloneElement(child, { type: 'button' })}
        </span>
      }))}
    </div>
  );
}
