#!/bin/sh

#/Applications/blender.app/Contents/MacOS/blender
echo $1
#for FILE in FINAL/*
blender --background scene.blend --python blender.py --render-output //picture_$1 --engine CYCLES --use-extension 1 --render-frame 1 -t 6 -- $1
blender --background scene.blend  --python blender.py --render-output //render_$1 --render-format AVIRAW  -s 1 -e 1 -t 6 -a -- $1

#done
#-use-extension 1

