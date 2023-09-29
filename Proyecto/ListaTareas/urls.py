from django.urls import path
from ListaTareas import views


urlpatterns = [
    path('get/', views.getTarea),
    path('post/', views.postTarea),
    path('put/<int:pk>/', views.putTarea ),
    path('delete/<int:pk>/', views.deleteTarea),
]