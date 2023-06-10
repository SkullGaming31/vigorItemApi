export default interface MessageResponse {
  notes?: string;
  greeting?: string;
  message: string;
  endpoints?: Endpoint[];
}

interface Endpoint {
  label: string;
  endpoint: string;
}