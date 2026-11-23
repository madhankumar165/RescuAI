from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from app.database import get_db
from app.models.schema import Message, ResourceNeed
from app.schemas.pydantic_models import MessageResponse, MessageUpdateStatus

router = APIRouter(prefix="/messages", tags=["Messages & Help Requests"])

@router.get("", response_model=List[MessageResponse])
def get_messages(
    search: Optional[str] = None,
    priority: Optional[str] = None,
    disaster_type: Optional[str] = None,
    resource: Optional[str] = None,
    status: Optional[str] = None,
    location: Optional[str] = None,
    is_emergency: Optional[bool] = None,
    is_duplicate: Optional[bool] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Message)

    if search:
        s_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Message.original_text.ilike(s_pattern),
                Message.location_name.ilike(s_pattern),
                Message.disaster_type.ilike(s_pattern),
                Message.organization.ilike(s_pattern)
            )
        )

    if priority:
        query = query.filter(Message.priority_level.ilike(priority))
    if disaster_type:
        query = query.filter(Message.disaster_type.ilike(disaster_type))
    if status:
        query = query.filter(Message.status.ilike(status))
    if location:
        query = query.filter(Message.location_name.ilike(f"%{location}%"))
    if is_emergency is not None:
        query = query.filter(Message.is_emergency == is_emergency)
    if is_duplicate is not None:
        query = query.filter(Message.is_duplicate == is_duplicate)

    if resource:
        query = query.join(ResourceNeed).filter(ResourceNeed.resource_name.ilike(resource))

    # Order by severity score and date
    query = query.order_by(Message.severity_score.desc(), Message.created_at.desc())

    offset = (page - 1) * limit
    results = query.offset(offset).limit(limit).all()
    return results

@router.get("/{message_id}", response_model=MessageResponse)
def get_message_by_id(message_id: int, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found.")
    return msg

@router.put("/{message_id}/status", response_model=MessageResponse)
def update_message_status(message_id: int, payload: MessageUpdateStatus, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found.")
    
    valid_statuses = ["Pending", "Assigned", "In Progress", "Resolved"]
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")
    
    msg.status = payload.status
    if payload.assigned_to:
        msg.assigned_to = payload.assigned_to
    db.commit()
    db.refresh(msg)
    return msg
