from fastapi import Header
from typing import Optional
from backend.app.database.tangentia_store import store

def get_store():
    return store

def get_current_org_id(x_org_id: Optional[str] = Header(None)) -> str:
    if x_org_id:
        return x_org_id
    return store.active_org_id
