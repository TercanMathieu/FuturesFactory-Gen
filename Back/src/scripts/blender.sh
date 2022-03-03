#!/bin/sh

#/Applications/blender.app/Contents/MacOS/blender
echo $1
#for FILE in FINAL/*
blender --background scene.blend  --python blender.py --render-output //render_$1 --render-format AVIRAW  -s 1 -e 100 -t 6 -a -- $1

#done
#-use-extension 1

