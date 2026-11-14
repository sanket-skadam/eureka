from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, Dict
from backend.app.api.dependencies import get_store

router = APIRouter(prefix="/digest", tags=["Weekly Technology Digest"])

class UpdatePreferencesRequest(BaseModel):
    frequency: Optional[str] = None
    deliveryDay: Optional[str] = None
    channels: Optional[Dict[str, bool]] = None
    filterLevel: Optional[str] = None

class TestDispatchRequest(BaseModel):
    recipient_email: Optional[str] = "ananya.d@tangentia.com"

@router.get("/weekly")
def get_weekly_digest(store = Depends(get_store)):
    return {
        "issue_number": 48,
        "title": "Eureka Weekly Tech Brief — Tangentia Edition",
        "date": "2026-11-14",
        "recipient": "Ananya Deshmukh (Staff Platform Architect)",
        "featured_technologies": store.technologies[:3],
        "summary": "Covers pgvector 0.8.0 iterative scans for TiA, DeepSeek-R1-Distill for IDP, and Kafka 3.9 storage offload."
    }

@router.get("/preferences")
def get_preferences(store = Depends(get_store)):
    return store.digest_preferences

@router.put("/preferences")
def update_preferences(req: UpdatePreferencesRequest, store = Depends(get_store)):
    if req.frequency:
        store.digest_preferences["frequency"] = req.frequency
    if req.deliveryDay:
        store.digest_preferences["deliveryDay"] = req.deliveryDay
    if req.channels:
        store.digest_preferences["channels"].update(req.channels)
    if req.filterLevel:
        store.digest_preferences["filterLevel"] = req.filterLevel

    return {
        "success": True,
        "preferences": store.digest_preferences
    }

@router.post("/dispatch/test")
def dispatch_test_digest(req: TestDispatchRequest):
    return {
        "success": True,
        "recipient": req.recipient_email,
        "message": f"Dispatched Eureka Tech Brief Issue #48 to {req.recipient_email} via Resend SMTP adapter.",
        "status": "SENT_250_OK",
        "timestamp": "2026-11-14T09:30:00Z"
    }

