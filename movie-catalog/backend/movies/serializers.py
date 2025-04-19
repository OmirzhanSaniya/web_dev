from rest_framework import serializers
from .models import Movie, Genre, Director

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ['id', 'name', 'bio']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    director = DirectorSerializer(read_only=True)
    
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_year', 
                 'duration_minutes', 'rating', 'genres', 
                 'director', 'poster_url']