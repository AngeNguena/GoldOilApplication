def serialize_form(form):
    """
    Convert Django form into JSON serializable structure for Inertia.
    """
    data = {}
    errors = {}

    for name, field in form.fields.items():
        data[name] = form[name].value() or ""

    for name, err in form.errors.items():
        errors[name] = err[0]

    return data, errors
