# from django.shortcuts import render
# from django.http.response import JsonResponse
# from api.models import Company,Vacancy

# def companies_list(req):
#     companies = Company.objects.all()
#     companies_json = [company.to_json() for company in companies]
#     return JsonResponse(companies_json,safe=False)

# def get_company(req, id):
#     try:
#         company = Company.objects.get(id=id)
#     except Company.DoesNotExist as e:
#         return JsonResponse({"message": str(e)}, status=400)
#     return JsonResponse(company.to_json())

# def company_vacancy(req,id):
#     try:
#         vacancies_json = []
#         company = Company.objects.get(id=id)
#         for vacancy in Vacancy.objects.filter(company_id=int(id)):
#             obj = vacancy.to_json()
#             vacancies_json.append(obj) 
#     except Company.DoesNotExist as e:
#         return JsonResponse({"message": str(e)}, status=400)
#     return JsonResponse(vacancies_json, safe=False)

# def vacancy_list(req):
#     vacancies = Vacancy.objects.all()
#     vacancies_json = [vac.to_json() for vac in vacancies]
#     return JsonResponse(vacancies_json,safe=False)

# def get_vacancy(req,id):
#     try:
#         vacancy = Vacancy.objects.get(id=id)
#     except Vacancy.DoesNotExist as e:
#         return JsonResponse({"message": str(e)}, status=400)
#     return JsonResponse(vacancy.to_json())

# def top_vacancy(req):
#     vacancies = Vacancy.objects.all()
#     vacancies_json = [vac.to_json() for vac in vacancies]
#     sorted_vacs = sorted(vacancies_json, key=lambda x: x["salary"], reverse=True)
#     return JsonResponse(sorted_vacs,safe=False)



from django.shortcuts import render
from django.http.response import JsonResponse
from api.models import Company, Vacancy
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def companies_list(request):
    if request.method == 'GET':
        # Получение списка всех компаний
        companies = Company.objects.all()
        companies_json = [company.to_json() for company in companies]
        return JsonResponse(companies_json, safe=False)
        
    elif request.method == 'POST':
        # Создание новой компании
        try:
            data = json.loads(request.body)
            
            # Проверка обязательных полей
            if not all([data.get('name'), data.get('city')]):
                return JsonResponse({'error': 'Missing required fields (name and city)'}, status=400)
                
            company = Company.objects.create(
                name=data['name'],
                description=data.get('description', ''),
                city=data['city'],
                address=data.get('address', '')
            )
            return JsonResponse(company.to_json(), status=201)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def company_detail(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return JsonResponse({'error': 'Company not found'}, status=404)

    if request.method == 'GET':
        # Получение конкретной компании
        return JsonResponse(company.to_json())
        
    elif request.method == 'PUT':
        # Обновление компании
        try:
            data = json.loads(request.body)
            company.name = data.get('name', company.name)
            company.description = data.get('description', company.description)
            company.city = data.get('city', company.city)
            company.address = data.get('address', company.address)
            company.save()
            return JsonResponse(company.to_json())
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        # Удаление компании
        company.delete()
        return JsonResponse({'message': 'Company deleted successfully'}, status=204)

@csrf_exempt
def company_vacancies(request, id):
    if request.method == 'GET':
        # Получение списка вакансий компании
        try:
            company = Company.objects.get(id=id)
            vacancies = Vacancy.objects.filter(company_id=id)
            vacancies_json = [vac.to_json() for vac in vacancies]
            return JsonResponse(vacancies_json, safe=False)
        except Company.DoesNotExist:
            return JsonResponse({'error': 'Company not found'}, status=404)


@csrf_exempt
def vacancy_list(request):
    if request.method == 'GET':
        # Получение списка всех вакансий
        vacancies = Vacancy.objects.all()
        vacancies_json = [vac.to_json() for vac in vacancies]
        return JsonResponse(vacancies_json, safe=False)
        
    elif request.method == 'POST':
        # Создание новой вакансии
        try:
            data = json.loads(request.body)
            
            # Проверка обязательных полей
            if not all([data.get('name'), data.get('salary'), data.get('company_id')]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)
                
            vacancy = Vacancy.objects.create(
                name=data['name'],
                description=data.get('description', ''),
                salary=data['salary'],
                company_id=data['company_id']
            )
            return JsonResponse(vacancy.to_json(), status=201)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def vacancy_detail(request, id):
    try:
        vacancy = Vacancy.objects.get(id=id)
    except Vacancy.DoesNotExist:
        return JsonResponse({'error': 'Vacancy not found'}, status=404)

    if request.method == 'GET':
        # Получение конкретной вакансии
        return JsonResponse(vacancy.to_json())
        
    elif request.method == 'PUT':
        # Обновление вакансии
        try:
            data = json.loads(request.body)
            vacancy.name = data.get('name', vacancy.name)
            vacancy.description = data.get('description', vacancy.description)
            vacancy.salary = data.get('salary', vacancy.salary)
            if 'company_id' in data:
                vacancy.company_id = data['company_id']
            vacancy.save()
            return JsonResponse(vacancy.to_json())
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        # Удаление вакансии
        vacancy.delete()
        return JsonResponse({'message': 'Vacancy deleted successfully'}, status=204)

@csrf_exempt
def top_vacancy(request):
    if request.method == 'GET':
        # Топ-10 вакансий по зарплате
        vacancies = Vacancy.objects.order_by('-salary')[:10]
        vacancies_json = [vac.to_json() for vac in vacancies]
        return JsonResponse(vacancies_json, safe=False)