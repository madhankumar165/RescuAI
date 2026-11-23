export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface ResourceNeed {
  resource_name: string;
  urgency_level: string;
}

export interface Message {
  id: number;
  original_text: string;
  cleaned_text?: string;
  language: string;
  is_emergency: boolean;
  disaster_type: string;
  priority_level: 'Critical' | 'High' | 'Medium' | 'Low';
  severity_score: number;
  is_real?: boolean;
  authenticity_score?: number;
  authenticity_status?: string;
  verification_flags?: string[];
  location_name?: string;
  latitude?: number;
  longitude?: number;
  victim_count: number;
  phone_number?: string;
  organization?: string;
  contains_children: boolean;
  contains_women: boolean;
  contains_elderly: boolean;
  contains_disabled: boolean;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Resolved';
  assigned_to?: string;
  confidence_score: number;
  explanation?: string;
  is_duplicate: boolean;
  duplicate_of_id?: number;
  created_at: string;
  resources: ResourceNeed[];
}

export interface DashboardStats {
  total_requests: number;
  critical_requests: number;
  high_requests: number;
  medium_requests: number;
  low_requests: number;
  resolved_requests: number;
  pending_requests: number;
  in_progress_requests: number;
  total_victims_impacted: number;
  disaster_breakdown: Record<string, number>;
  resource_demands: Record<string, number>;
  priority_breakdown: Record<string, number>;
  status_breakdown: Record<string, number>;
}

export interface TimelinePoint {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface MapMarkerItem {
  id: number;
  title: string;
  text: string;
  location_name: string;
  latitude: number;
  longitude: number;
  priority: string;
  severity_score: number;
  victim_count: number;
  status: string;
  resources: string[];
  created_at: string;
}

export interface PreprocessResult {
  original_text: string;
  cleaned_text: string;
  language: string;
  tokens: string[];
  lemmas: string[];
  removed_stopwords: string[];
  removed_emojis: string[];
  removed_urls: string[];
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  sqlIntent?: string;
  data?: Record<string, any>[];
  totalMatches?: number;
}
