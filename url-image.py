import os
import requests
import json
import base64


# Set your API key
api_key = '022beefda5b8afe9ac35d437c9cbed4c'

# Set the directory path of the images
directory_path = '/Users/randyyono/Desktop/products1/'

# Set the API endpoint
api_endpoint = 'https://api.imgbb.com/1/upload'

# Initialize an empty list to store the image URLs
image_urls = []

# Loop through all files in the directory
for filename in os.listdir(directory_path):
    filepath = os.path.join(directory_path, filename)
    
    # Skip if not a file
    if not os.path.isfile(filepath):
        continue
    
    # Read the image file as binary
    with open(filepath, 'rb') as file:
        # Encode the image bytes as base64
        image_data = file.read()
        image_data_base64 = base64.b64encode(image_data)
    
    # Set the POST parameters for the API request
    params = {
        "key": api_key,
        "image": image_data_base64.decode('utf-8')
    }

    # Send the API request
    response = requests.post(api_endpoint, params=params)

    # Check if the API call was successful
    if response.status_code == 200:
        # Get the image URL from the response JSON
        response_json = json.loads(response.text)
        image_url = response_json['data']['url']

        # Append the image URL to the list
        image_urls.append(image_url)
    else:
        # Print the error message if the API call failed
        print(f"Error uploading {filename}: {response.text}")

# Write the image URLs to a text file
with open(os.path.join(directory_path, 'image_urls.txt'), 'w') as file:
    file.write('\n'.join(image_urls))
    
# Print the image URLs
print('\n'.join(image_urls))
