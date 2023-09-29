from django.shortcuts import render, redirect
from django.contrib.auth import logout
from Formulario.models import Usuario
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ListaTareas import serializers

#Mis importaciones
from .models import Tarea
from .serializers import TareaSerializer


def listaTareas(request):
    tareas = ["cortar el pasto", "comprar pan", "pasear al perro"]
    return render(request, "listaTareas/listaTareas.html", {"tareas":tareas})


def cerrar_sesion(request): #Usamos esto para deslogear al usuario al hacer click en el boton cerrar sesion
    # Cierra la sesión del usuario
    logout(request)
    # Redirige al usuario a la página de inicio de sesión
    return redirect("login/login.html")


@api_view(['GET'])
def getTarea(request):
    tareas = Tarea.objects.all()
    serializers = TareaSerializer(tareas, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def postTarea(request):
    data = request.data
    tareas = Tarea.objects.create(
        tarea = data['tarea']
    )
    serializers = TareaSerializer(tareas, many=False)
    return Response(serializers.data)

@api_view(['PUT'])
def putTarea(request, pk):
    data = request.data
    tareas = Tarea.objects.get(id=pk)
    serializers = TareaSerializer(instance=tareas, data=data)
    if serializers.is_valid():
        serializers.save()
    return Response(serializers.data)
        
@api_view(['DELETE'])
def deleteTarea(request, pk):
    tareas = Tarea.objects.get(id=pk)
    tareas.delete()
    return Response("Tarea Eliminada")