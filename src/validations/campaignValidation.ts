import { ALLOWED_MIME } from "@/lib/Data";
import { z } from "zod";


// File validation schema with detailed error messages
const fileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) {
    return false;
  }
  
  // Check file type (images only)

  if (!ALLOWED_MIME.includes(file.type)) {
    return { message: `File type ${file.type} is not allowed.` };
  }

  
  return true;
}, (file) => {
  if (!(file instanceof File)) {
    return { message: "Invalid file object" };
  }
  

  if (!ALLOWED_MIME.includes(file.type)) {
    return { message: `File type ${file.type} is not allowed.` };
  }
  

  
  return { message: "Invalid file" };
});

export const publishCampaignSchema = z.object({
  name: z
    .string()
    .min(1, "Campaign name is required")
    .max(50, "Campaign name must be 50 characters or shorter")
    .trim(),
  
  screenIds: z
    .array(z.string())
    .min(1, "At least one screen location must be selected"),
  
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return false;
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsedDate >= today;
    }, "Start date must be a valid date and cannot be in the past"),
  
  endDate: z
    .string()
    .min(1, "End date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "End date must be a valid date"),
  
  type: z
    .string()
    .min(1, "Campaign type is required")
    .refine((type) => type === "custom" || type === "bundle", {
      message: "Campaign type must be either 'custom' or 'bundle'"
    }),
  
  files: z
    .array(fileSchema)
    .min(1, "At least one graphic file must be uploaded"),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  
  // Check if end date is after start date
  if (endDate <= startDate) {
    return false;
  }
  
  return true;
}, {
  message: "End date must be after the start date",
  path: ["endDate"]
});

// Type inference for TypeScript
export type PublishCampaignInput = z.infer<typeof publishCampaignSchema>;

