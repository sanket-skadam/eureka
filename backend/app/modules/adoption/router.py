from fastapi import APIRouter, Depends, HTTPException
from backend.app.api.dependencies import get_store

router = APIRouter(prefix="/adoption", tags=["Technology Adoption Advisor"])

@router.get("/comparisons")
def list_comparisons(store = Depends(get_store)):
    return {
        "count": len(store.adoption_comparisons),
        "comparisons": store.adoption_comparisons
    }

@router.post("/dossier/{comp_id}")
def generate_dossier(comp_id: str, store = Depends(get_store)):
    comp = next((c for c in store.adoption_comparisons if c["id"] == comp_id), None)
    if not comp:
        comp = store.adoption_comparisons[0]

    return {
        "success": True,
        "dossier_id": f"dos-{comp_id}-2026",
        "title": comp["title"],
        "recommended_option": comp["options"][0]["name"],
        "verdict": comp["verdict"],
        "recommendation_reason": comp["recommendationReason"],
        "projected_tangentia_annual_roi": "$42,000",
        "export_format": "PDF / Markdown Dossier",
        "generated_for": "Tangentia Architecture Review Board"
    }
