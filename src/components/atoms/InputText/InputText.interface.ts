export interface InputTextInterface {
  label: string;
  value?: string;
  disabled?: boolean;
  onFocusOut?: (returnValue: string) => void;
}