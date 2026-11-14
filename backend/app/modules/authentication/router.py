from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = None

@router.get("/session")
def get_session():
    return {
        "authenticated": True,
        "user": {
            "id": "usr_ananya_deshmukh",
            "name": "Ananya Deshmukh",
            "email": "ananya.d@tangentia.com",
            "role": "Staff Platform Architect",
            "department": "Intelligent Automation (TiA)",
            "organization_id": "org_tangentia_global"
        },
        "permissions": ["read:technologies", "write:documents", "execute:sandbox", "manage:org"]
    }

@router.post("/login")
def login(req: LoginRequest):
    return {
        "access_token": "mock_jwt_tangentia_ananya",
        "token_type": "bearer",
        "user": {
            "id": "usr_ananya_deshmukh",
            "name": "Ananya Deshmukh",
            "email": req.email,
            "role": "Staff Platform Architect",
            "organization_id": "org_tangentia_global"
        }
    }

