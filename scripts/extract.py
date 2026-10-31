"""Extract original, unmodified demo resources from the local CrossOver install."""
from pathlib import Path
import json, shutil
import pefile
SOURCE=Path.home()/'Library/Application Support/CrossOver/Bottles/Steam/drive_c/Program Files (x86)/Steam/steamapps/common/Tiling Forest'
OUT=Path(__file__).resolve().parents[1]/'dist'
pe=pefile.PE(str(SOURCE/'tiling_forest.exe'))
for t in pe.DIRECTORY_ENTRY_RESOURCE.entries:
 if str(t.name)!='FILE': continue
 for e in t.directory.entries:
  name=str(e.name).lower()
  if not name.startswith(('world/','font/')):continue
  d=e.directory.entries[0].data.struct
  p=OUT/'assets'/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(pe.get_data(d.OffsetToData,d.Size))
shutil.copytree(SOURCE/'world/forest/guide',OUT/'assets/world/forest/guide',dirs_exist_ok=True)
shutil.copytree(SOURCE/'world/forest/text',OUT/'assets/world/forest/text',dirs_exist_ok=True)
data={}
for n in ['field','tile','palette','rule','event','theme']:
 data[n]=json.loads((OUT/f'assets/world/forest/map/{n}.json').read_text(encoding='utf-8-sig'))
data['text']=json.loads((SOURCE/'world/forest/text/zh-CN.json').read_text())
data['guide']={str(p.parent.relative_to(SOURCE/'world/forest/guide')):json.loads(p.read_text(encoding='utf-8-sig')) for p in (SOURCE/'world/forest/guide').rglob('zh-CN.json')}
(OUT/'data.json').write_text(json.dumps(data,ensure_ascii=False))
print('Extracted',len(data['field']['sections'][0]['blocks']),'original areas')
