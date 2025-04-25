# from django.urls import path
# from . import views

# urlpatterns = [
#     path('posts/', views.get_all_posts),
#     path('posts/create/', views.create_post),
#     path('posts/<int:pk>/', views.PostDetailAPIView.as_view()),
#     path('comments/', views.CommentListCreateAPIView.as_view()),
# ]

from django.urls import path
from . import views


urlpatterns = [
    # Аутентификация
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('logout/', views.UserLogoutView.as_view(), name='logout'),
    
    # Посты
    path('posts/', views.PostListCreateView.as_view(), name='post-list'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/like/', views.PostLikeView.as_view(), name='post-like'),
    path('posts/<int:pk>/save/', views.PostSaveView.as_view(), name='post-save'),
    
    # Комментарии
    path('comments/', views.CommentListView.as_view(), name='comment-list'),
    
    # Категории и теги
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    
    # Профиль
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('profile/saved/', views.UserSavedPostsView.as_view(), name='saved-posts'),
    path('profile/liked/', views.UserLikedPostsView.as_view(), name='liked-posts'),
]