"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from movies import views

router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet, basename='movie')

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/', include([
        # ViewSet endpoints (auto-generated CRUD)
        path('', include(router.urls)),
        
        # Custom endpoints
        path('movies/list/', views.MovieList.as_view(), name='movie-list'),
        path('movies/<int:pk>/detail/', views.MovieDetail.as_view(), name='movie-detail'),
        
        # User management
        path('profile/', views.UserProfileView.as_view(), name='user-profile'),
        path('profile/<str:action>/', views.UserProfileView.as_view(), name='user-profile-action'),
        path('register/', views.register, name='register'),
        
        # Authentication
        path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    ])),
]