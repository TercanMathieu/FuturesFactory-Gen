import bpy
import sys
argv = sys.argv
argv = argv[argv.index("--") + 1:]

bpy.data.images['bayc.png'].filepath = './' + argv[0]
