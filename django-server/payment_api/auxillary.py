from .models import *
import datetime
from datetime import datetime
from rest_framework.pagination import *

#calculating application id 
def generate_id(model, prefix):
    year = 3401
    record_count = model.objects.all().count() 
    place_holders = (6 - len(str(record_count + 1))) * "0"
    app_id = prefix + str(year) + str(place_holders) + str(record_count + 1)
    return(app_id)

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000