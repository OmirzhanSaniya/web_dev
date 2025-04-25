# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status, generics
# from django.contrib.auth.models import User 
# from .models import Post, Comment
# from .serializers import PostSerializer, CommentSerializer
# # Create your views here.

# #FBV - получить все посты
# @api_view(['GET'])
# def get_all_posts(request):
#     posts = Post.objects.all()
#     serializer = PostSerializer(posts, many=True)
#     return Response(serializer.data)

# #FBV - создать пост
# @api_view(['POST'])
# def create_post(request):
#     data = request.data.copy()
#     data['author'] = request.user.id 
#     serializer = PostSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# #Получить, редактировать, удалить 
# class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticated]
    
# class CommentListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = [IsAuthenticated]
    
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .models import Post, Comment, Category, Tag
from .serializers import PostSerializer, CommentSerializer, CategorySerializer, TagSerializer, UserSerializer

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=request.data['password']
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Login successful'})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

class PostLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        post = generics.get_object_or_404(Post, pk=pk)
        post.likes.add(request.user)
        return Response({'message': 'Post liked'})

class PostSaveView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        post = generics.get_object_or_404(Post, pk=pk)
        post.saved_by.add(request.user)
        return Response({'message': 'Post saved'})

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserSavedPostsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return self.request.user.saved_posts.all()

class UserLikedPostsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return self.request.user.liked_posts.all()

# Ваши существующие view
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer