import * as React from 'react';
import classNames from 'classnames';
import styled, { ThemeProvider } from 'styled-components';
import ErrorMessage from '../Typography/ErrorMessage/index';
import { Themes } from '../themes';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The ID of the control
   *
   * @default null
   **/
  id: string;
  /**
   * Type of input (text, number, email, etc)
   *
   * @default 'text'
   **/
  type?: string;
  /**
   * Autocomplete settings for this field
   *
   * @default 'on'
   **/
  autoComplete?: string;
  /**
   * Disables modification
   *
   * @default false
   **/
  disabled?: boolean;
  /**
   * Select Input Size
   *
   * @default 'md'
   **/
  inputSize?: 'sm' | 'md' | 'lg';
  /**
   * Specify whether the control is currently invalid
   *
   * @default false
   **/
  invalid?: boolean;
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: string;
  /**
   * Color of the invalid text
   *
   * @default ''
   **/
  invalidTextColor?: string;
  /**
   * Specify whether the control shows an icon
   *
   * @default null
   **/
  icon?:
    | JSX.Element
    | React.Component
    | React.FunctionComponent
    | string
    | null;
  /**
   * Specify the position of the icon within the control
   *
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Specify whether the control shows an icon
   *
   * @default null
   **/
  addonText?: string;
  /**
   * Specify the position of the icon within the control
   *
   * @default 'right'
   */
  addonTextPosition?: 'left' | 'right';
  /**
   * What is the maximum length of the text in the field?
   *
   * @default null
   **/
  maxLength?: number;
  /**
   * Specify the placeholder attribute for the <input>
   *
   * @default null
   */
  placeholder?: string;
  /**
   * Is the field required?
   *
   * @default false
   **/
  required?: boolean;
  /**
   * From theme provider
   *
   * @default defaultTheme
   **/
  theme?: any;
  /**
   * Value of the input
   */
  value?: string;
  /**
   * onChange handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SInput = styled.input`
  width: 100%;
  min-width: 0;
  height: ${(props: Props) => props.theme.input[props.inputSize!].height}
  box-sizing: border-box;
  background: ${(props: Props) => props.theme.input.background}
	border: none;
  border-radius: ${(props: Props) =>
    props.theme.common[props.inputSize!].borderRadius};
	padding: ${(props: Props) => props.theme.input[props.inputSize!].padding}
	padding-left: ${(props: Props) =>
    'left' === props.addonTextPosition ? '0' : 'auto'}
	padding-right: ${(props: Props) =>
    'right' === props.addonTextPosition && !props.disabled ? '0' : 'auto'}
  font-family: ${(props: Props) => props.theme.typography.fontFamily};
  font-size: ${(props: Props) => props.theme.input.fontSize}
  color: ${(props: Props) => props.theme.reverseText};
  text-align: ${(props: Props) => (props.addonText ? 'right' : 'auto')};
  &[data-invalid] {
    border-color: ${(props: Props) => props.theme.validation.borderColor};
  }
  ::placeholder {
    color: ${props => props.theme.input.placeholderColor};
  }
`;

const SInputWrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: wrap;
	align-items: stretch;
	font-family: ${(props: Props) => props.theme.typography.fontFamily};
  font-size: ${(props: Props) => props.theme.common[props.inputSize!].fontSize}
  color: ${(props: Props) => props.theme.reverseText};
  border: ${(props: Props) => props.theme.input.border};
  border-color: ${(props: Props) =>
    props.invalid
      ? props.theme.validation.borderColor
      : props.theme.colors.secondary};
  outline: none !important;
  input {
    text-align: left;
    margin-right: 0px;
      
  }
  input:focus {
    outline: none !important;
    border-color: ${(props: Props) => props.theme.colors.primary};
    box-shadow: 0 0 3px ${(props: Props) => props.theme.colors.primary};
  }
  &.input-icon-left,
  &.input-icon-right {
    flex-wrap: nowrap;
    & > span {
      padding: 0px;
      position: absolute;
      & > * {
        height: 100%;

      }
    }
  }
  &.input-icon-left {
    input {
      padding-left: 40px;
    }
   span {
      left: 16px;
      top: ${(props: Props) => props.theme.input[props.inputSize!].iconTop};
    }
  }
  &.input-icon-right {
    input {
      padding-right: 40px;
    }
    span {
      right: 16px;      
      top: ${(props: Props) => props.theme.input[props.inputSize!].iconTop};

    }
  }
  &.disabled, &.disabled > input {
    border: ${props => props.theme.input.disabled.border};
    background: ${props => props.theme.input.disabled.background};
    cursor: not-allowed;
  }
`;

export const Input: React.FunctionComponent<Props> = ({
  theme,
  children,
  value,
  onChange,
  ...inputProps
}) => {
  const errorId = inputProps.invalid ? `${inputProps.id}-error-msg` : '';
  return (
    <ThemeProvider theme={(outerTheme: any) => outerTheme || theme}>
      <>
        <SInputWrapper
          className={classNames({
            disabled: inputProps.disabled,
            [`input-icon-${inputProps.iconPosition ||
              inputProps.addonTextPosition}`]:
              inputProps.icon || inputProps.addonText,
          })}
          {...inputProps}
        >
          {('left' === inputProps.iconPosition ||
            'left' === inputProps.addonTextPosition) && (
            <span>{inputProps.icon || inputProps.addonText}</span>
          )}
          <SInput
            value={(value ? value.toString() : '').substring(
              0,
              inputProps.maxLength,
            )}
            onChange={onChange}
            {...inputProps}
            data-invalid={inputProps.invalid ? '' : undefined}
            aria-invalid={inputProps.invalid ? true : undefined}
            aria-describedby={errorId}
          />
          {('right' === inputProps.iconPosition ||
            'right' === inputProps.addonTextPosition) && (
            <span>{inputProps.icon || inputProps.addonText}</span>
          )}
        </SInputWrapper>
        {inputProps.invalid && inputProps.invalidText && (
          <ErrorMessage
            id={errorId}
            message={inputProps.invalidText || ''}
            textColor={inputProps.invalidTextColor || ''}
          />
        )}
      </>
    </ThemeProvider>
  );
};

Input.defaultProps = {
  theme: Themes.defaultTheme,
  inputSize: 'md',
  type: 'text',
};
