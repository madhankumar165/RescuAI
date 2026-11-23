import io
import csv
from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.orm import Session
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from app.database import get_db
from app.models.schema import Message

router = APIRouter(prefix="/export", tags=["Export Reports"])

@router.get("/csv")
def export_messages_csv(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.severity_score.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Header
    writer.writerow([
        "ID", "Original Text", "Emergency", "Disaster Type", "Priority Level", 
        "Severity Score", "Location", "Victim Count", "Status", "Confidence", "Created At"
    ])
    
    for m in messages:
        writer.writerow([
            m.id, m.original_text, m.is_emergency, m.disaster_type, m.priority_level,
            m.severity_score, m.location_name, m.victim_count, m.status, m.confidence_score,
            m.created_at.strftime("%Y-%m-%d %H:%M") if m.created_at else ""
        ])
        
    output.seek(0)
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=disaster_emergency_requests.csv"}
    )

@router.get("/pdf")
def export_messages_pdf(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.severity_score.desc()).limit(50).all()
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=12
    )
    
    elements = []
    elements.append(Paragraph("<b>Disaster Response Command Center - Emergency Summary Report</b>", title_style))
    elements.append(Spacer(1, 12))
    
    table_data = [
        [Paragraph("<b>ID</b>", styles['Normal']), 
         Paragraph("<b>Disaster</b>", styles['Normal']), 
         Paragraph("<b>Priority</b>", styles['Normal']), 
         Paragraph("<b>Score</b>", styles['Normal']), 
         Paragraph("<b>Location</b>", styles['Normal']), 
         Paragraph("<b>Victims</b>", styles['Normal']), 
         Paragraph("<b>Status</b>", styles['Normal'])]
    ]
    
    for m in messages:
        table_data.append([
            Paragraph(str(m.id), styles['Normal']),
            Paragraph(m.disaster_type, styles['Normal']),
            Paragraph(m.priority_level, styles['Normal']),
            Paragraph(f"{m.severity_score:.1f}", styles['Normal']),
            Paragraph(m.location_name or "N/A", styles['Normal']),
            Paragraph(str(m.victim_count), styles['Normal']),
            Paragraph(m.status, styles['Normal'])
        ])
        
    t = Table(table_data, colWidths=[30, 90, 70, 50, 110, 50, 70])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor("#0f172a")),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
    ]))
    
    elements.append(t)
    doc.build(elements)
    
    buffer.seek(0)
    return Response(
        content=buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=disaster_response_report.pdf"}
    )
