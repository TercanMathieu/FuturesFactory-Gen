#!/bin/sh

#/Applications/blender.app/Contents/MacOS/blender
#/ mettre un argument qui prend le nom du fichier exact (Mathieu Tercan)
for FILE in FINAL/*
do blender --background scene.blend --python blender.py --render-output //render_$FILE --engine CYCLES --use-extension 1 --render-frame 1  -- $FILE
done
