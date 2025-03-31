export interface InputTextInterface {
  label: string;
  uniqLabel: string;
  value?: string;
  disabled?: boolean;
  onFocusOut?: () => void;
}