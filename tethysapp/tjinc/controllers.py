from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'tjinc/home.html', context)

def help(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'tjinc/help.html', context)


def buffer(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'tjinc/buffer.html', context)