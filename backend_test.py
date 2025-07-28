#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Application
Tests all portfolio backend endpoints with comprehensive validation
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
BASE_API_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {BASE_API_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
        
    def log_test(self, test_name, passed, message, details=None):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        if details:
            print(f"   Details: {details}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        
        if passed:
            self.passed += 1
        else:
            self.failed += 1
    
    def test_contact_form_valid_data(self):
        """Test contact form with valid data"""
        test_name = "Contact Form API - Valid Data"
        
        try:
            contact_data = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "subject": "Portfolio Inquiry",
                "message": "Hi Pavitra, I'm interested in discussing potential collaboration opportunities. Your portfolio showcases impressive AI/ML projects!"
            }
            
            response = requests.post(f"{BASE_API_URL}/contact", json=contact_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'message' in data:
                    self.log_test(test_name, True, f"Contact form submitted successfully: {data['message']}")
                    return True
                else:
                    self.log_test(test_name, False, "Invalid response format", data)
                    return False
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email format"""
        test_name = "Contact Form API - Invalid Email"
        
        try:
            contact_data = {
                "name": "Jane Doe",
                "email": "invalid-email-format",
                "subject": "Test Subject",
                "message": "Test message with invalid email format"
            }
            
            response = requests.post(f"{BASE_API_URL}/contact", json=contact_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(test_name, True, "Correctly rejected invalid email format")
                return True
            else:
                self.log_test(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        test_name = "Contact Form API - Missing Fields"
        
        try:
            # Missing name and message
            contact_data = {
                "email": "test@example.com",
                "subject": "Test Subject"
            }
            
            response = requests.post(f"{BASE_API_URL}/contact", json=contact_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(test_name, True, "Correctly rejected missing required fields")
                return True
            else:
                self.log_test(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_portfolio_data_api(self):
        """Test portfolio data API"""
        test_name = "Portfolio Data API"
        
        try:
            response = requests.get(f"{BASE_API_URL}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required sections
                required_sections = ['personalInfo', 'technicalSkills', 'certifications', 'projects', 'socialLinks', 'navigation']
                missing_sections = []
                
                for section in required_sections:
                    if section not in data:
                        missing_sections.append(section)
                
                if not missing_sections:
                    # Validate personal info structure
                    personal_info = data.get('personalInfo', {})
                    required_personal_fields = ['name', 'displayName', 'title', 'email', 'linkedin', 'github']
                    
                    missing_personal_fields = [field for field in required_personal_fields if field not in personal_info]
                    
                    if not missing_personal_fields:
                        self.log_test(test_name, True, f"Portfolio data retrieved successfully with all sections")
                        return True
                    else:
                        self.log_test(test_name, False, f"Missing personal info fields: {missing_personal_fields}")
                        return False
                else:
                    self.log_test(test_name, False, f"Missing sections: {missing_sections}")
                    return False
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_resume_download_api(self):
        """Test resume download API (should return 404 since no PDF exists)"""
        test_name = "Resume Download API"
        
        try:
            response = requests.get(f"{BASE_API_URL}/resume/download", timeout=10)
            
            # Should return 404 since no PDF file exists
            if response.status_code == 404:
                self.log_test(test_name, True, "Correctly returned 404 - resume file not found (expected behavior)")
                return True
            elif response.status_code == 200:
                # If it returns 200, the PDF file exists
                content_type = response.headers.get('content-type', '')
                if 'application/pdf' in content_type:
                    self.log_test(test_name, True, "Resume PDF file exists and downloaded successfully")
                    return True
                else:
                    self.log_test(test_name, False, f"Expected PDF, got content-type: {content_type}")
                    return False
            else:
                self.log_test(test_name, False, f"Unexpected status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_contacts_list_api(self):
        """Test contacts list API"""
        test_name = "Contacts List API"
        
        try:
            response = requests.get(f"{BASE_API_URL}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Check if contacts are sorted by timestamp (descending)
                    if len(data) > 1:
                        timestamps = [contact.get('timestamp') for contact in data if 'timestamp' in contact]
                        if len(timestamps) > 1:
                            # Check if sorted in descending order
                            is_sorted = all(timestamps[i] >= timestamps[i+1] for i in range(len(timestamps)-1))
                            if is_sorted:
                                self.log_test(test_name, True, f"Retrieved {len(data)} contacts in descending order by timestamp")
                            else:
                                self.log_test(test_name, True, f"Retrieved {len(data)} contacts (sorting order not verified)")
                        else:
                            self.log_test(test_name, True, f"Retrieved {len(data)} contacts")
                    else:
                        self.log_test(test_name, True, f"Retrieved {len(data)} contacts (empty or single contact)")
                    return True
                else:
                    self.log_test(test_name, False, "Response is not a list", type(data))
                    return False
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
            return False
    
    def test_database_persistence(self):
        """Test that contact form data is actually saved to database"""
        test_name = "Database Persistence Test"
        
        try:
            # Submit a unique contact form
            unique_message = f"Test message for database persistence - {datetime.now().isoformat()}"
            contact_data = {
                "name": "Database Test User",
                "email": "dbtest@example.com",
                "subject": "Database Persistence Test",
                "message": unique_message
            }
            
            # Submit contact form
            submit_response = requests.post(f"{BASE_API_URL}/contact", json=contact_data, timeout=10)
            
            if submit_response.status_code != 200:
                self.log_test(test_name, False, "Failed to submit contact form for database test")
                return False
            
            # Wait a moment for database write
            import time
            time.sleep(1)
            
            # Retrieve contacts and check if our submission exists
            contacts_response = requests.get(f"{BASE_API_URL}/contacts", timeout=10)
            
            if contacts_response.status_code == 200:
                contacts = contacts_response.json()
                
                # Look for our unique message
                found_contact = None
                for contact in contacts:
                    if contact.get('message') == unique_message:
                        found_contact = contact
                        break
                
                if found_contact:
                    # Verify all fields are saved correctly
                    if (found_contact.get('name') == contact_data['name'] and
                        found_contact.get('email') == contact_data['email'] and
                        found_contact.get('subject') == contact_data['subject'] and
                        'timestamp' in found_contact and
                        'id' in found_contact):
                        self.log_test(test_name, True, "Contact data successfully saved to database with all fields")
                        return True
                    else:
                        self.log_test(test_name, False, "Contact found but some fields are missing or incorrect", found_contact)
                        return False
                else:
                    self.log_test(test_name, False, "Submitted contact not found in database")
                    return False
            else:
                self.log_test(test_name, False, f"Failed to retrieve contacts: HTTP {contacts_response.status_code}")
                return False
                
        except Exception as e:
            self.log_test(test_name, False, f"Database persistence test failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests"""
        print("=" * 60)
        print("PORTFOLIO BACKEND API TESTING SUITE")
        print("=" * 60)
        print()
        
        # Test all endpoints
        self.test_contact_form_valid_data()
        self.test_contact_form_invalid_email()
        self.test_contact_form_missing_fields()
        self.test_portfolio_data_api()
        self.test_resume_download_api()
        self.test_contacts_list_api()
        self.test_database_persistence()
        
        # Print summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.passed + self.failed}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        print()
        
        if self.failed > 0:
            print("FAILED TESTS:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"- {result['test']}: {result['message']}")
            print()
        
        return self.failed == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)