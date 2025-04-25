from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Director(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name}"

class Movie(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField()
    duration = models.CharField(max_length=20, help_text="Формат: 1h 30m")
    genres = models.ManyToManyField(Genre, related_name='movies')
    director = models.ForeignKey(
        Director, 
        on_delete=models.SET_NULL, 
        null=True,
        blank=True,
        related_name='movies'
    )
    description = models.TextField()
    cast = models.TextField(help_text="Актеры через запятую")
    imdb_rating = models.FloatField(null=True, blank=True)
    poster_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'title']
        verbose_name = "Movie"
        verbose_name_plural = "Movies"

    def __str__(self):
        return f"{self.title} ({self.year})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    watched_movies = models.ManyToManyField(Movie, related_name='watched_by', blank=True)
    favorite_movies = models.ManyToManyField(Movie, related_name='favorited_by', blank=True)
    watchlist_movies = models.ManyToManyField(Movie, related_name='in_watchlists', blank=True)
    
    def __str__(self):
        return f"Profile of {self.user.username}"

class HighRatingManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(value__gte=4.0)

class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    value = models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    
    objects = models.Manager()
    high_ratings = HighRatingManager()
    
    class Meta:
        unique_together = ['movie', 'user']
    
    def __str__(self):
        return f"{self.value}★ for {self.movie.title} by {self.user.username}"

class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Review by {self.user.username} on {self.movie.title}"