import os.path
from typing import List

from fastapi import APIRouter, Depends, Cookie, HTTPException, File, UploadFile, Form, Header
from fastapi import Response

from sqlalchemy.orm import Session

from core.database import SessionLocal
from core import crud
from core import schemas

from configs import admin_info, true_admin_token

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_admin_token(authorization: Header()):
    if authorization != true_admin_token:
        raise HTTPException(401, "invalid token")


@router.post('/login', response_model=schemas.AuthResponse, tags=["Auth Methods"])
async def login_admin(user_data: schemas.UserCreate):
    if user_data == admin_info:
        return schemas.AuthResponse(status=True, msg="reg is successful", token=true_admin_token)
    raise HTTPException(400, "invalid data")


@router.get('/config', response_model=List[schemas.Config], tags=["Config"])
async def get_config(authorization: str = Header(), db: Session = Depends(get_db)):
    check_admin_token(authorization)
    return crud.get_config(db)


@router.put('/config', status_code=200, tags=["Config"])
async def change_config(configs: List[schemas.Config], authorization: str = Header(),
                        db: Session = Depends(get_db)):
    check_admin_token(authorization)
    crud.change_config(db, configs)


@router.post('/currency/create', status_code=201)
async def create_currency(currency_data: schemas.CurrencyCreate, authorization: str = Header(),
                          db: Session = Depends(get_db)):
    check_admin_token(authorization)
    crud.create_currency(currency_data, db)


@router.post('/currency/update', status_code=200, response_model=schemas.CurrencyOut)
async def change_currency(currency_data: schemas.CurrencyChange, authorization: str = Header(),
                          db: Session = Depends(get_db)):
    check_admin_token(authorization)
    return crud.change_currency(currency_data, db)
