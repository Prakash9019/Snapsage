import { Campaign } from "../types/campaign";

// Sample campaign data structure that demonstrates how stages and questions work
export const sampleCampaign: Campaign = {
  _id: "1",
  title: "Share Your Audio Experience and Earn ₹100",
  category: "Audio",
  startedAt: "14 Aug, 2025 13:00 PM",
  endingAt: "15 Aug, 2025 13:00 PM",
  overview: "1/ Tell us your audio product's brand & model.\n2/ Share 2 pros you like most.\n3/ Share 2–3 cons or issues you face.\n4/ Suggest what you'd like improved in the next version.\n5/ Show the product possible.",
  guidelines: "1/ Make sure your face and product are clearly visible.\n2/ Speak clearly in a quiet environment.\n3/ Keep your phone steady and camera at eye level.\n4/ Share your honest opinion — no scripts needed.\n5/ Hold or show the product in the video if possible.\n6/ Mention product name → Pros → Cons → Suggestions → Overall rating.",
  imageUrl: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/p1rwwr9l_expires_30_days.png",
  stages: [
    {
      id: "stage1",
      title: "Tell us about the product",
      description: "Let's start by understanding your audio product",
      questions: [
        {
          id: "product_type",
          label: "What product are you reviewing?",
          type: "dropdown",
          required: true,
          options: ["TWS", "Headset", "Earphones", "Speakers"]
        },
        {
          id: "usage_duration",
          label: "How long have you been using?",
          type: "dropdown",
          required: true,
          options: ["3 Months", "4 Months", "6 Months", "1 Year"]
        },
        {
          id: "purchase_location",
          label: "Where did you purchase?",
          type: "dropdown",
          required: true,
          options: ["Amazon", "Flipkart", "Croma", "Reliance Digital", "Other Store"]
        },
        {
          id: "purchase_year",
          label: "When did you purchase? (Approx)",
          type: "dropdown",
          required: true,
          options: ["Jan 2024", "Jun 2024", "Dec 2024", "Feb 2025", "Mar 2025"]
        }
      ]
    },
    {
      id: "stage2",
      title: "Product Details",
      description: "Tell us more about your specific product",
      questions: [
        {
          id: "brand_name",
          label: "What is the brand name?",
          type: "text",
          required: true,
          placeholder: "e.g., Sony, Bose, JBL"
        },
        {
          id: "model_name",
          label: "What is the model name?",
          type: "text",
          required: true,
          placeholder: "e.g., WH-1000XM4, QuietComfort 35"
        },
        {
          id: "price_range",
          label: "What was the price range?",
          type: "dropdown",
          required: true,
          options: ["Under ₹1000", "₹1000-₹3000", "₹3000-₹5000", "₹5000-₹10000", "Above ₹10000"]
        }
      ]
    },
    {
      id: "stage3",
      title: "Your Experience",
      description: "Share your honest experience with the product",
      questions: [
        {
          id: "pros",
          label: "What are the 2 best things about this product?",
          type: "textarea",
          required: true,
          placeholder: "Share what you love most about this product..."
        },
        {
          id: "cons",
          label: "What are 2-3 issues or cons you face?",
          type: "textarea",
          required: true,
          placeholder: "Share any problems or things you don't like..."
        },
        {
          id: "overall_rating",
          label: "What would you rate this product out of 5?",
          type: "dropdown",
          required: true,
          options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
        }
      ]
    }
  ]
};

// Example of a campaign with only 2 stages
export const sampleCampaign2Stages: Campaign = {
  _id: "2",
  title: "Quick Product Feedback",
  category: "Electronics",
  startedAt: "14 Aug, 2025 13:00 PM",
  endingAt: "15 Aug, 2025 13:00 PM",
  overview: "Quick feedback on your latest purchase",
  guidelines: "Be honest and specific in your feedback",
  imageUrl: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/p1rwwr9l_expires_30_days.png",
  stages: [
    {
      id: "stage1",
      title: "Product Information",
      questions: [
        {
          id: "product_category",
          label: "What type of product is this?",
          type: "dropdown",
          required: true,
          options: ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Other"]
        },
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
      title: "Your Opinion",
      questions: [
        {
          id: "satisfaction",
          label: "How satisfied are you with this product?",
          type: "dropdown",
          required: true,
          options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
        },
        {
          id: "feedback",
          label: "Additional comments",
          type: "textarea",
          required: false,
          placeholder: "Any additional thoughts..."
        }
      ]
    }
  ]
};
