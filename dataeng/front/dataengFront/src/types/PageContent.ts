export interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'stats' | 'articles' | 'testimonials' | 'cta' | 'custom';
  order: number;
  visible: boolean;
}

export interface PageInfo {
  id: string;
  name: string;
  path: string;
  description: string;
  sections: PageSection[];
  lastModified: Date;
  status: 'active' | 'maintenance' | 'draft';
}

export interface PageContentState {
  pages: PageInfo[];
  currentPage: PageInfo | null;
  isLoading: boolean;
  error: string | null;
}
