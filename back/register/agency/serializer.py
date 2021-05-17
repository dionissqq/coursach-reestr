from rest_framework import serializers
from .models import Agency
from founders.serializer import FounderSerializer

class AgencySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    submission_date = serializers.DateField(format="%d/%m/%Y")
    founders = serializers.CharField()
    name = serializers.CharField()
    doc_registration_unit = serializers.CharField() 
    register_registration_date = serializers.DateField(format="%d/%m/%Y")
    type = serializers.IntegerField()
    Form = serializers.IntegerField()
    languages = serializers.CharField() 
    distribution_scope = serializers.IntegerField()
    goals = serializers.CharField() 
    money_source = serializers.CharField() 
    legal_location = serializers.CharField() 
    legal_bank_acc = serializers.CharField() 
    legal_id = serializers.IntegerField()
    location = serializers.CharField() 
    connection= serializers.CharField() 
    certificate_number = serializers.CharField() 
    registration_date = serializers.DateField(format="%d/%m/%Y")
    final_registration_unit = serializers.CharField() 
    duplicate_doc_name = serializers.CharField() 
    duplicate_doc_number = serializers.IntegerField()
    duplicate_doc_date = serializers.DateField(format="%d/%m/%Y")
    duplicate_doc_issued = serializers.CharField()
    duplicate_date = serializers.DateField(format="%d/%m/%Y")
    duplicate_unit = serializers.CharField()
    re_registration = serializers.BooleanField()
    termination_date = serializers.DateField(format="%d/%m/%Y")
    termination_doc_name = serializers.CharField() 
    termination_doc_number = serializers.IntegerField()
    termination_doc_issued = serializers.CharField()
    additional = serializers.CharField() 
    registrar = serializers.IntegerField()
    class Meta:
        model = Agency
        fields = '__all__'

class AgencyPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # founders = FounderSerializer(read_only = True, many = True)
    type = serializers.IntegerField()
    name = serializers.CharField()
    certificate_number = serializers.CharField() 
    registration_date = serializers.DateField(format="%d/%m/%Y")
    final_registration_unit = serializers.CharField() 
    class Meta:
        model = Agency
        fields = ['id', 'type', 'name', 'certificate_number' , 'registration_date',\
            'final_registration_unit']