from inertia import render

def index(request):
  return render(request, 'Home')

def contact(request):
  return render(request, 'Contact')