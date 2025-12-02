"""Content-based recommender system."""
import logging
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

logger = logging.getLogger(__name__)


class Recommender:
    """Simple content-based recommendation engine."""

    def __init__(self):
        self.user_profiles = {}
        self.content_items = []

    def register_user_profile(self, user_id: str, profile_vector: np.ndarray):
        """Store user preference vector."""
        self.user_profiles[user_id] = profile_vector
        logger.info(f"User profile registered: {user_id}")

    def register_content(self, content_id: str, content_vector: np.ndarray):
        """Store content feature vector."""
        self.content_items.append({
            'id': content_id,
            'vector': content_vector,
        })

    def recommend(self, user_id: str, top_k: int = 5) -> dict:
        """Recommend top-K content items for user."""
        if user_id not in self.user_profiles:
            logger.warning(f"User {user_id} not found in profiles")
            return {'recommendations': [], 'user_id': user_id}

        user_vector = self.user_profiles[user_id].reshape(1, -1)
        scores = []

        for item in self.content_items:
            sim = cosine_similarity(user_vector, item['vector'].reshape(1, -1))[0][0]
            scores.append({'item_id': item['id'], 'similarity_score': float(sim)})

        scores.sort(key=lambda x: x['similarity_score'], reverse=True)
        top_recommendations = scores[:top_k]

        return {
            'user_id': user_id,
            'recommendations': top_recommendations,
            'timestamp': datetime.now().isoformat(),
        }
