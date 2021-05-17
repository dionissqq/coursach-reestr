from django.urls import path
from .views import ListMedia, MediaView

urlpatterns = [
    path('', ListMedia.as_view()),
    path('/<int:pk>', MediaView.as_view())
]