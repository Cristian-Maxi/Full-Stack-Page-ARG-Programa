# from django.shortcuts import render, HttpResponse
from .models import Usuario
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ListaTareas import serializers
from .serializers import UsuarioSerializer


#Se usará para ver los usuarios cargados en la api
@api_view(['GET'])
def getUsuarios(request):
    usuario = Usuario.objects.all()
    serializers = UsuarioSerializer(usuario, many=True)
    return Response(serializers.data)


#El usuario podra crear su cuenta mediante el formulario usando este metodo POST
@api_view(['POST'])
def postUsario(request):
    data = request.data
    usuarios = Usuario.objects.create(
        nombre = data['nombre'],
        apellido = data['apellido'],
        usuario = data['usuario'],
        contraseña = data['contraseña'],
        email = data['email'],
        recibir_notificaciones = request.data.get('recibir_notifiaciones', False)
    )
    serializers = UsuarioSerializer(usuarios, many=False)
    return Response(serializers.data)

#Lo usamos para modificar la api cargada
@api_view(['PUT'])
def putUsuario(request, pk):
    data = request.data
    usuarios = Usuario.objects.get(id=pk)
    serializers = UsuarioSerializer(instance=usuarios, data=data)
    if serializers.is_valid():
        serializers.save()
    return Response(serializers.data)

#Lo usaraemos para eliminar el usuario
@api_view(['DELETE'])
def deleteUsuario(request, pk):
    usuarios = Usuario.objects.get(id=pk)
    usuarios.delete()
    return Response("Tarea Eliminada")
