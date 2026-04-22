import { useState } from 'react';
import type { PageInfo, PageContentState } from '../../../types/PageContent';
import { initialPageData } from '../../../data/pageContentData';

export const usePageContent = () => {
  const [state, setState] = useState<PageContentState>({
    pages: initialPageData,
    currentPage: null,
    isLoading: false,
    error: null
  });

  const selectPage = (pageId: string) => {
    const page = state.pages.find(p => p.id === pageId);
    setState(prev => ({ ...prev, currentPage: page || null }));
  };

  const updateSection = (pageId: string, sectionId: string, content: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              sections: page.sections.map(section =>
                section.id === sectionId 
                  ? { ...section, content }
                  : section
              ),
              lastModified: new Date()
            }
          : page
      )
    }));
  };

  const addSection = (pageId: string, section: Omit<PageInfo['sections'][0], 'id'>) => {
    const newSection = {
      ...section,
      id: `section-${Date.now()}`
    };

    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              sections: [...page.sections, newSection].sort((a, b) => a.order - b.order),
              lastModified: new Date()
            }
          : page
      )
    }));
  };

  const removeSection = (pageId: string, sectionId: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.filter(section => section.id !== sectionId),
              lastModified: new Date()
            }
          : page
      )
    }));
  };

  const toggleSectionVisibility = (pageId: string, sectionId: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map(section =>
                section.id === sectionId
                  ? { ...section, visible: !section.visible }
                  : section
              ),
              lastModified: new Date()
            }
          : page
      )
    }));
  };

  const updatePageStatus = (pageId: string, status: PageInfo['status']) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? { ...page, status, lastModified: new Date() }
          : page
      )
    }));
  };

  return {
    ...state,
    selectPage,
    updateSection,
    addSection,
    removeSection,
    toggleSectionVisibility,
    updatePageStatus
  };
};
