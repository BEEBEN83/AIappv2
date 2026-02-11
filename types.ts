export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  COURSE = 'COURSE',
  POLICY = 'POLICY',
  MENTOR = 'MENTOR'
}

export enum BlockType {
  TEXT = 'text',
  CALLOUT = 'callout',
  POLICY_RULE = 'policy-rule',
  ASSIGNMENT = 'assignment',
  IMAGE = 'image',
  LIST = 'list'
}

export interface ContentBlock {
  type: BlockType;
  content: string | string[];
  title?: string;
  id?: string; // Required for assignments
  variant?: 'info' | 'warning' | 'success' | 'tip'; // For callouts
}

export interface Module {
  id: string;
  title: string;
  description: string;
  sections: {
    title: string;
    blocks: ContentBlock[];
  }[];
}

export interface PolicySection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    content: string[];
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
