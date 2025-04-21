from django.contrib import admin
from .models import Movie, UserProfile, Genre, Director

admin.site.register(Movie)
admin.site.register(UserProfile)
admin.site.register(Genre)
admin.site.register(Director)