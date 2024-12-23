#!/usr/bin/env python3

from app import app
from models import db, Design

from datetime import datetime
import random


def create_sample_design():
    Design.query.delete()
    

    sample_designs = [
        {
            "name": "Sample Design 1",
            "data": '{"layers":[{"uid":1,"name":"Layer 1","height":100,"width":100,"color":"#ff0000","depth":10,"x":0,"y":0}],"containerSize":{"width":500,"height":500},"canvasSize":{"width":500,"height":500}}',
            "public_url": f"/embed/{random.randint(1000, 9999)}",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        },
        {
            "name": "Sample Design 2",
            "data": '{"layers":[{"uid":2,"name":"Layer 2","height":150,"width":150,"color":"#00ff00","depth":20,"x":50,"y":50}],"containerSize":{"width":600,"height":600},"canvasSize":{"width":600,"height":600}}',
            "public_url": f"/embed/{random.randint(1000, 9999)}",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        },
        {
            "name": "Sample Design 3",
            "data": '{"layers":[{"uid":3,"name":"Layer 3","height":200,"width":200,"color":"#0000ff","depth":30,"x":100,"y":100}],"containerSize":{"width":800,"height":800},"canvasSize":{"width":800,"height":800}}',
            "public_url": f"/embed/{random.randint(1000, 9999)}",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        },
    ]

    
    for design in sample_designs:
        db.session.add(Design(**design)) 
        # the ** operator unpacks the dictionary so that each key-value pair in the dictionary 
        # becomes a keyword argument when initializing the Design object.

        # EXAMPLE:
        # Design(
        # name=design["name"],
        # data=design["data"],
        # public_url=design["public_url"],
        # created_at=design["created_at"],
        # updated_at=design["updated_at"]

    db.session.commit()
    print("Database seeded successfully.")

def seed_database():
        create_sample_design()

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_database()