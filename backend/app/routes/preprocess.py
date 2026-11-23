from fastapi import APIRouter
from app.schemas.pydantic_models import PreprocessRequest, PreprocessResponse
from app.nlp.preprocessor import preprocessor

router = APIRouter(prefix="/nlp", tags=["NLP & Preprocessing"])

@router.post("/preprocess", response_model=PreprocessResponse)
def preprocess_text_endpoint(payload: PreprocessRequest):
    res = preprocessor.preprocess_full(payload.text)
    return PreprocessResponse(
        original_text=res["original_text"],
        cleaned_text=res["cleaned_text"],
        language=res["language"],
        tokens=res["tokens"],
        lemmas=res["lemmas"],
        removed_stopwords=res["removed_stopwords"],
        removed_emojis=res["removed_emojis"],
        removed_urls=res["removed_urls"]
    )
