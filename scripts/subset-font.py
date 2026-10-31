"""Rebuild the original-font subset after changing interface translations.
Requires: pip install fonttools brotli
"""
from pathlib import Path
from fontTools import subset
root = Path(__file__).resolve().parents[1] / 'dist'
chars = ''.join((root / p).read_text() for p in ['app.js', 'i18n.js', 'index.html', 'data.json'])
chars += ''.join(chr(i) for i in range(32, 127))
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
font = subset.load_font(str(root / 'assets/font/notosanssc-medium.otf'), options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=chars)
subsetter.subset(font)
output = root / 'assets/font/notosanssc-web.woff2'
subset.save_font(font, str(output), options)
print(f'Wrote {output.name}: {output.stat().st_size:,} bytes')
