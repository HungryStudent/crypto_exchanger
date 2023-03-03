from typing import List

from fastapi import HTTPException
from sqlalchemy import update
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from core import schemas
from core.models import *

from configs import default_configs


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

    try:
        db.flush()
    except IntegrityError:
        raise HTTPException(400, "This name already exists")

    db.commit()
    return currency


def change_currency(currency_id, currency_data: schemas.CurrencyChange, db: Session):
    stmt = (
        update(Currencies).
        where(currency_id == Currencies.id).
        values(currency_data.dict(exclude_unset=True)).
        returning(Currencies)
    )
    db.execute(stmt)
    db.commit()
    return db.query(Currencies).filter(Currencies.id == currency_id).first()


def get_currency(db: Session, currency_id=None):
    if currency_id:
        currency = db.query(Currencies).filter(Currencies.id == currency_id).first()
        if currency is None:
            raise HTTPException(400, "invalid currency id")
        return currency
    return db.query(Currencies).all()


def delete_currency(db: Session, currency_id=None):
    db.query(Currencies).filter(Currencies.id == currency_id).delete()
    db.commit()


def create_pair(pair_data: schemas.PairCreate, db: Session):
    pair = Pairs(currency_one_id=pair_data.currency_one_id, currency_two_id=pair_data.currency_two_id,
                 marginality=pair_data.marginality)

    db.add(pair)
    try:
        db.flush()
    except IntegrityError as e:
        raise HTTPException(400, "Such a pair already exists | No currency id found")
    db.commit()
    return pair


def change_pair(pair_id, pair_data: schemas.PairChange, db: Session):
    stmt = (
        update(Pairs).
        where(pair_id == Pairs.id).
        values(pair_data.dict(exclude_unset=True)).
        returning(Pairs)
    )
    db.execute(stmt)
    db.commit()
    return db.query(Pairs).filter(Pairs.id == pair_id).first()


def get_pair(db: Session, pair_id=None):
    if pair_id:
        pair = db.query(Pairs).filter(Pairs.id == pair_id).first()
        if pair is None:
            raise HTTPException(400, "invalid pair id")
        return pair
    return db.query(Pairs).all()


def delete_pair(db: Session, pair_id=None):
    db.query(Pairs).filter(Pairs.id == pair_id).delete()
    db.commit()
