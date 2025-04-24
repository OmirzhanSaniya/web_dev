from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Movie, UserProfile, Rating, Review, Genre, Director
from .serializers import (
    MovieSerializer, UserProfileSerializer, ReviewSerializer,
    RatingSerializer, GenreSerializer, DirectorSerializer, UserRegisterSerializer
)
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['year', 'genres', 'director']
    search_fields = ['title', 'director__name', 'cast']
    ordering_fields = ['year', 'title', 'imdb_rating']
    ordering = ['-year']

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class MovieList(generics.ListCreateAPIView):
    queryset = Movie.objects.all().order_by('id')
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['year', 'genres', 'director']

class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
    def post(self, request):
        profile = UserProfile.objects.get(user=request.user)
        movie_id = request.data.get('movie_id')
        
        if not movie_id:
            return Response({'error': 'movie_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        UserProfile.objects.create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request):
    movie_id = request.data.get('movie_id')
    try:
        movie = Movie.objects.get(id=movie_id)
        profile = request.user.profile
        if movie in profile.favorite_movies.all():
            profile.favorite_movies.remove(movie)
        else:
            profile.favorite_movies.add(movie)
        return Response({'message': 'Favorite updated'})
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_watched(request):
    movie_id = request.data.get('movie_id')
    try:
        movie = Movie.objects.get(id=movie_id)
        profile = request.user.profile
        if movie in profile.watched_movies.all():
            profile.watched_movies.remove(movie)
        else:
            profile.watched_movies.add(movie)
        return Response({'message': 'Watched updated'})
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

class ReviewList(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk):
        review = get_object_or_404(Review, pk=pk, user=request.user)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        review = get_object_or_404(Review, pk=pk, user=request.user)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddStarRatingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RatingDetail(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        rating = get_object_or_404(Rating, pk=pk, user=request.user)
        serializer = RatingSerializer(rating, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        rating = get_object_or_404(Rating, pk=pk, user=request.user)
        rating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class DirectorViewSet(viewsets.ModelViewSet):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer