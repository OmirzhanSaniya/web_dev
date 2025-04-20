from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Movie, UserProfile
from .serializers import MovieSerializer, UserProfileSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.filters import SearchFilter, OrderingFilter

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['year', 'genre', 'director']
    search_fields = ['title', 'director', 'cast']
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
    filterset_fields = ['year', 'rating', 'director']

    def get_queryset(self):
        queryset = super().get_queryset()
        # Дополнительные фильтры можно добавить здесь
        return queryset

class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
    def post(self, request, action):
        profile = UserProfile.objects.get(user=request.user)
        movie_id = request.data.get('movie_id')
        
        if not movie_id:
            return Response({'error': 'movie_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if action == 'watch':
            return self._toggle_movie_status(profile.watched_movies, movie)
        elif action == 'favorite':
            return self._toggle_movie_status(profile.favorite_movies, movie)
        
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
    
    def _toggle_movie_status(self, manager, movie):
        if movie in manager.all():
            manager.remove(movie)
            return Response({'status': 'removed'})
        else:
            manager.add(movie)
            return Response({'status': 'added'})

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    
    if not username or not password:
        return Response(
            {'error': 'Both username and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.create_user(username=username, password=password, email=email)
        token = Token.objects.create(user=user)
        UserProfile.objects.create(user=user)
        return Response({
            'token': token.key, 
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )