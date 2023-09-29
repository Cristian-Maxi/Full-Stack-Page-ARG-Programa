from django.contrib import admin
from django.urls import path, include
from Login import views
from ListaTareas import views as tareas_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", views.autenticar_usuario, name="login"),
    path("login/eliminar", views.eliminar_cuenta, name="eliminar"),
    path('formulario/', include('Formulario.urls')),
    path("listaTareas", tareas_views.listaTareas, name="listaTareas"),
    path('listaTareas/', include('ListaTareas.urls')),
    
    # path("listaTareas", login_views.cerrar_sesion, name='cerrar_sesion'),
]