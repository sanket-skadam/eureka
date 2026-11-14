from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.api.router import api_router

app = FastAPI(
    title=settings.APP_NAME,
    description="Eureka Enterprise Technology & Workforce Intelligence API — Modular FastAPI Backend",
    version="1.4.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Health Checks
@app.get("/health", tags=["System"])
@app.get("/api/v1/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": "1.4.0",
        "active_organization": settings.ACTIVE_ORG_NAME,
        "active_org_id": settings.ACTIVE_ORG_ID,
        "pgvector_status": "active",
        "rls_enforcement": "active"
    }

# Mount modular API v1
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.on_event("startup")
async def startup_event():
    logger.info("=================================================================")
    logger.info("Eureka Enterprise Technology & Workforce Intelligence Backend")
    logger.info(f"Active Workspace: {settings.ACTIVE_ORG_NAME} ({settings.ACTIVE_ORG_ID})")
    logger.info(f"FastAPI endpoints mounted under {settings.API_V1_PREFIX}")
    logger.info("Swagger documentation available at /docs")
    logger.info("=================================================================")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)

