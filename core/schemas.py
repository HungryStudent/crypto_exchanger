from typing import List, Union

from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str


class Config(BaseModel):
    key: str
    value: str

    class Config:
        orm_mode = True


class CurrencyCreate(BaseModel):
    name: str
    min: float
    volume: float


class CurrencyChange(BaseModel):
    id: int
    name: str = None
    min: float = None
    volume: float = None


class CurrencyOut(BaseModel):
    id: int
    name: str
    min: float
    volume: float

    class Config:
        orm_mode = True


class AuthResponse(BaseModel):
    status: str
    msg: str
    token: str = None


class BaseResponse(BaseModel):
    status: str
    msg: str
