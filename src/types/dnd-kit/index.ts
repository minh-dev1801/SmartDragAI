import type { IconType } from "react-icons/lib";

export interface SidebarFieldType {
  type: string;
  name: string;
  icon: IconType;
  color: string;
}

export interface FieldType {
  id: string | number;
  type: string;
  name: string;
  title: string;
  children?: FieldType[];
  parent?: string | null;
}

export interface FieldTypeData {
  fields: FieldType[];
}
