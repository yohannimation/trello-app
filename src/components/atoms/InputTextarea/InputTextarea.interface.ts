export interface InputTextareaInterface {
  label: string;
  uniqLabel: string;
  value?: string;
  disabled?: boolean;
  onFocusOut?: () => void;
}