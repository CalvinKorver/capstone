from django.apps import AppConfig


class QuickstartConfig(AppConfig):
    name = 'quickstart'

    def ready(self):
        from . import signals