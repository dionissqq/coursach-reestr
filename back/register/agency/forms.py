from django.forms import ModelForm
from .models import AgencyChanges
from django import forms
from django.conf import settings

class AgencyChangesForm(ModelForm):
    doc_date = forms.DateField(input_formats=settings.DATE_INPUT_FORMATS)
    class Meta:
        model = AgencyChanges
        fields = '__all__'
