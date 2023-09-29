from django.contrib.auth import authenticate, login, logout
from Formulario.models import Usuario
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

#Este autenticar_usuario lo utilizamos para logearnos a traves de la informacion que se ingreso mediante el formulario a la base de datos:
#usuario: cris06  contraseña: 123

@api_view(['POST'])
def autenticar_usuario(request):
    usuario = request.data.get('usuario')
    contraseña = request.data.get('contraseña')

    try:
        # Consulta la API para obtener el usuario y compararlo al nombre de usuario proporcionado
        user = Usuario.objects.get(usuario=usuario)

        # Verifica si la contraseña proporcionada coincide con la almacenada en la base de datos
        if user.contraseña == contraseña:
            return Response({'autenticado': True})
    except Usuario.DoesNotExist:
        pass  # El usuario no existe en la base de datos

    return Response({'autenticado': False})


@api_view(['POST'])
def eliminar_cuenta(request):
    usuario = request.data.get('usuario')
    contraseña = request.data.get('contraseña')

    try:
        # Consulta la API para obtener el usuario y compararlo con el nombre de usuario proporcionado
        user = Usuario.objects.get(usuario=usuario)

        # Verifica si la contraseña proporcionada coincide con la almacenada en la base de datos
        if user.contraseña == contraseña:
            # Elimina la cuenta del usuario
            user.delete()
            return Response({'eliminado': True})
    except Usuario.DoesNotExist:
        pass  # El usuario no existe en la base de datos

    return Response({'eliminado': False})


# Mientras que a este autenticar_usuario lo utilizamos para logearnos a traves del SuperUsuario que cree con django:
#usuario: cris0686  contraseña: Cris15401212

# @api_view(['POST'])
# def autenticar_usuario(request):
#     usuario = request.data.get('usuario')
#     contraseña = request.data.get('contraseña')

#     user = authenticate(username=usuario, password=contraseña)

#     if user is not None:
#         return Response({'autenticado': True})
#     else:
#         return Response({'autenticado': False})





    
