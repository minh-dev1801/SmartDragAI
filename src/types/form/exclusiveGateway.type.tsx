import type { CommonFormType } from "../formFlow";

export interface BranchType {
  id: string;
  name: string;
  conditions: string;
}

export interface FieldTypeFormExclusiveGateway extends CommonFormType {
  loaiExclusiveGateway: string;
  branches: BranchType[];
}
