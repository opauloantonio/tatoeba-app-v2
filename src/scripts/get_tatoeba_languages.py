# This scrip will fetch the codes, names and SVG flags
# for all languages currently available in Tatoeba under LANGUAGE_LIST_URL
# it'll also generate HTML and JSON files with the most recent data

import json
import requests
from bs4 import BeautifulSoup

LANGUAGE_LIST_URL = 'https://tatoeba.org/en/stats/sentences_by_language'

print("Requesting data...")

page = requests.get(LANGUAGE_LIST_URL)
soup = BeautifulSoup(page.text, 'html.parser')

print("Data acquired!")

with open('test_page.html', 'w', encoding='utf-8') as f:
    f.write(page.text)

languages = []

# the languages are currently organized in a table with a class 'languages-stats'
# the first row can be ignored as it is only a header
# then, the subsequent rows will have the following shape:

"""
  <tr>
    <td>1</td>
    <td>
      <img src="/img/flags/eng.svg?1662902860" class="language-icon" title="English" alt="eng" width="30" height="20"/>
    </td>
    <td>eng</td>
    <td>
      <a href="/en/sentences/show_all_in/eng/none/none/indifferent">English</a>
    </td>
    <td class="num-sentences">
      <div class="bar" style="width:100%"></div>
      1,642,762
    </td>
  </tr>
"""

languages_table = soup.find('table', { 'class': 'languages-stats' })
rows = languages_table.find_all('tr')
language_quantity = len(rows) - 1

print(f"Found {language_quantity} languages!")

for index, language in enumerate(rows):
    if index == 0:
        continue

    tds = language.find_all('td')

    languages.append({
        'popularity': index,
        'code': tds[2].text,
        'name': tds[3].find('a').text,
        'svg_url': 'https://tatoeba.org' + tds[1].find('img')['src'],
    })

    print(f"Parsing language {index} of {language_quantity}", end="\r")

with open('language_data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(languages, indent=2))

print("\nData succesfully generated!")
