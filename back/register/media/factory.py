import factory
import factory.fuzzy
from factory.django import DjangoModelFactory
from .models import Media
from faker import Factory

faker = Factory.create()

class MediaFactory(DjangoModelFactory):
    class Meta:
        model = Media
    
    submission_date = faker.date()
    name = faker.name()
    # founders = models.ManyToManyField(Founder)
    doc_registration_unit = factory.fuzzy.FuzzyText(length=40)
    doc_registration_date = faker.date()
    type = factory.fuzzy.FuzzyInteger(0, 10000)
    languages = factory.fuzzy.FuzzyText(length=40)
    distribution_zone = factory.fuzzy.FuzzyInteger(0, 10000)
    goals = factory.fuzzy.FuzzyText(length=40)
    publication_frequency = factory.fuzzy.FuzzyText(length=30)
    volume = factory.fuzzy.FuzzyText(length=32)
    legal_location = factory.fuzzy.FuzzyText(length=40)
    legal_bank_acc = factory.fuzzy.FuzzyText(length=40)
    status = factory.fuzzy.FuzzyInteger(0, 10000)
    legal_id = factory.fuzzy.FuzzyInteger(0, 10000)
    editorial_location = factory.fuzzy.FuzzyText(length=40)
    type_by_purpose = factory.fuzzy.FuzzyInteger(0, 10000)
    readers_category = factory.fuzzy.FuzzyInteger(0, 10000)
    сertificate_number = factory.fuzzy.FuzzyText(length=40)
    registration_date = faker.date()
    final_registration_unit = factory.fuzzy.FuzzyText(length=40)
    duplicate_doc_name = factory.fuzzy.FuzzyText(length=40)
    duplicate_doc_number = factory.fuzzy.FuzzyInteger(0, 10000)
    duplicate_doc_date = faker.date()
    duplicate_doc_issued = factory.fuzzy.FuzzyText(length=40)
    duplicate_date = faker.date()
    duplicate_unit = factory.fuzzy.FuzzyText(length=40)
    re_registration = factory.fuzzy.FuzzyInteger(0, 1)
    control_copy_date = faker.date()
    removal_date = faker.date()
    expiration_date = faker.date()
    expiration_doc_name = factory.fuzzy.FuzzyText(length=40)
    expiration_doc_numbe= factory.fuzzy.FuzzyInteger(0, 10000)
    expiration_doc_issued = factory.fuzzy.FuzzyText(length=40)
    additional = factory.fuzzy.FuzzyText(length=40)
    registrar = factory.fuzzy.FuzzyInteger(0, 10000)