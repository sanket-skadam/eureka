import sys
import os
import uvicorn

# Ensure repository root is on Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))

if __name__ == "__main__":
    from backend.app.core.config import settings
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=settings.PORT, reload=False)
