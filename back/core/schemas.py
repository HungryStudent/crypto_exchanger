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


class PairCreate(BaseModel):
    currency_one_id: int
    currency_two_id: int
    marginality: float


class PairChange(BaseModel):
    id: int
    currency_one_id: int = None
    currency_two_id: int = None
    marginality: float = None


class PairOut(BaseModel):
    id: int
    currency_one: CurrencyOut
    currency_two: CurrencyOut
    marginality: float

    class Config:
        orm_mode = True

class AuthResponse(BaseModel):
    status: str
    msg: str
    token: str = None


class BaseResponse(BaseModel):
    status: str
    msg: str
