from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    duration = models.CharField(max_length=20, help_text="Формат: 1h 30m")
    genre = models.CharField(max_length=100, help_text="Жанры через запятую")
    description = models.TextField()
    director = models.CharField(max_length=100)
    cast = models.TextField(help_text="Актеры через запятую")
    imdb_rating = models.FloatField(null=True, blank=True)
    poster_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'title']
        verbose_name = "Movie"
        verbose_name_plural = "Movie"

    def __str__(self):
        return f"{self.title} ({self.year})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    watched_movies = models.ManyToManyField(Movie, related_name='watched_by', blank=True)
    favorite_movies = models.ManyToManyField(Movie, related_name='favorited_by', blank=True)
    
    def __str__(self):
        return self.user.username