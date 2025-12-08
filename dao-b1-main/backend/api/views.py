from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from .models import Project, Round, Grant
from .serializers import ProjectSerializer, RoundSerializer, GrantSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class RoundViewSet(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class GrantViewSet(viewsets.ModelViewSet):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
