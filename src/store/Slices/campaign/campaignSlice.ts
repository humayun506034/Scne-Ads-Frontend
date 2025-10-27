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
    resetCampaign: () => initialState,
  },
});

export const {
  setCampaignName,
  setScreens,
  setDates,
  setFiles,
  resetCampaign,
} = campaignSlice.actions;

export default campaignSlice.reducer;
