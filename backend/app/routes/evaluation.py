from fastapi import APIRouter
from app.ml.evaluation import model_evaluator

router = APIRouter(prefix="/evaluation", tags=["ML Model Evaluation"])

@router.get("")
def get_model_evaluation_metrics():
    return model_evaluator.evaluate_performance()
