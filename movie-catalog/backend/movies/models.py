from django.db import models

<<<<<<< HEAD
# Create your models here.
=======
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Director(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_year = models.IntegerField()
    duration_minutes = models.IntegerField()
    rating = models.FloatField()
    genres = models.ManyToManyField(Genre)
    director = models.ForeignKey(Director, on_delete=models.SET_NULL, null=True, blank=True)
    poster_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.release_year})"
>>>>>>> bd5ca86cfa364ffaeafd16c9dfbb979a913c19f6
