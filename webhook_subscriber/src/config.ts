export interface EndpointConfig {
    path: string;
    secret: string;
}
  
// List of endpoints with their configurations
export const endpoints: EndpointConfig[] = [
    { path: '/1', secret: '...' },
    { path: '/2', secret: '...' },
];