from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MovieViewSet,
    GenreViewSet,
    DirectorViewSet,
    MovieList,
    MovieDetail,
    UserProfileView,
    register,
    RatingDetail,
    ReviewList,
    ReviewDetail,
    AddStarRatingView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'directors', DirectorViewSet, basename='director')

urlpatterns = [
    path('', include(router.urls)),
    path('movies/list/', MovieList.as_view(), name='movie-list'),
    path('movies/<int:pk>/', MovieDetail.as_view(), name='movie-detail'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/<str:action>/', UserProfileView.as_view(), name='profile-action'),
    path('register/', register, name='register'),
    path('reviews/', ReviewList.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetail.as_view(), name='review-detail'),
    path('ratings/', AddStarRatingView.as_view(), name='rating-add'),
    path('ratings/<int:pk>/', RatingDetail.as_view(), name='rating-detail'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]