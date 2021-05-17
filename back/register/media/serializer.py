from rest_framework import serializers
from .models import Media
from founders.serializer import FounderSerializer

class MediaSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    submission_date = serializers.DateField(format="%d/%m/%Y")
    name = serializers.CharField()
    founders = FounderSerializer(read_only = True, many = True)
    doc_registration_unit = serializers.CharField()
    doc_registration_date = serializers.DateField(format="%d/%m/%Y")
    type = serializers.IntegerField()
    languages = serializers.CharField()
    distribution_zone = serializers.IntegerField()
    goals = serializers.CharField()
    publication_frequency = serializers.CharField()
    volume = serializers.CharField()
    legal_location = serializers.CharField()
    legal_bank_acc = serializers.CharField()
    status = serializers.IntegerField()
    legal_id = serializers.IntegerField()
    editorial_location = serializers.CharField()
    type_by_purpose = serializers.IntegerField()
    readers_category = serializers.IntegerField()
    сertificate_number = serializers.CharField()
    registration_date = serializers.DateField(format="%d/%m/%Y")
    final_registration_unit = serializers.CharField()
    duplicate_doc_name = serializers.CharField()
    duplicate_doc_number = serializers.IntegerField()
    duplicate_doc_date = serializers.DateField(format="%d/%m/%Y")
    duplicate_doc_issued = serializers.CharField()
    duplicate_date = serializers.DateField(format="%d/%m/%Y")
    duplicate_unit = serializers.CharField()
    re_registration = serializers.BooleanField()
    control_copy_date = serializers.DateField(format="%d/%m/%Y")
    removal_date = serializers.DateField(format="%d/%m/%Y")
    expiration_date = serializers.DateField(format="%d/%m/%Y")
    expiration_doc_name = serializers.CharField()
    expiration_doc_number= serializers.IntegerField()
    expiration_doc_issued = serializers.CharField()
    additional = serializers.CharField()
    registrar = serializers.IntegerField()

    class Meta:
        model = Media
        fields = '__all__'

class MediaPublicSerializer(serializers.Serializer):
    # founders =  FounderSerializer(read_only = True, many = True)
    id = serializers.IntegerField(read_only=True)
    type = serializers.CharField()
    name = serializers.CharField()
    сertificate_number = serializers.CharField()
    registration_date = serializers.DateField(format="%d/%m/%Y")
    final_registration_unit = serializers.CharField()

    class Meta:
        model = Media
        fields = ['id', 'type', 'name', 'сertificate_number' , 'registration_date',\
            'final_registration_unit']