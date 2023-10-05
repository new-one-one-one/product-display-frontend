import { ReactNode } from "react";

export interface ILabelWithValue {
  label?: ReactNode | string;
  separator?: ReactNode | string;
  value?: ReactNode | string;
}
