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

def tech(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'tjinc/tech.html', context)

def license(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'tjinc/license.html', context)


def buffer(request):
    """
    Controller for the app help page.
    """
    context = {}

    return render(request, 'tjinc/buffer.html', context)