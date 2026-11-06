
from django.contrib.messages import get_messages
from inertia import render as inertia_render


def render(request, component, props=None, template_data=None):
    props = props or {}

    # Get Django messages
    django_messages = get_messages(request)

    flash_messages = []

    for message in django_messages:
        flash_messages.append({
            "level": message.level_tag,
            "message": str(message),
        })

    # Add messages to Inertia props
    props = {
        **props,
        "flash": {
            "messages": flash_messages,
        },
    }

    return inertia_render(
        request,
        component,
        props,
        template_data
    )

