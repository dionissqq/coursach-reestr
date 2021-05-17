from django.urls import path
from .views import AgencyList, AgencyView

urlpatterns = [
    path('', AgencyList.as_view()),
    path('/<int:pk>', AgencyView.as_view())
]