import img from '../../../../../assets/Dashboard/board1.jpg'
export interface UploadedFile {
    id: string
    name: string
    fileType: string
    dimensions: string
    type: "landscape" | "portrait" | "square"
    compatible: boolean
    url: string
    // uploadedAt: Date
}

export interface LocationTemplate {
    id: string
    name: string
    location: string
    screenSize: string
    selected: boolean
    selectionNumber: number
    supportedFormats: string[]
}

export interface BulkUploadStatus {
    isUploading: boolean
    maxFileSize: string
    recentUpload?: string
    progress?: number
}

export const mockUploadedFiles: UploadedFile[] = [
    {
        id: "1",
        name: "landscape-image.jpg",
        fileType: "PNG",
        dimensions: "1048 x 581 Landscape",
        type: "landscape",
        compatible: false,
        url: img,
        // uploadedAt: new Date(),
    },
]

export const locationTemplates: LocationTemplate[] = [
    {
        id: "1",
        name: "Time Square, NYC",
        location: "Time Square, NYC",
        screenSize: "1920x1080",
        selected: true,
        selectionNumber: 1,
        supportedFormats: [".PNG", ".MP4"],
    },
    {
        id: "2",
        name: "Southwest Plaza, NYC",
        location: "Southwest Plaza, NYC",
        screenSize: "1920x1080",
        selected: true,
        selectionNumber: 2,
        supportedFormats: [".PNG", ".MP4"],
    },
    {
        id: "3",
        name: "Piccadilly Circus, London",
        location: "Piccadilly Circus, London",
        screenSize: "1920x1080",
        selected: true,
        selectionNumber: 3,
        supportedFormats: [".PNG", ".MP4"],
    },
]
