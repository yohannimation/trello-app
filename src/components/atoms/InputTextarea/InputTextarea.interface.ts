export interface InputTextareaInterface {
  label: string;
  value?: string;
  disabled?: boolean;
  onFocusOut?: (returnValue: string) => void;
}