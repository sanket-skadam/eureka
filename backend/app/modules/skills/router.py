from fastapi import APIRouter, Depends
from typing import Optional
from backend.app.api.dependencies import get_store

router = APIRouter(prefix="/skills", tags=["Workforce Skill Intelligence"])

@router.get("/gaps")
def list_skill_gaps(severity: Optional[str] = None, store = Depends(get_store)):
    gaps = store.skill_gaps
    if severity and severity.lower() != "all":
        gaps = [g for g in gaps if g["severity"].lower() == severity.lower()]
    return {
        "count": len(gaps),
        "skill_gaps": gaps
    }

@router.get("/employees")
def list_employees(department: Optional[str] = None, store = Depends(get_store)):
    emps = store.employees
    if department and department.lower() != "all":
        emps = [e for e in emps if e["department"].lower() == department.lower()]
    return {
        "count": len(emps),
        "employees": emps
    }

