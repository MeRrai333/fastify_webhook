export interface HealthResponse {
  status: string;
  timestamp: string;
  subscribers_count: number;
  data_entries_count: number;
}

export interface HookRequest {
  payload: string;
}