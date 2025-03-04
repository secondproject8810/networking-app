import { API_BASE_URL, ENDPOINTS } from '../config/api';

// Generic fetch wrapper with error handling
const fetchWrapper = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Profiles API
export const getProfiles = () => fetchWrapper(ENDPOINTS.PROFILES);
export const getProfile = (id) => fetchWrapper(`${ENDPOINTS.PROFILES}/${id}`);
export const updateProfile = (id, data) => fetchWrapper(`${ENDPOINTS.PROFILES}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

// Connections API
export const getConnections = () => fetchWrapper(ENDPOINTS.CONNECTIONS);
export const createConnection = (data) => fetchWrapper(ENDPOINTS.CONNECTIONS, {
  method: 'POST',
  body: JSON.stringify(data),
});

// Events API
export const getEvents = () => fetchWrapper(ENDPOINTS.EVENTS);
export const getEvent = (id) => fetchWrapper(`${ENDPOINTS.EVENTS}/${id}`);
export const createEvent = (data) => fetchWrapper(ENDPOINTS.EVENTS, {
  method: 'POST',
  body: JSON.stringify(data),
});
export const joinEvent = (eventId) => fetchWrapper(`${ENDPOINTS.JOIN}/${eventId}`, {
  method: 'POST',
}); 