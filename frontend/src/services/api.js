import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioAPI = {
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

  downloadResume: async () => {
    try {
      const response = await api.get('/resume/download', {
        responseType: 'blob',
      });

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
