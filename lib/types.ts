export type ProjectMetadata = {
  // --- Core & SEO Fields (Required) --- //
  title: string;
  excerpt: string;
  mainImage: string;
  completionDate: string;

  // --- Content & Display (Optional) --- //
  galleryImages?: string[];
  demoVideoUrl?: string;
  featured?: boolean;
  status?: "completed" | "in-progress" | "archived";

  // --- Project Context (Optional) --- //
  startDate?: string;
  role?: string;
  client?: string;
  clientUrl?: string;

  // --- Technical Vitals (Optional) --- //
  technologies?: string[];
  tags?: string[];
  repository?: string;
  liveUrl?: string;
};

export type BlogPostMetadata = {
  // --- Core & SEO Fields (Required) --- //
  title: string;
  publishedDate: string;
  excerpt: string;

  // --- Content & Display (Optional) --- //
  mainImage?: string;
  socialImage?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  lastUpdated?: string;
  showToc?: boolean;

  // --- Promotion & SEO (Optional) --- //
  featured?: boolean;
  canonicalUrl?: string;
  keywords?: string[];

  // --- Portfolio & Series Context (Optional) --- //
  relatedProjects?: string[];
  series?: {
    title: string;
    part: number;
  }
};
