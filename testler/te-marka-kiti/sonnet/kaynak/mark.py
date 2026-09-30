from geo import *
# --- Demlik icon geometry, viewBox 0 0 240 240 ---
def parts():
    P={}
    # kettle body (bottom)
    P['kettle']="M92 134 C68 144 51 162 53 182 C55 199 67 210 85 210 L155 210 C173 210 185 199 187 182 C189 162 172 144 148 134 Z"
    # spout: tapered stroke along curve, from body to lip
    sp=chain([((66,192),(46,186),(36,162),(32,130))])
    P['spout']=stroke_outline(sp,24,9)
    # kettle handle
    h=chain([((176,152),(208,148),(216,194),(184,200))])
    P['khandle']=stroke_outline(h,9,9)
    # demlik body
    P['demlik']="M93 126 C75 116 69 98 77 84 C83 74 96 72 99 68 L141 68 C144 72 157 74 163 84 C171 98 165 116 147 126 Z"
    hh=chain([((163,88),(184,84),(187,116),(163,114))])
    P['dhandle']=stroke_outline(hh,7.5,7.5)
    P['lid']="M99 62 C99 43 141 43 141 62 Z"
    P['knob']="M120 26.5 a6.5 6.5 0 1 0 0.01 0 Z"
    # tea glass (ince belli) cut in kettle belly, centered 120,172
    P['glass']="M101 151 L139 151 C138 164 129 169 129 177 C129 184 135 190 135 197 C135 202 132 205 128 205 L112 205 C108 205 105 202 105 197 C105 190 111 184 111 177 C111 169 102 164 101 151 Z"
    return P
def icon_body(P,with_glass_cut=True):
    """returns single compound path d (glass as evenodd hole in kettle) + rest"""
    return P
