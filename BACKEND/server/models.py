from extensions import db
from enum import Enum


class ProjectStatus(Enum):
    COMPLETED = 'completed'
    IN_PROGRESS = 'in-progress'
    PLANNED = 'planned'

class CategoryStatus(Enum):
    LANGUAGE = 'language'
    FRAMEWORK = 'framework'
    TOOL = 'tool'
    DESIGN = 'design'
    OTHER = 'other'


class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email= db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256),nullable=False)
    is_admin = db.Column(db.Boolean, default=False)


    def __repr__(self):
        return f'<User {self.username}>'
##########################################################################################################################################################################

class Skill(db.model):

    __tablename__ = 'skills'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column( db.String(100), nullable=False)
    category = db.Column(db.Enum(CategoryStatus, name='skill_status'),default=ProjectStatus.LANGUAGE, nullable=False)
    proficiency_level = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime,server_default=db.func.current_timestamp() )
    updated_at = db.Column(db.DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp()  )

####################################################################################################################################################