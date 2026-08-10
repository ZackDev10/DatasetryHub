export type ContentType = "PROJECT" | "TUTORIAL";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type CategoryTag = "DATA" | "MACHINE" | "ENGINEERING" | "CLOUD";

export interface ContentItem {
  id: string;
  type: ContentType;
  difficulty: Difficulty;
  title: string;
  description: string;
  duration: string;
  rating: number;
  categoryTag: CategoryTag;
  ctaLabel: string;
}

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "customer-churn-analysis",
    type: "PROJECT",
    difficulty: "Intermediate",
    title: "Customer Churn Analysis with Advanced Feature Engineering",
    description:
      "Build a predictive model to identify at-risk customers using advanced feature engineering techniques.",
    duration: "4.5 hours",
    rating: 4.8,
    categoryTag: "DATA",
    ctaLabel: "Start Project",
  },
  {
    id: "neural-networks-fundamentals",
    type: "TUTORIAL",
    difficulty: "Beginner",
    title: "Neural Networks Fundamentals",
    description:
      "A deep dive into the architecture of modern neural networks, from perceptrons to deep nets.",
    duration: "2.0 hours",
    rating: 4.9,
    categoryTag: "MACHINE",
    ctaLabel: "Start Tutorial",
  },
  {
    id: "realtime-financial-dashboard",
    type: "PROJECT",
    difficulty: "Advanced",
    title: "Real-time Financial Dashboard",
    description:
      "Architect a high-performance streaming dashboard using Apache Kafka and interactive charts.",
    duration: "8.0 hours",
    rating: 4.7,
    categoryTag: "DATA",
    ctaLabel: "Start Project",
  },
];
