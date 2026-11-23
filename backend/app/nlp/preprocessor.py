import re
import unicodedata
from typing import Dict, List, Tuple, Any

# English stopwords list
STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't",
    "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
    "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having",
    "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how",
    "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself",
    "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once",
    "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
    "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the",
    "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll",
    "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
    "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
    "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
    "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
}

# Basic suffix lemmatizer map for common disaster text words
LEMMAS_MAP = {
    "trapped": "trap", "flooded": "flood", "flooding": "flood", "collapsed": "collapse",
    "collapsing": "collapse", "burning": "burn", "burned": "burn", "damaged": "damage",
    "damages": "damage", "injuries": "injury", "injured": "injure", "victims": "victim",
    "houses": "house", "homes": "home", "medicines": "medicine", "supplies": "supply",
    "rescuing": "rescue", "rescued": "rescue", "shelters": "shelter", "roads": "road",
    "bridges": "bridge", "accidents": "accident", "fires": "fire", "lands": "land",
    "sliding": "slide", "slides": "slide", "earthquakes": "earthquake", "shakings": "shake"
}

URL_REGEX = re.compile(r'https?://\S+|www\.\S+')
EMOJI_REGEX = re.compile(r'[\U00010000-\U0010ffff]', flags=re.UNICODE)
PHONE_REGEX = re.compile(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b')

class TextPreprocessor:
    def __init__(self):
        pass

    def extract_urls(self, text: str) -> List[str]:
        return URL_REGEX.findall(text)

    def extract_emojis(self, text: str) -> List[str]:
        return EMOJI_REGEX.findall(text)

    def detect_language(self, text: str) -> str:
        # Simple heuristic rule language detection
        spanish_words = {"ayuda", "por", "favor", "inundacion", "terremoto", "casa", "agua"}
        french_words = {"aide", "secours", "eau", "maison", "incendie", "inondation"}
        words = set(re.findall(r'\b\w+\b', text.lower()))
        if len(words & spanish_words) >= 2:
            return "es"
        if len(words & french_words) >= 2:
            return "fr"
        return "en"

    def clean_text(self, text: str) -> Tuple[str, List[str], List[str]]:
        urls = self.extract_urls(text)
        emojis = self.extract_emojis(text)
        
        # Remove URLs
        cleaned = URL_REGEX.sub('', text)
        # Remove Emojis
        cleaned = EMOJI_REGEX.sub('', cleaned)
        # Remove special characters except punctuation useful for context
        cleaned = re.sub(r'[^a-zA-Z0-9\s.,!?\'"-]', ' ', cleaned)
        # Collapse multiple whitespace
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        
        return cleaned, urls, emojis

    def tokenize(self, text: str) -> List[str]:
        return [w for w in re.findall(r'\b\w+\b', text.lower()) if not w.isdigit()]

    def remove_stopwords(self, tokens: List[str]) -> Tuple[List[str], List[str]]:
        filtered = []
        removed = []
        for t in tokens:
            if t in STOPWORDS:
                removed.append(t)
            else:
                filtered.append(t)
        return filtered, removed

    def lemmatize(self, tokens: List[str]) -> List[str]:
        lemmas = []
        for t in tokens:
            if t in LEMMAS_MAP:
                lemmas.append(LEMMAS_MAP[t])
            elif t.endswith("ing") and len(t) > 5:
                lemmas.append(t[:-3])
            elif t.endswith("ed") and len(t) > 4:
                lemmas.append(t[:-2])
            elif t.endswith("s") and not t.endswith("ss") and len(t) > 3:
                lemmas.append(t[:-1])
            else:
                lemmas.append(t)
        return lemmas

    def preprocess_full(self, text: str) -> Dict[str, Any]:
        cleaned_text, urls, emojis = self.clean_text(text)
        tokens = self.tokenize(cleaned_text)
        filtered_tokens, removed_stopwords = self.remove_stopwords(tokens)
        lemmas = self.lemmatize(filtered_tokens)
        lang = self.detect_language(text)

        return {
            "original_text": text,
            "cleaned_text": cleaned_text,
            "language": lang,
            "tokens": tokens,
            "filtered_tokens": filtered_tokens,
            "lemmas": lemmas,
            "removed_stopwords": list(set(removed_stopwords)),
            "removed_emojis": emojis,
            "removed_urls": urls
        }

preprocessor = TextPreprocessor()
