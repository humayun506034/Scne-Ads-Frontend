import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampaignState {
  name: string;
  screenIds: string[];
  startDate: string | null;
  endDate: string | null;
  type: string;
  files: File[]; 
}

const initialState: CampaignState = {
  name: "",
  screenIds: [],
  startDate: null,
  endDate: null,
  type: "custom",
  files: [],
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCampaignName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setScreens: (state, action: PayloadAction<string[]>) => {
      state.screenIds = action.payload;
    },
    toggleScreen: (state, action: PayloadAction<string>) => {
      const screenId = action.payload;
      const isSelected = state.screenIds.includes(screenId);
      state.screenIds = isSelected
        ? state.screenIds.filter((id) => id !== screenId)
        : [...state.screenIds, screenId];
    },
    addScreen: (state, action: PayloadAction<string>) => {
      const screenId = action.payload;
      if (!state.screenIds.includes(screenId)) {
        state.screenIds.push(screenId);
      }
    },
    removeScreen: (state, action: PayloadAction<string>) => {
      const screenId = action.payload;
      state.screenIds = state.screenIds.filter((id) => id !== screenId);
    },
    setDates: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    removeFile: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.files.length) {
        state.files = state.files.filter((_, i) => i !== index);
      }
    },
    resetCampaign: () => initialState,
  },
});

export const {
  setCampaignName,
  setScreens,
  toggleScreen,
  addScreen,
  removeScreen,
  setDates,
  setFiles,
  removeFile,
  resetCampaign,
} = campaignSlice.actions;

export default campaignSlice.reducer;
