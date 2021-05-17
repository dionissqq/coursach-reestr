from django.http import HttpResponse, JsonResponse
from .serializer import AgencyPublicSerializer, AgencySerializer
from rest_framework.views import APIView
from .models import Agency, AgencyChanges
from datetime import datetime
from .forms import AgencyChangesForm
# Create your views here.

class AgencyList(APIView):
    def get(self, request):
        q_p = request.query_params
        agencies = Agency.objects.filter(name__icontains=q_p['name'])
        if q_p['type']!='0':
            agencies = agencies.filter(type = q_p['type'])
        serializer = AgencyPublicSerializer(agencies, many = True)
        
        return JsonResponse(
            {'entities' : serializer.data}, 
            safe=False
        )
    
    def post(self, request):
        print(request.user.id)
        print('we here')
        data = request.data
        id = data.get('id', None)
        
        if id:
            ch_d = data['changes_document']
            doc_date = datetime.strptime(ch_d['doc_date'], '%d/%m/%Y'),
            ch_d['doc_date'] = (doc_date[0].date().strftime("%Y-%m-%d"))
                
            print(ch_d)
            del data['changes_document']
            agency = Agency.objects.get(id=id)
            del data['id']
            for key in data.keys():
                print(key)
                print(ch_d['doc_date'])
                if hasattr(agency, key) and data[key]!= getattr(agency, key):
                    AgencyChanges.objects.create(
                        agencyID = agency,
                        registrarID = request.user.id,
                        doc_name = ch_d['doc_name'],
                        doc_number = ch_d['doc_number'],
                        doc_date = ch_d['doc_date'],
                        doc_issued =  ch_d['doc_issued'],
                        changed_field_name = key,
                        old_value = getattr(agency, key)
                    )
            return HttpResponse(status=200)
        
        agency = Agency.objects.create(**data)
        return JsonResponse(
            {'id':agency.id}, 
            safe=False
        )

class AgencyView(APIView):

    def get(self, request, pk):
        try:
            agency = Agency.objects.get(id = pk)
            serializer = AgencySerializer(agency) if request.user.is_authenticated else \
                AgencyPublicSerializer(agency)

            return JsonResponse(
                serializer.data, 
                safe=False
            )
        except:
            return JsonResponse({'error':'no agency with such id'},status = 404)