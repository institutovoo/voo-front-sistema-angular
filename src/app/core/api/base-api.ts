import { HttpHeaders } from '@angular/common/http';

export const API_CONFIG = {
  BASE_URL: 'https://x731ns5xo5.execute-api.us-east-1.amazonaws.com',
};

export function getCommonHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
  });
}
