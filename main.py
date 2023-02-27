from fastapi import FastAPI
from core import models
from core.database import engine
from endpoints import admin
from fastapi.middleware.cors import CORSMiddleware
from core import crud

models.Base.metadata.create_all(bind=engine)
crud.create_default_config(next(admin.get_db()))
app = FastAPI(docs_url="/api", redoc_url="/api/redoc", openapi_url="/api/openapi.json")

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router, prefix="/api/admin")
