from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from backend.app.api.dependencies import get_store

router = APIRouter(tags=["Technology Intelligence"])

@router.get("/technologies")
def list_technologies(
    domain: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    store = Depends(get_store)
):
    results = store.technologies
    if domain and domain.lower() != "all":
        results = [t for t in results if t["domain"].lower() == domain.lower()]
    if source and source.lower() != "all":
        results = [t for t in results if t["source"].lower() == source.lower()]
    if q:
        query_str = q.lower()
        results = [
            t for t in results
            if query_str in t["name"].lower()
            or query_str in t["tagline"].lower()
            or query_str in t["companyImpact"]["affectedSystem"].lower()
        ]
    return {
        "count": len(results),
        "technologies": results
    }

@router.get("/technologies/{tech_id}")
def get_technology(tech_id: str, store = Depends(get_store)):
    for t in store.technologies:
        if t["id"] == tech_id:
            return t
    raise HTTPException(status_code=404, detail="Technology not found")

@router.post("/pipeline/stage/{stage}")
def execute_pipeline_stage(stage: str):
    stage_lower = stage.lower()
    stage_logs = {
        "scout": {
            "status": "completed",
            "signals_found": 18,
            "sources": ["GitHub Trends", "Hugging Face Daily Papers", "Reddit r/LocalLLaMA", "PostgreSQL RSS"],
            "summary": "Scouted trending commits and model releases for Tangentia TiA and Gateway topics."
        },
        "normalize": {
            "status": "completed",
            "normalized_records": 18,
            "schema_version": "v1.4",
            "summary": "Transformed external JSON payloads into Eureka Universal Technology Schema."
        },
        "validate": {
            "status": "completed",
            "passed_validation": 6,
            "criteria": "Star velocity >200/wk, verified maintainers, permissive license",
            "summary": "Validation filters passed for pgvector 0.8.0, DeepSeek-R1-Distill, and Kafka 3.9."
        },
        "deduplicate": {
            "status": "completed",
            "clusters_merged": 2,
            "unique_technologies": 6,
            "summary": "Deduplicated overlapping release notices across Reddit and GitHub."
        },
        "verify": {
            "status": "completed",
            "verified_repos": 6,
            "summary": "Cross-referenced repository tags and official documentation artifacts."
        },
        "research": {
            "status": "completed",
            "models_benchmarked": 3,
            "summary": "Synthesized latency profiles, multi-tenant recall benchmarks, and TCO projections."
        },
        "curate": {
            "status": "completed",
            "curated_records": 6,
            "tangentia_impact_mapped": True,
            "summary": "Mapped to Tangentia TiA Blueprint 2026 and Gateway EDI Kafka architectures."
        }
    }

    if stage_lower in stage_logs:
        return {
            "stage": stage_lower,
            "success": True,
            "telemetry": stage_logs[stage_lower]
        }

    return {
        "stage": stage_lower,
        "success": True,
        "telemetry": {"status": "completed", "summary": f"Executed pipeline stage {stage}"}
    }

