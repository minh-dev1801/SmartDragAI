import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface FieldTypeFormExclusiveGateway {
  loaiExclusiveGateway: "open" | "close";
  name: string;
  slug: string;
  description: string;
  branches: Array<{ id: string; name: string; conditions: string }>;
}

interface FormExclusiveGatewayState {
  formData: FieldTypeFormExclusiveGateway | null;
}

const initialState: FormExclusiveGatewayState = {
  formData: null,
};

export const formExclusiveGatewaySlice = createSlice({
  name: "formExclusiveGateway",
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<FieldTypeFormExclusiveGateway>
    ) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = null;
    },
  },
});

export const { setFormData, resetFormData } = formExclusiveGatewaySlice.actions;

export const selectFormData = (state: RootState) =>
  state.formExclusiveGateway.formData;

export default formExclusiveGatewaySlice.reducer;
