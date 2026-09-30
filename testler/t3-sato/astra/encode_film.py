"""Encode the 8 fps original renders into a 24 fps presentation master.
Interpolation is performed separately per shot, never across camera cuts.
Run after render_film.py: python3 encode_film.py
"""
from pathlib import Path
import subprocess, os, sys
root=Path(__file__).resolve().parent
step=int(sys.argv[1]) if len(sys.argv)>1 else 3
assert step in (1,2,3), 'Use a frame step of 1, 2 or 3.'
source_fps=24/step
def run(args):subprocess.run(args,cwd=root,check=True)
for index,(start,end,duration) in enumerate([(1,240,10),(241,408,7),(409,576,7)],1):
    d=root/'renders'/f'shot{index}';d.mkdir(exist_ok=True)
    for old in d.glob('*.png'):old.unlink()
    for n,f in enumerate(range(start,end+1,step),1):
        src=root/'renders'/f'frame_{f:04d}.png'
        if not src.exists():raise RuntimeError(f'Missing source frame: {src}')
        dst=d/f'{n:04d}.png'
        if not dst.exists():os.link(src,dst)
    run(['ffmpeg','-hide_banner','-loglevel','warning','-y','-threads','4','-framerate',str(source_fps),'-i',str(d/'%04d.png'),
         '-vf','hqdn3d=1.5:1.5:4:4,tpad=stop_mode=clone:stop_duration=1,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=none',
         '-t',str(duration),'-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-threads','4',str(root/'renders'/f'shot{index}.mp4')])
(root/'renders'/'edit.txt').write_text(''.join(f"file 'shot{i}.mp4'\n" for i in range(1,4)))
serif='/usr/share/fonts/liberation/LiberationSerif-Regular.ttf'
sans='/usr/share/fonts/Adwaita/AdwaitaSans-Regular.ttf'
# Text lives in the negative space of the establishing shot.
fade="if(lt(t,1.2),0,if(lt(t,2.2),(t-1.2),if(lt(t,5.2),1,if(lt(t,6.2),6.2-t,0))))"
vf=(f"drawtext=fontfile={serif}:text='K A R A K I Y I':fontsize=34:fontcolor=0xf0e4ce:x=58:y=74:alpha='{fade}',"
    f"drawtext=fontfile={sans}:text='G E L G İ T   K A L E S İ':fontsize=11:fontcolor=0xd1b788:x=61:y=122:alpha='{fade}',"
    "fade=t=in:st=0:d=0.75,fade=t=out:st=22.7:d=1.3")
run(['ffmpeg','-hide_banner','-loglevel','warning','-y','-f','concat','-safe','0','-i',str(root/'renders'/'edit.txt'),
     '-i',str(root/'assets'/'tidal_score.wav'),'-vf',vf,'-c:v','libx264','-preset','slow','-crf','17','-pix_fmt','yuv420p',
     '-threads','4','-c:a','aac','-b:a','192k','-t','24','-movflags','+faststart','-metadata','title=KARAKIYI — Gelgit Kalesi',str(root/'render.mp4')])
print('render.mp4 complete.')
