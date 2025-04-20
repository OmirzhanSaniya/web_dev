from django.contrib import admin
<<<<<<< HEAD

# Register your models here.
=======
from .models import Movie, Genre, Director

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Director)

# @admin.register(Movie)
# class MovieAdmin(admin.ModelAdmin):
#     list_display = ('title', 'release_year', 'director')
#     list_filter = ('genres', 'director')
#     search_fields = ('title', 'description')
>>>>>>> bd5ca86cfa364ffaeafd16c9dfbb979a913c19f6
