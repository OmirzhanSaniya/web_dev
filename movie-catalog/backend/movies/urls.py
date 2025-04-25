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
    AddStarRatingView,
    toggle_favorite,
    toggle_watched
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'directors', DirectorViewSet, basename='director')

urlpatterns = [
    path('', include(router.urls)),
    path('movies/', MovieList.as_view(), name='movie-list'),
    path('movies/<int:pk>/', MovieDetail.as_view(), name='movie-detail'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('register/', register, name='register'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/favorite/', toggle_favorite, name='toggle_favorite'),
    path('profile/watch/', toggle_watched, name='toggle_watched'),

]