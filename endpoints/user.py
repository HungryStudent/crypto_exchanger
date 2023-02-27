from typing import List

from fastapi import APIRouter, Depends, Cookie, HTTPException, File, UploadFile, Form, Header
from fastapi import Response

from sqlalchemy.orm import Session

from core.database import SessionLocal
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


@router.get('/currency', response_model=List[schemas.CurrencyOut], tags=["Currencies"])
async def get_currencies(db: Session = Depends(get_db)):
    return crud.get_currency(db)


@router.get('/currency/{currency_id}', response_model=schemas.CurrencyOut, tags=["Currencies"])
async def get_currency(currency_id, db: Session = Depends(get_db)):
    return crud.get_currency(db, currency_id)
