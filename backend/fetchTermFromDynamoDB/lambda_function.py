import json
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

# Create a DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = dynamodb.Table('CloudDefinitions')

def lambda_handler(event, context):
    try:

        # Get the term from the query string parameters
        term = event.get('queryStringParameters', {}).get('term', '')
        
        # Check if term is empty or contains only spaces
        if not term.strip():
            return {
                'statusCode': 204,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                'body': ""
            }
        
        # Get the term from the query string parameters
        term = term.lower().strip()
        print(f"Searching for term: '{term}'")

        response = table_name.scan(
            FilterExpression=Attr('term').contains(term)
        )

        items = response.get('Items', [])
        print(items)
        if items:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  # Allow all origins or specify a specific origin
                    'Access-Control-Allow-Methods': 'OPTIONS,GET',  # Allowed methods
                    'Access-Control-Allow-Headers': 'Content-Type',  # Allow necessary headers
                },
                'body': json.dumps({
                    'results': items
                })
            }
        else:
            return {
                'statusCode': 204,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  # Allow all origins or specify a specific origin
                    'Access-Control-Allow-Methods': 'OPTIONS,GET',  # Allowed methods
                    'Access-Control-Allow-Headers': 'Content-Type',  # Allow necessary headers
                },
                'body': ""
            }
    except ClientError as e:
        print(f"AWS Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            'body': json.dumps({'message': 'Error processing the event'})
        }
    
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            'body': json.dumps({'message': 'Unexpected error occurred'})
        }
        