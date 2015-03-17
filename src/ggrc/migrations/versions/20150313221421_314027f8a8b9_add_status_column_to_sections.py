
"""Add status column to sections

Revision ID: 314027f8a8b9
Revises: 5254f4f31427
Create Date: 2015-03-13 22:14:21.065551

"""

# revision identifiers, used by Alembic.
revision = '314027f8a8b9'
down_revision = '5254f4f31427'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column(
    	'sections', 
    	sa.Column('status', sa.String(length=250), nullable=True)
    	)

def downgrade():
    op.drop_column('sections', 'status')
