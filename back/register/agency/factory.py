import factory
import factory.fuzzy
from factory.django import DjangoModelFactory
from .models import Agency
from faker import Factory

faker = Factory.create()

class AgencyFactory(DjangoModelFactory):
    class Meta:
        model = Agency
    
    submission_date = faker.date()
    # founders = ManyToManyField(Founder)
    name = factory.fuzzy.FuzzyText(length = 256)
    doc_registration_unit = factory.fuzzy.FuzzyText(length = 256) 
    register_registration_date = faker.date()
    type = factory.fuzzy.FuzzyInteger(0, 10000)
    Form = factory.fuzzy.FuzzyInteger(0, 10000)
    languages = factory.fuzzy.FuzzyText(length = 256) 
    distribution_scope = factory.fuzzy.FuzzyInteger(0, 10000)
    goals = factory.fuzzy.FuzzyText(length = 256) 
    money_source = factory.fuzzy.FuzzyText(length = 512) 
    legal_location = factory.fuzzy.FuzzyText(length = 256) 
    legal_bank_acc = factory.fuzzy.FuzzyText(length = 256) 
    legal_id = factory.fuzzy.FuzzyInteger(0, 10000)
    location = factory.fuzzy.FuzzyText(length = 256) 
    connection= factory.fuzzy.FuzzyText(length = 512) 
    сertificate_number = factory.fuzzy.FuzzyText(length = 32) 
    registration_date = faker.date()
    final_registration_unit = factory.fuzzy.FuzzyText(length = 128) 
    duplicate_doc_name = factory.fuzzy.FuzzyText(length = 128) 
    duplicate_doc_number = factory.fuzzy.FuzzyInteger(0, 10000)
    duplicate_doc_date = faker.date()
    duplicate_doc_issued = factory.fuzzy.FuzzyText(length = 128)
    duplicate_date = faker.date()
    duplicate_unit = factory.fuzzy.FuzzyText(length = 128)
    re_registration = factory.fuzzy.FuzzyInteger(0, 1)
    termination_date = faker.date()
    termination_doc_name = factory.fuzzy.FuzzyText(length = 128) 
    termination_doc_number = factory.fuzzy.FuzzyInteger(0, 10000)
    termination_doc_issued = factory.fuzzy.FuzzyText(length = 128)
    additional = factory.fuzzy.FuzzyText(length = 512) 
    registrar = factory.fuzzy.FuzzyInteger(0, 10000)
