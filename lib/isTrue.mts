export const isTrue = (value?: string): boolean => (
  value === '' ||
  !!value &&
  (/1|on|true/i).test(value)
);
