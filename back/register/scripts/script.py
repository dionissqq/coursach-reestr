from media.factory import MediaFactory
from agency.factory import AgencyFactory

def run():
    for i in range(10):
        k = AgencyFactory.create()
