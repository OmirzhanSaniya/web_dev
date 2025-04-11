from rest_framework import generics
from .models import University, Internship
from .serializers import UniversitySerializer, InternshipSerializer

class UniversityList(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityInternshipsList(generics.ListAPIView):
    serializer_class = InternshipSerializer

    def get_queryset(self):
        university_pk = self.kwargs['pk']
        return Internship.objects.filter(university_id=university_pk)

class InternshipList(generics.ListCreateAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

class InternshipDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

class TopTenInternships(generics.ListAPIView):
    serializer_class = InternshipSerializer
    queryset = Internship.objects.order_by('-stipend')[:10]