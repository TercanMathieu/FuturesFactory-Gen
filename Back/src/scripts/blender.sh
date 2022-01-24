#!/bin/sh

#/Applications/blender.app/Contents/MacOS/blender
echo $1
#for FILE in FINAL/*
blender --background scene.blend --python blender.py --render-output //render_$1 --engine CYCLES --use-extension 1 --render-frame 1  -- $1
#done
