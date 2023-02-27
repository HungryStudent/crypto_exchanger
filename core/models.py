from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BigInteger, Table, VARCHAR, Float
from sqlalchemy.orm import relationship

from .database import Base


class Config(Base):
    __tablename__ = "config"

    key = Column(VARCHAR(255), primary_key=True)
    value = Column(VARCHAR(255))


class Currencies(Base):
    __tablename__ = "currencies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(VARCHAR(255), unique=True)
    min = Column(Float)
    volume = Column(Float)


