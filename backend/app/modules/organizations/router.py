from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from backend.app.api.dependencies import get_store

router = APIRouter(tags=["Organizations & Workspaces"])

class SwitchWorkspaceRequest(BaseModel):
    org_id: str

@router.get("/organizations")
def list_organizations(store = Depends(get_store)):
    return {
        "organizations": store.organizations,
        "active_org_id": store.active_org_id
    }

@router.get("/organizations/{org_id}")
def get_organization(org_id: str, store = Depends(get_store)):
    for o in store.organizations:
        if o["id"] == org_id:
            return o
    raise HTTPException(status_code=404, detail="Organization not found")

@router.post("/workspaces/switch")
def switch_workspace(req: SwitchWorkspaceRequest, store = Depends(get_store)):
    for o in store.organizations:
        if o["id"] == req.org_id:
            store.active_org_id = req.org_id
            return {
                "success": True,
                "message": f"Switched workspace to {o['name']}",
                "active_org": o
            }
    raise HTTPException(status_code=404, detail="Organization not found")

