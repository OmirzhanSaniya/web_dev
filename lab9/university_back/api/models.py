from django.db import models

class University(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    city = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name

class Internship(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    stipend = models.FloatField()
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='internships')

    def __str__(self):
        return self.title