from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from datetime import datetime

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

db = SQLAlchemy(metadata=MetaData(naming_convention=convention))

class Design(db.Model):
    __tablename__ = 'design'

    id = db.Column(db.Ineter, primary_key=True)
    name = db.Column(db.String, nullable=True)
    data = db.column(db.Text, nullable=False)
    public_url = db.Column(db.String, unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.nowutc)

    
