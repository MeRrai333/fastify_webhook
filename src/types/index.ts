export interface SubscribeRequest {
  url: string;
}

export interface UnsubscribeRequest {
  sub_id: number;
}

export interface ProvideDataRequest {
  message: string;
}

export interface AskRequest {
  tx_id: number;
}

export interface DataEntry {
  data: Record<string, any>;
  timestamp: string;
  id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AskResponse {
  question: string;
  answer: string;
  context: string | null;
  processed_at: string;
  available_data_keys: string[];
  relevant_data?: Array<{ key: string } & DataEntry>;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  subscribers_count: number;
  data_entries_count: number;
}