export type ProjectMetadata = {
  // --- Required Fields --- //
  title: string;
  publishedDate: string;

  // --- Optional Fields --- //
  mainImage?: string;
  tags?: string[];

  // --- Case Study Details --- //
  caseStudy?: {
    myRole: string;
    client: string;
    clientUrl?: string;
  };

  // --- Project Details --- //
  timeLine?: string;
  technologies?: string[];
  repository?: string;
  liveUrl?: string;
};
