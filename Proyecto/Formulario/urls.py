from django.urls import path
from Formulario import views


urlpatterns = [
    path('get/', views.getUsuarios),
    path('post/', views.postUsario),
    path('put/<int:pk>/', views.putUsuario),
    path('delete/<int:pk>/', views.deleteUsuario),
]