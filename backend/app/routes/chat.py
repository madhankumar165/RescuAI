import re
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.schema import Message, ResourceNeed
from app.schemas.pydantic_models import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["AI Chat Assistant"])

@router.post("", response_model=ChatResponse)
def query_ai_assistant(payload: ChatRequest, db: Session = Depends(get_db)):
    prompt = payload.prompt.lower().strip()
    
    # 1. Check for resource query e.g. "how many people need medical aid?"
    if "how many" in prompt or "count" in prompt or "need" in prompt:
        for r_name in ["medical aid", "food", "water", "shelter", "rescue team", "medicine", "clothes", "blankets"]:
            if r_name in prompt:
                count = db.query(ResourceNeed).filter(ResourceNeed.resource_name.ilike(r_name)).count()
                total_victims = db.query(func.sum(Message.victim_count))\
                    .join(ResourceNeed)\
                    .filter(ResourceNeed.resource_name.ilike(r_name)).scalar() or 0
                
                messages = db.query(Message)\
                    .join(ResourceNeed)\
                    .filter(ResourceNeed.resource_name.ilike(r_name))\
                    .order_by(Message.severity_score.desc()).limit(5).all()
                
                data_records = [{"id": m.id, "text": m.original_text, "priority": m.priority_level, "location": m.location_name} for m in messages]
                
                return ChatResponse(
                    answer=f"Currently, there are **{count} emergency requests** requiring **{r_name.title()}**, impacting an estimated **{total_victims} individuals**.",
                    sql_intent=f"SELECT COUNT(*) FROM resource_needs WHERE resource_name ILIKE '{r_name}'",
                    data=data_records,
                    total_matches=count
                )

    # 2. Check for priority query e.g. "show critical cases"
    for prio in ["critical", "high", "medium", "low"]:
        if prio in prompt:
            messages = db.query(Message).filter(Message.priority_level.ilike(prio)).order_by(Message.severity_score.desc()).limit(10).all()
            count = db.query(Message).filter(Message.priority_level.ilike(prio)).count()
            data_records = [{"id": m.id, "text": m.original_text, "disaster": m.disaster_type, "location": m.location_name, "victims": m.victim_count} for m in messages]
            
            return ChatResponse(
                answer=f"Found **{count} {prio.title()} priority disaster requests**. Here are the highest severity cases:",
                sql_intent=f"SELECT * FROM messages WHERE priority_level = '{prio.title()}' ORDER BY severity_score DESC",
                data=data_records,
                total_matches=count
            )

    # 3. Check for disaster type query e.g. "show all flood requests"
    for d_type in ["flood", "earthquake", "cyclone", "fire", "landslide", "tsunami", "building collapse", "road accident"]:
        if d_type in prompt:
            messages = db.query(Message).filter(Message.disaster_type.ilike(d_type)).order_by(Message.severity_score.desc()).limit(10).all()
            count = db.query(Message).filter(Message.disaster_type.ilike(d_type)).count()
            data_records = [{"id": m.id, "text": m.original_text, "priority": m.priority_level, "location": m.location_name, "status": m.status} for m in messages]
            
            return ChatResponse(
                answer=f"Found **{count} disaster help requests** categorized under **{d_type.title()}**.",
                sql_intent=f"SELECT * FROM messages WHERE disaster_type ILIKE '{d_type}'",
                data=data_records,
                total_matches=count
            )

    # 4. Check for status query e.g. "show pending cases" or "resolved cases"
    for st in ["pending", "assigned", "in progress", "resolved"]:
        if st in prompt:
            messages = db.query(Message).filter(Message.status.ilike(st)).order_by(Message.severity_score.desc()).limit(10).all()
            count = db.query(Message).filter(Message.status.ilike(st)).count()
            data_records = [{"id": m.id, "text": m.original_text, "disaster": m.disaster_type, "priority": m.priority_level} for m in messages]
            
            return ChatResponse(
                answer=f"There are **{count} emergency requests** currently marked as **{st.title()}**.",
                sql_intent=f"SELECT * FROM messages WHERE status ILIKE '{st}'",
                data=data_records,
                total_matches=count
            )

    # General Fallback overview query
    total_count = db.query(Message).count()
    crit_count = db.query(Message).filter(Message.priority_level == "Critical").count()
    return ChatResponse(
        answer=f"I analyzed the disaster database. Total emergency requests logged: **{total_count}**, with **{crit_count} Critical cases** requiring immediate dispatch. Try asking: *'Show critical flood cases'*, *'How many people need water?'*, or *'Show pending cases'*.",
        sql_intent="SELECT COUNT(*) FROM messages",
        data=[],
        total_matches=total_count
    )
