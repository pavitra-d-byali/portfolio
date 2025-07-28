import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const portfolioAPI = {
  // Contact form submission
  submitContactForm: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        'Failed to send message. Please try again.'
      );
    }
  },

  // Get portfolio data
  getPortfolioData: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        'Failed to load portfolio data.'
      );
    }
  },

  // Download resume
  downloadResume: async () => {
    try {
      const response = await api.get('/resume/download', {
        responseType: 'blob',
      });
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Pavitra_Byali_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Resume downloaded successfully!' };
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        'Resume download failed. Please try again.'
      );
    }
  },

  // Get all contacts (admin function)
  getAllContacts: async () => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        'Failed to fetch contacts.'
      );
    }
  }
};

export default portfolioAPI;