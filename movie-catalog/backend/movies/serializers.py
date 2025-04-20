from rest_framework import serializers
from .models import Movie, UserProfile
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Movie

from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'year',
            'duration',
            'genre',
            'description',
            'director',
            'cast',
            'imdb_rating',
            'poster_url',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['is_watched'] = False  # Можно добавить флаги для авторизованных пользователей
        return response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    watched_movies = MovieSerializer(many=True)
    favorite_movies = MovieSerializer(many=True)
    
    class Meta:
        model = UserProfile
        fields = ['user', 'watched_movies', 'favorite_movies']