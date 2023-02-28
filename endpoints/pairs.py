from typing import List

from fastapi import APIRouter, Depends, HTTPException, Header

from sqlalchemy.orm import Session

from core.database import SessionLocal
from core import crud
from core import schemas
from endpoints.admin import check_admin_token
from configs import admin_info, true_admin_token

router = APIRouter(tags=["Pairs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/', response_model=List[schemas.PairOut])
async def get_pairs(db: Session = Depends(get_db)):
    return crud.get_pair(db)


@router.get('/{pair_id}', response_model=schemas.PairOut)
async def get_pair(pair_id, db: Session = Depends(get_db)):
    try:
        int(pair_id)
    except ValueError:
        raise HTTPException(400, "invalid pair id")

    return crud.get_pair(db, pair_id)


@router.post('/', status_code=201)
async def create_pair(pair_data: schemas.PairCreate, authorization: str = Header(), db: Session = Depends(get_db)):
    check_admin_token(authorization)
    if pair_data.currency_one == pair_data.currency_two:
        raise HTTPException(400, "Choose different currencies")
    crud.create_pair(pair_data, db)


@router.patch('/', status_code=200, response_model=schemas.PairOut)
async def change_pair(pair_data: schemas.PairChange, authorization: str = Header(), db: Session = Depends(get_db)):
    check_admin_token(authorization)
    return crud.change_pair(pair_data, db)


@router.delete('/{pair_id}', status_code=200)
async def delete_pair(pair_id, db: Session = Depends(get_db)):
    try:
        int(pair_id)
    except ValueError:
        raise HTTPException(400, "invalid pair id")

    return crud.delete_pair(db, pair_id)
