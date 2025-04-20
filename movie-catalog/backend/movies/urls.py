from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, GenreViewSet, DirectorViewSet
from .views import MovieList, UserProfileView, register

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')  # Добавлен basename
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'directors', DirectorViewSet, basename='director')

urlpatterns = [
    path('api/', include([
        # Автоматические CRUD endpoints
        path('', include(router.urls)),
        
        # Кастомные endpoints
        path('movies/list/', MovieList.as_view(), name='movie-list'),  # Альтернативный список
        
        # Пользовательские endpoints
        path('profile/', UserProfileView.as_view(), name='user-profile'),
        path('profile/<str:action>/', UserProfileView.as_view(), name='user-profile-action'),
        path('register/', register, name='register'),
        
        # Аутентификация
        path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    ])),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')

urlpatterns = [
    path('', include(router.urls)),
]