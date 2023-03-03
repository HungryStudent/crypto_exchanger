from typing import List

from fastapi import Depends

from sqlalchemy.orm import Session

from core import crud
from core import schemas
from fastapi import APIRouter

from core.database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



