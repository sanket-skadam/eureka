from fastapi import APIRouter
from backend.app.modules.authentication.router import router as auth_router
from backend.app.modules.organizations.router import router as org_router
from backend.app.modules.technology.router import router as tech_router
from backend.app.modules.enterprise.router import router as enterprise_router
from backend.app.modules.skills.router import router as skills_router
from backend.app.modules.learning.router import router as learning_router
from backend.app.modules.adoption.router import router as adoption_router
from backend.app.modules.digest.router import router as digest_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(org_router)
api_router.include_router(tech_router)
api_router.include_router(enterprise_router)
api_router.include_router(skills_router)
api_router.include_router(learning_router)
api_router.include_router(adoption_router)
api_router.include_router(digest_router)
