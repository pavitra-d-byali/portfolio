from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Portfolio Models
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str

class PersonalInfo(BaseModel):
    name: str
    displayName: str
    title: str
    tagline: str
    location: str
    email: str
    phone: str
    linkedin: str
    github: str
    bio: str
    careerGoals: Dict[str, Any]

class PortfolioData(BaseModel):
    personalInfo: PersonalInfo
    technicalSkills: Dict[str, List[str]]
    certifications: List[Dict[str, Any]]
    projects: List[Dict[str, Any]]
    socialLinks: List[Dict[str, str]]
    navigation: List[Dict[str, str]]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Portfolio API Endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact: ContactSubmission):
    """Handle contact form submissions"""
    try:
        # Create contact record with metadata
        contact_record = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "timestamp": datetime.utcnow(),
            "status": "new"
        }
        
        # Store in database
        result = await db.contacts.insert_one(contact_record)
        
        if result.inserted_id:
            logger.info(f"Contact form submitted by {contact.name} ({contact.email})")
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon."
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact form")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/portfolio")
async def get_portfolio_data():
    """Get dynamic portfolio data"""
    try:
        # Portfolio data (this could be stored in database for dynamic updates)
        portfolio_data = {
            "personalInfo": {
                "name": "Pavitra D B",
                "displayName": "Pavitra Byali",
                "title": "AI/ML Engineering Student",
                "tagline": "Code. Build. Inspire.",
                "location": "Bengaluru, Karnataka, India",
                "email": "pavitrabyali6@gmail.com",
                "phone": "+91 74831 45071",
                "linkedin": "https://www.linkedin.com/in/pavitra-byali-763b57301",
                "github": "https://github.com/pavitra-d-byali",
                "bio": "I'm Pavitra Byali, a B.Tech CSE (AI & ML) student at Alliance University, Bengaluru. I'm passionate about artificial intelligence, data science, and building impactful tech solutions for real-world problems.",
                "careerGoals": {
                    "targetRole": "AI/ML Engineer",
                    "interestAreas": ["Artificial Intelligence", "Data Science", "Full-Stack Development", "Cloud Computing"]
                }
            },
            "technicalSkills": {
                "languages": ["C", "C++", "Python", "SQL", "HTML", "CSS", "JavaScript", "TypeScript", "Java", "PHP", "Bash"],
                "frontend": ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "React.js"],
                "backend": ["Node.js", "Express.js", "Flask", "RESTful APIs"],
                "frameworks": ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Express.js"],
                "databases": ["MySQL", "MongoDB", "PostgreSQL"],
                "cloudDevOps": ["AWS (EC2, S3)", "Docker", "GitHub Actions"],
                "tools": ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
                "deployment": ["GitHub Pages", "Google Colab"],
                "others": ["Responsive Web Design", "API Integration", "Data Visualization"]
            },
            "certifications": [
                {
                    "id": 1,
                    "title": "C++ Specialization",
                    "provider": "Coursera",
                    "date": "October 2024",
                    "status": "Completed"
                },
                {
                    "id": 2,
                    "title": "Python for Data Science",
                    "provider": "Coursera",
                    "date": "2024",
                    "status": "Completed"
                }
            ],
            "projects": [
                {
                    "id": 1,
                    "title": "Advanced E-commerce Platform",
                    "description": "Full-stack e-commerce app with secure login, payment, admin dashboard, and product management.",
                    "technologies": ["React.js", "Vite", "Tailwind CSS", "Express.js", "Node.js", "MongoDB", "JWT", "Stripe API"],
                    "github": "https://github.com/pavitra-d-byali/advanced-ecommerce-platform",
                    "features": [
                        "Secure user authentication with JWT",
                        "Payment integration with Stripe API",
                        "Admin dashboard for product management",
                        "Responsive design with Tailwind CSS",
                        "Real-time inventory tracking"
                    ],
                    "status": "Completed"
                },
                {
                    "id": 2,
                    "title": "Real-time Collaborative Project Management Tool",
                    "description": "Web app for task and team management with live collaboration and notifications.",
                    "technologies": ["Next.js", "Express.js", "MongoDB", "Socket.IO", "Redis", "AWS", "Docker"],
                    "github": "https://github.com/pavitra-d-byali/project-management-tool",
                    "features": [
                        "Drag-and-drop Kanban board",
                        "Live chat and notifications",
                        "Optimistic UI updates",
                        "Role-based access control",
                        "Real-time collaboration"
                    ],
                    "status": "In Progress"
                }
            ],
            "socialLinks": [
                {
                    "name": "GitHub",
                    "url": "https://github.com/pavitra-d-byali",
                    "icon": "github"
                },
                {
                    "name": "LinkedIn",
                    "url": "https://www.linkedin.com/in/pavitra-byali-763b57301",
                    "icon": "linkedin"
                },
                {
                    "name": "Email",
                    "url": "mailto:pavitrabyali6@gmail.com",
                    "icon": "mail"
                }
            ],
            "navigation": [
                {"name": "Home", "href": "#home"},
                {"name": "About", "href": "#about"},
                {"name": "Skills", "href": "#skills"},
                {"name": "Projects", "href": "#projects"},
                {"name": "Certifications", "href": "#certifications"},
                {"name": "Contact", "href": "#contact"}
            ]
        }
        
        return portfolio_data
        
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/resume/download")
async def download_resume():
    """Download resume PDF file"""
    try:
        # Path to resume file (you can upload a resume.pdf to this location)
        resume_path = Path(ROOT_DIR) / "static" / "Pavitra_Byali_Resume.pdf"
        
        if resume_path.exists():
            return FileResponse(
                path=resume_path,
                filename="Pavitra_Byali_Resume.pdf",
                media_type="application/pdf"
            )
        else:
            raise HTTPException(
                status_code=404, 
                detail="Resume file not found. Please contact the administrator."
            )
            
    except HTTPException:
        # Re-raise HTTPExceptions as-is
        raise
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contacts")
async def get_all_contacts():
    """Get all contact form submissions (admin endpoint)"""
    try:
        contacts = await db.contacts.find().sort("timestamp", -1).to_list(1000)
        
        # Convert MongoDB documents to JSON-serializable format
        serialized_contacts = []
        for contact in contacts:
            # Remove MongoDB's _id field and keep our custom id
            if '_id' in contact:
                del contact['_id']
            serialized_contacts.append(contact)
        
        return serialized_contacts
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
