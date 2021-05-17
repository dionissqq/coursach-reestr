from django.db import models

class Media(models.Model):
    submission_date = models.DateField()
    name = models.CharField(max_length = 256)
    founders = models.CharField(max_length = 512)
    doc_registration_unit = models.CharField(max_length = 256)
    doc_registration_date = models.DateField()
    type = models.IntegerField()
    languages = models.CharField(max_length = 256)
    distribution_zone = models.IntegerField()
    goals = models.CharField(max_length = 512)
    publication_frequency = models.CharField(max_length = 32)
    volume = models.CharField(max_length = 32)
    legal_location = models.CharField(max_length = 256)
    legal_bank_acc = models.CharField(max_length = 256)
    status = models.IntegerField()
    legal_id = models.IntegerField()
    editorial_location = models.CharField(max_length = 128)
    type_by_purpose = models.IntegerField()
    readers_category = models.IntegerField()
    сertificate_number = models.CharField(max_length = 32)
    registration_date = models.DateField()
    final_registration_unit = models.CharField(max_length = 256)
    duplicate_doc_name = models.CharField(max_length = 128)
    duplicate_doc_number = models.IntegerField()
    duplicate_doc_date = models.DateField()
    duplicate_doc_issued = models.CharField(max_length = 128)
    duplicate_date = models.DateField()
    duplicate_unit = models.CharField(max_length = 256)
    re_registration = models.BooleanField()
    control_copy_date = models.DateField()
    removal_date = models.DateField()
    expiration_date = models.DateField()
    expiration_doc_name = models.CharField(max_length = 128)
    expiration_doc_number = models.IntegerField()
    expiration_doc_issued = models.CharField(max_length = 256)
    additional = models.CharField(max_length = 512)
    registrar = models.IntegerField()

class MediaChanges(models.Model):
    mediaID = models.ForeignKey(Media, on_delete=models.CASCADE)
    registrarID = models.IntegerField()
    doc_name = models.CharField(max_length=256)
    doc_number = models.IntegerField()
    doc_date = models.DateField()
    doc_issued =  models.CharField(max_length=256)
    changed_field_name = models.CharField(max_length=32)
    old_value = models.CharField(max_length=512)
    date = models.DateField()