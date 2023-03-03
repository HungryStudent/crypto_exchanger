from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BigInteger, Table, VARCHAR, Float, \
    ForeignKeyConstraint, UniqueConstraint, TIMESTAMP
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


class Pairs(Base):
    __tablename__ = "pairs"

    id = Column(Integer, primary_key=True, index=True)
    currency_one_id = Column(Integer, ForeignKey(Currencies.id, ondelete="CASCADE"))
    currency_two_id = Column(Integer, ForeignKey(Currencies.id, ondelete="CASCADE"))
    marginality = Column(Float)

    currency_one = relationship("Currencies", foreign_keys=[currency_one_id])
    currency_two = relationship("Currencies", foreign_keys=[currency_two_id])

    __table_args__ = (UniqueConstraint("currency_one_id", "currency_two_id"), )


class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    pair_id = Column(Integer, ForeignKey(Pairs.id, ondelete="NO ACTION"))
    create_time = Column(TIMESTAMP)