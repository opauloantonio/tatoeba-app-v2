# This script will generate a TS constants file for the languages
# Since I cannot dinamically import assets into React Native components
# So this new file will have a list of fixed imports to be used with the Image component

import json

with open('language_data.json', encoding='utf-8') as f:
    languages = json.loads(f.read())

with open('languages.ts', 'w', encoding='utf-8') as f:
    lines = [
      'import { ImageSourcePropType } from \'react-native\';\n\n'
      '/* eslint-disable max-len */\n',
      'export type Language = {\n',
      '  name: string;\n',
      '  code: LanguageCode;\n',
      '  icon: ImageSourcePropType;\n',
      '};\n\n',

      'export const languages: Language[] = [\n',
    ]

    code_types = 'export type LanguageCode = \'\' | \'und\' |'

    for index, language in enumerate(languages):
        code = language['code']
        name = language['name'].replace("'", "\\'")
        icon = f'require(\'@assets/flags/{code}.png\')'

        lines.append(f"  {{ code: '{code}', name: '{name}', icon: {icon} }},\n")

        type_ending = ';\n\n' if index == len(languages) - 1 else ' |'
        code_types += f" '{code}'{type_ending}"

    lines.insert(0, code_types)
    lines.append('];\n')

    f.writelines(lines)
