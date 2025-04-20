<<<<<<< HEAD
from django.shortcuts import render

# Create your views here.
=======
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Movie, Genre, Director
from .serializers import MovieSerializer, GenreSerializer, DirectorSerializer

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class DirectorViewSet(viewsets.ModelViewSet):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-rating')
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'release_year': ['exact', 'gte', 'lte'],
        'rating': ['exact', 'gte', 'lte'],
        'genres__id': ['exact'],
        'director__id': ['exact'],
    }
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'release_year', 'rating', 'created_at']
>>>>>>> bd5ca86cfa364ffaeafd16c9dfbb979a913c19f6
