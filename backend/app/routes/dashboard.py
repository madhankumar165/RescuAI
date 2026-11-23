from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, List, Any
from app.database import get_db
from app.models.schema import Message, ResourceNeed
from app.schemas.pydantic_models import DashboardStats, TimelinePoint

router = APIRouter(prefix="/dashboard", tags=["Command Center Dashboard"])

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_requests = db.query(func.count(Message.id)).scalar() or 0
    critical_count = db.query(func.count(Message.id)).filter(Message.priority_level == "Critical").scalar() or 0
    high_count = db.query(func.count(Message.id)).filter(Message.priority_level == "High").scalar() or 0
    medium_count = db.query(func.count(Message.id)).filter(Message.priority_level == "Medium").scalar() or 0
    low_count = db.query(func.count(Message.id)).filter(Message.priority_level == "Low").scalar() or 0
    
    pending_count = db.query(func.count(Message.id)).filter(Message.status == "Pending").scalar() or 0
    assigned_count = db.query(func.count(Message.id)).filter(Message.status == "Assigned").scalar() or 0
    in_progress_count = db.query(func.count(Message.id)).filter(Message.status == "In Progress").scalar() or 0
    resolved_count = db.query(func.count(Message.id)).filter(Message.status == "Resolved").scalar() or 0

    total_victims = db.query(func.sum(Message.victim_count)).scalar() or 0

    # Disaster category breakdown
    disaster_query = db.query(Message.disaster_type, func.count(Message.id)).group_by(Message.disaster_type).all()
    disaster_breakdown = {d_type: count for d_type, count in disaster_query}

    # Resource demand breakdown
    resource_query = db.query(ResourceNeed.resource_name, func.count(ResourceNeed.id)).group_by(ResourceNeed.resource_name).all()
    resource_demands = {r_name: count for r_name, count in resource_query}

    priority_breakdown = {
        "Critical": critical_count,
        "High": high_count,
        "Medium": medium_count,
        "Low": low_count
    }

    status_breakdown = {
        "Pending": pending_count,
        "Assigned": assigned_count,
        "In Progress": in_progress_count,
        "Resolved": resolved_count
    }

    return DashboardStats(
        total_requests=total_requests,
        critical_requests=critical_count,
        high_requests=high_count,
        medium_requests=medium_count,
        low_requests=low_count,
        resolved_requests=resolved_count,
        pending_requests=pending_count,
        in_progress_requests=in_progress_count,
        total_victims_impacted=int(total_victims),
        disaster_breakdown=disaster_breakdown,
        resource_demands=resource_demands,
        priority_breakdown=priority_breakdown,
        status_breakdown=status_breakdown
    )

@router.get("/timeline", response_model=List[TimelinePoint])
def get_dashboard_timeline(db: Session = Depends(get_db)):
    # Group by date for timeline chart
    results = db.query(
        func.date(Message.created_at).label("date_str"),
        Message.priority_level,
        func.count(Message.id).label("count")
    ).group_by("date_str", Message.priority_level).order_by("date_str").all()

    timeline_dict: Dict[str, Dict[str, int]] = {}
    for date_str, priority, count in results:
        d_key = str(date_str) if date_str else "Today"
        if d_key not in timeline_dict:
            timeline_dict[d_key] = {"critical": 0, "high": 0, "medium": 0, "low": 0, "total": 0}
        
        p_lower = priority.lower() if priority else "medium"
        if p_lower in timeline_dict[d_key]:
            timeline_dict[d_key][p_lower] += count
        timeline_dict[d_key]["total"] += count

    timeline_list = []
    for date_str, counts in timeline_dict.items():
        timeline_list.append(TimelinePoint(
            date=date_str,
            critical=counts["critical"],
            high=counts["high"],
            medium=counts["medium"],
            low=counts["low"],
            total=counts["total"]
        ))
    return timeline_list

@router.get("/map")
def get_dashboard_map_data(db: Session = Depends(get_db)):
    messages = db.query(Message).filter(Message.latitude.isnot(None), Message.longitude.isnot(None)).order_by(Message.severity_score.desc()).limit(150).all()
    
    map_features = []
    for msg in messages:
        resource_list = [r.resource_name for r in msg.resources]
        map_features.append({
            "id": msg.id,
            "title": msg.disaster_type,
            "text": msg.original_text,
            "location_name": msg.location_name,
            "latitude": msg.latitude,
            "longitude": msg.longitude,
            "priority": msg.priority_level,
            "severity_score": msg.severity_score,
            "victim_count": msg.victim_count,
            "status": msg.status,
            "resources": resource_list,
            "created_at": msg.created_at.isoformat() if msg.created_at else None
        })
    return map_features
