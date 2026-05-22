"""initial

Revision ID: 0001_initial
Revises: 
Create Date: 2026-05-22 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('username', sa.String(length=120), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('is_admin', sa.Boolean(), nullable=False, server_default=sa.text('0')),
    )

    op.create_table(
        'animal_inventory',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('species_name', sa.String(length=120), nullable=False),
        sa.Column('category', sa.String(length=80), nullable=False, server_default='wildlife'),
        sa.Column('count_seen', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('last_confidence', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('last_seen_at', sa.DateTime(), nullable=True),
        sa.Column('habitat_region', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('habitat_lat', sa.Float(), nullable=True),
        sa.Column('habitat_lng', sa.Float(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=False, server_default=''),
    )

    op.create_table(
        'global_species_catalog',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('species_name', sa.String(length=160), nullable=False),
        sa.Column('scientific_name', sa.String(length=220), nullable=False, server_default='Unknown'),
        sa.Column('common_name', sa.String(length=220), nullable=False, server_default='Unknown'),
        sa.Column('kingdom', sa.String(length=80), nullable=False, server_default='Animalia'),
        sa.Column('phylum', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('taxonomy_class', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('taxonomy_order', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('family', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('genus', sa.String(length=120), nullable=False, server_default='Unknown'),
        sa.Column('conservation_status', sa.String(length=120), nullable=False, server_default='Not evaluated'),
        sa.Column('habitats', sa.Text(), nullable=False, server_default='[]'),
        sa.Column('regions', sa.Text(), nullable=False, server_default='[]'),
        sa.Column('details', sa.Text(), nullable=False, server_default=''),
        sa.Column('image_url', sa.String(length=600), nullable=True),
        sa.Column('image_source', sa.String(length=300), nullable=True),
        sa.Column('source', sa.String(length=80), nullable=False, server_default='detection'),
        sa.Column('source_id', sa.String(length=120), nullable=True),
        sa.Column('sightings', sa.Integer(), nullable=False, server_default='0'),
    )

    op.create_table(
        'detections',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('source', sa.String(length=50), nullable=False),
        sa.Column('top_label', sa.String(length=120), nullable=False),
        sa.Column('confidence', sa.Float(), nullable=False),
        sa.Column('all_scores_json', sa.Text(), nullable=False),
        sa.Column('image_path', sa.String(length=255), nullable=False),
        sa.Column('raw_sensor_json', sa.Text(), nullable=False, server_default='{}'),
        sa.Column('inventory_id', sa.Integer(), sa.ForeignKey('animal_inventory.id'), nullable=True),
    )

    op.create_table(
        'alerts',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('alert_type', sa.String(length=60), nullable=False),
        sa.Column('message', sa.String(length=255), nullable=False),
        sa.Column('channel', sa.String(length=40), nullable=False),
        sa.Column('status', sa.String(length=40), nullable=False, server_default='queued'),
        sa.Column('detection_id', sa.Integer(), sa.ForeignKey('detections.id'), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('alerts')
    op.drop_table('detections')
    op.drop_table('global_species_catalog')
    op.drop_table('animal_inventory')
    op.drop_table('users')
