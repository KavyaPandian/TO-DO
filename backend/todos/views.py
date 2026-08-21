from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(ModelViewSet):

    serializer_class = TodoSerializer

    def get_device_id(self):
        device_id = self.request.headers.get('X-Device-ID')

        if not device_id:
            raise ValidationError({
                'device_id': 'Device ID is required.'
            })

        return device_id

    def get_queryset(self):
        device_id = self.get_device_id()

        return Todo.objects.filter(
            device_id=device_id
        ).order_by('-created_at')

    def perform_create(self, serializer):
        device_id = self.get_device_id()

        serializer.save(
            device_id=device_id
        )