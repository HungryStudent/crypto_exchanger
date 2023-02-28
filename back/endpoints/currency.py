from typing import List

from fastapi import APIRouter, Depends, HTTPException, Header

from sqlalchemy.orm import Session

from core.database import SessionLocal
from core import crud
from core import schemas
from endpoints.admin import check_admin_token
from configs import admin_info, true_admin_token

router = APIRouter(tags=["Currencies"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/', response_model=List[schemas.CurrencyOut])
async def get_currencies(db: Session = Depends(get_db)):
    return crud.get_currency(db)


@router.get('/{currency_id}', response_model=schemas.CurrencyOut)
async def get_currency(currency_id, db: Session = Depends(get_db)):
    return crud.get_currency(db, currency_id)


@router.post('/', status_code=201)
async def create_currency(currency_data: schemas.CurrencyCreate, authorization: str = Header(),
                          db: Session = Depends(get_db)):
    check_admin_token(authorization)
    crud.create_currency(currency_data, db)


@router.patch('/', status_code=200, response_model=schemas.CurrencyOut)
async def change_currency(currency_data: schemas.CurrencyChange, authorization: str = Header(),
                          db: Session = Depends(get_db)):
    check_admin_token(authorization)
    return crud.change_currency(currency_data, db)


@router.delete('/{currency_id}', status_code=200)
async def delete_currency(currency_id, db: Session = Depends(get_db)):
    try:
        int(currency_id)
    except ValueError:
        raise HTTPException(400, "invalid currency id")

    return crud.delete_currency(db, currency_id)
