from fastapi import FastAPI
from core import models
from core.database import engine
from endpoints import admin, user, pairs, currency
from fastapi.middleware.cors import CORSMiddleware
from core import crud

models.Base.metadata.create_all(bind=engine)
crud.create_default_config(next(admin.get_db()))
app = FastAPI(docs_url="/api", redoc_url="/api/redoc", openapi_url="/api/openapi.json")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router, prefix="/api/admin")
app.include_router(user.router, prefix="/api")
app.include_router(pairs.router, prefix="/api/pair")
app.include_router(currency.router, prefix="/api/currency")