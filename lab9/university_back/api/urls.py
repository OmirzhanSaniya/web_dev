from django.urls import path
from . import views

urlpatterns = [
    path('universities/', views.UniversityList.as_view()),
    path('universities/<int:pk>/', views.UniversityDetail.as_view()),
    path('universities/<int:pk>/internships/', views.UniversityInternshipsList.as_view()),
    path('internships/', views.InternshipList.as_view()),
    path('internships/<int:pk>/', views.InternshipDetail.as_view()),
    path('internships/top_ten/', views.TopTenInternships.as_view()),
]