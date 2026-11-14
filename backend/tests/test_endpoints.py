import sys
import os

# Add root directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend.app.database.tangentia_store import store
from backend.app.modules.technology.router import list_technologies, execute_pipeline_stage
from backend.app.modules.enterprise.router import rag_retrieve, RAGRetrieveRequest
from backend.app.modules.skills.router import list_skill_gaps
from backend.app.modules.learning.router import execute_sandbox, ExecuteSandboxRequest
from backend.app.modules.digest.router import dispatch_test_digest, TestDispatchRequest

def test_endpoints():
    print("Testing Tangentia Store...")
    assert len(store.technologies) == 6
    assert len(store.documents) == 4
    assert len(store.employees) == 6
    print(f"Store OK: {len(store.technologies)} technologies, {len(store.documents)} documents, {len(store.employees)} employees.")

    print("\nTesting list_technologies...")
    res = list_technologies(domain=None, source=None, q=None, store=store)
    assert res["count"] == 6
    print(f"Technologies OK: {res['count']} items returned.")

    print("\nTesting pipeline stage execution...")
    p_res = execute_pipeline_stage("scout")
    assert p_res["success"] is True
    print(f"Pipeline scout OK: {p_res['telemetry']['summary']}")

    print("\nTesting RAG retrieve...")
    req = RAGRetrieveRequest(query="How does pgvector 0.8 improve Tangentia TiA exception search?")
    rag_res = rag_retrieve(req, store=store)
    assert rag_res["confidenceScore"] > 90
    print(f"RAG retrieve OK: synthesis has {len(rag_res['synthesis'])} chars, {len(rag_res['matchedDocs'])} docs matched.")

    print("\nTesting Skill Gaps...")
    gaps_res = list_skill_gaps(severity=None, store=store)
    assert gaps_res["count"] == 4
    print(f"Skill gaps OK: {gaps_res['count']} gaps.")

    print("\nTesting Learning Sandbox...")
    sand_res = execute_sandbox(ExecuteSandboxRequest(module_id="mod-hnsw-fix", code="SET hnsw.iterative_scan = 'strict_order';"), store=store)
    assert sand_res["status"] == "PASS"
    print(f"Learning sandbox OK: status {sand_res['status']}.")

    print("\nTesting Digest Dispatch...")
    dispatch_res = dispatch_test_digest(TestDispatchRequest(recipient_email="ananya.d@tangentia.com"))
    assert dispatch_res["success"] is True
    print(f"Digest dispatch OK: {dispatch_res['message']}")

    print("\n===========================================")
    print("ALL BACKEND MODULE TESTS COMPLETED 100% OK!")
    print("===========================================")

if __name__ == "__main__":
    test_endpoints()
