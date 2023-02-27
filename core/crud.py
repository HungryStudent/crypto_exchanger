from typing import List

from fastapi import HTTPException
from sqlalchemy import update
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from core import schemas
from core.models import *

import random
import string

import hashlib
from configs import salt, cases_photo_path, games_photo_path, default_configs


def create_default_config(db: Session):
    if db.query(Config).count() == 0:
        for config in default_configs:
            config_record = Config(key=config["key"], value=config["value"])
            db.add(config_record)
        db.commit()


def get_config(db: Session):
    return db.query(Config).all()


def change_config(db: Session, configs: List[schemas.Config]):
    for config in configs:
        config_record = insert(Config).values(key=config.key, value=config.value)
        config_record = config_record.on_conflict_do_update(
            index_elements=[Config.key],
            set_=dict(config_record.excluded.items()))
        db.execute(config_record)
    db.commit()


def create_currency(currency_data: schemas.CurrencyCreate, db: Session):
    currency = Currencies(name=currency_data.name, min=currency_data.min, volume=currency_data.volume)
    db.add(currency)
    db.commit()


def change_currency(currency_data: schemas.CurrencyChange, db: Session):
    stmt = (
        update(Currencies).
        where(currency_data.id == Currencies.id).
        values(currency_data.dict(exclude_unset=True)).
        returning(Currencies)
    )
    db.execute(stmt)
    db.commit()
    return db.query(Currencies).filter(Currencies.id == currency_data.id).first()


def get_currency(db: Session, currency_id=None):
    if currency_id:
        currency = db.query(Currencies).filter(Currencies.id == currency_id).first()
        if currency is None:
            raise HTTPException(400, "invalid currency id")
        return currency
    return db.query(Currencies).all()
