import bpy
import sys
argv = sys.argv
argv = argv[argv.index("--") + 1:]

bpy.data.images['NMM_60s_1.png'].filepath = './' + argv[0]
