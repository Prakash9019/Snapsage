# Dynamic Video Submission System

This system allows campaign admins to create custom stages with different question types, and the frontend will dynamically render only the stages that are defined for each campaign. After completing all dynamic stages, users are presented with a final video submission stage.

## How It Works

### 1. Campaign Structure
Each campaign now has a `stages` array that contains the stages for that campaign:

```typescript
interface Campaign {
  id: string;
  title: string;
  // ... other fields
  stages: Stage[];
}
```

### 2. Stage Structure
Each stage contains questions and optional media fields:

```typescript
interface Stage {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  video?: string; // For stage6 video
  stage6Image?: string; // For stage6 image
}
```

### 3. Question Types
The system supports 5 question types:

- **dropdown**: Shows a picker with predefined options
- **mcq**: Multiple choice question with checkboxes
- **text**: Single line text input
- **textarea**: Multi-line text input
- **rating**: Star rating system with expandable cards

```typescript
interface Question {
  id: string;
  label: string;
  type: 'dropdown' | 'mcq' | 'text' | 'textarea' | 'rating';
  required: boolean;
  options?: string[]; // For dropdown, mcq, and rating
  placeholder?: string; // For text and textarea
}
```

## Key Features

### 1. Dynamic Stage Rendering
- Only shows stages that are defined in the campaign
- If admin creates 3 stages, only 3 stages will be shown + 1 final video stage
- If admin creates 6 stages, all 6 will be shown + 1 final video stage
- Progress bar automatically adjusts to the number of stages

### 2. Final Video Stage
- After completing all dynamic stages, users see VideoSubmissionScreen6
- Users can record or upload a video
- Optional stage image upload
- GCP integration for media storage
- Same UI/UX as the original system

### 3. Flexible Question Types
- **Dropdown**: Perfect for multiple choice questions
- **MCQ**: Multi-select checkboxes for multiple answers
- **Text**: For short answers like brand names, model numbers
- **Textarea**: For longer responses like pros/cons, feedback
- **Rating**: Star rating system with expandable categories

### 4. GCP Integration
- All media files (videos, images) are uploaded to Google Cloud Storage
- Automatic URL generation for uploaded files
- Secure file storage with public access URLs
- Same pattern as profile image upload

### 5. Validation
- Required questions are marked with red asterisk (*)
- Form validation prevents proceeding without required answers
- Shows specific error messages for missing fields

### 6. Data Collection
- Each stage's answers are collected separately
- Final submission includes all stage answers + video + stage image
- Data structure is consistent and type-safe

## Example Usage

### Campaign with 3 Stages + Final Video Stage
```typescript
const campaign = {
  id: "1",
  title: "Audio Product Review",
  stages: [
    {
      id: "stage1",
      title: "Product Information",
      questions: [
        {
          id: "product_type",
          label: "What product are you reviewing?",
          type: "dropdown",
          required: true,
          options: ["TWS", "Headset", "Earphones", "Speakers"]
        }
      ]
    },
    {
      id: "stage2", 
      title: "Your Experience",
      questions: [
        {
          id: "pros",
          label: "What do you like most?",
          type: "textarea",
          required: true,
          placeholder: "Share your positive experience..."
        }
      ]
    },
    {
      id: "stage3",
      title: "Rating",
      questions: [
        {
          id: "rating",
          label: "Rate this product",
          type: "dropdown", 
          required: true,
          options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
        }
      ]
    }
  ]
}
// After these 3 stages, VideoSubmissionScreen6 will be shown
```

### Campaign with 2 Stages + Final Video Stage
```typescript
const campaign = {
  id: "2",
  title: "Quick Feedback",
  stages: [
    {
      id: "stage1",
      title: "Basic Info",
      questions: [
        {
          id: "brand",
          label: "Brand name",
          type: "text",
          required: true,
          placeholder: "Enter brand name"
        }
      ]
    },
    {
      id: "stage2",
      title: "Opinion", 
      questions: [
        {
          id: "satisfaction",
          label: "How satisfied are you?",
          type: "dropdown",
          required: true,
          options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
        }
      ]
    }
  ]
}
// After these 2 stages, VideoSubmissionScreen6 will be shown
```

## Backend Integration

### API Endpoints

1. **Get Campaign Details**
   ```
   GET /campaigns/{campaignId}
   Response: Campaign object with stages array
   ```

2. **Upload Stage6 Media**
   ```
   POST /campaigns/upload-stage6-media
   Body: FormData with video and stage6Image files
   Response: { videoUrl, stageImageUrl }
   ```

3. **Submit Campaign Response**
   ```
   POST /campaigns/{campaignId}/submit
   Body: {
     campaignId: string,
     stageAnswers: StageAnswer[],
     video?: string,
     stageImage?: string
   }
   ```

### Data Flow

1. User selects a campaign
2. Frontend fetches campaign details including stages
3. VideoSubmissionFlow renders only the defined stages
4. Each stage shows its questions based on type
5. User fills answers and progresses through stages
6. After all stages, VideoSubmissionScreen6 is shown
7. User uploads video and optional stage image to GCP
8. Final submission sends all data to backend

## GCP Storage Integration

### File Upload Process
1. User selects video/image in VideoSubmissionScreen6
2. Files are uploaded to `/campaigns/upload-stage6-media` endpoint
3. Backend uses multer + gcsUpload middleware
4. Files are stored in Google Cloud Storage
5. Public URLs are returned to frontend
6. URLs are included in final submission

### Storage Structure
```
GCP Bucket/
├── videos/
│   └── {timestamp}-submission_video.mp4
└── images/
    └── {timestamp}-stage_image.jpg
```

## Benefits

1. **Flexibility**: Admins can create any number of stages (1-6 or more)
2. **Scalability**: Easy to add new question types
3. **Consistency**: Same UI/UX for all campaigns
4. **Type Safety**: Full TypeScript support
5. **Validation**: Built-in form validation
6. **Maintainability**: Single codebase handles all campaign types
7. **Media Support**: GCP integration for secure file storage
8. **Final Stage**: Dedicated video submission stage after all questions

## Files Modified/Created

### Backend
- `backend/models/VideoSubmission.js` - Added stageImage field
- `backend/middleware/uploadMiddleware.js` - Added stage6Image support
- `backend/controllers/userCampaignController.js` - Updated for GCS URLs
- `backend/routes/campaignsRoutes.js` - Added upload-stage6-media route

### Frontend
- `src/types/campaign.ts` - Updated types for video and stageImage
- `src/components/QuestionComponent.tsx` - Enhanced with rating type
- `src/components/DynamicStageScreen.tsx` - Updated for label field
- `src/components/VideoSubmissionFlow.tsx` - Added final video stage
- `src/components/VideoSubmissionScreen6.tsx` - Enhanced with GCP upload
- `src/utils/sampleCampaignData.ts` - Updated sample data

## Migration from Static to Dynamic

The old system had 6 hardcoded VideoSubmissionScreen components. The new system:

1. Replaces all 6 static screens with 1 dynamic component + 1 final video stage
2. Uses campaign data to determine stages and questions
3. Maintains the same UI/UX but with flexibility
4. Reduces code duplication significantly
5. Adds GCP integration for media storage

## Testing

Use the sample data in `src/utils/sampleCampaignData.ts` to test different scenarios:
- Campaign with 3 stages + final video stage
- Campaign with 2 stages + final video stage  
- Different question types including rating
- Required vs optional questions
- Video and image upload functionality
