import urllib.request
import json
import ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def search(query):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=5"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req, context=ctx)
        data = json.loads(response.read().decode('utf-8'))
        for res in data['results']:
            print(f"ID: {res['id']}, URL: {res['urls']['regular']}")
    except Exception as e:
        print(f"Error: {e}")

print('--- Waxing ---')
search('waxing')
print('--- Wax Beans ---')
search('wax beans')
print('--- Spa Treatment ---')
search('spa treatment')
