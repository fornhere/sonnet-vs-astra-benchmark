import math
def bez(p0,p1,p2,p3,n=60):
    pts=[]
    for i in range(n+1):
        t=i/n; u=1-t
        x=u**3*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t**3*p3[0]
        y=u**3*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t**3*p3[1]
        pts.append((x,y))
    return pts
def chain(segs,n=60):
    pts=[]
    for s in segs:
        b=bez(*s,n=n)
        pts+= b if not pts else b[1:]
    return pts
def stroke_outline(pts,w0,w1=None,cap=True):
    """variable width stroke -> closed polygon path string, round caps"""
    if w1 is None: w1=w0
    n=len(pts); L=[];R=[]
    for i,(x,y) in enumerate(pts):
        a=pts[max(i-1,0)]; b=pts[min(i+1,n-1)]
        dx,dy=b[0]-a[0],b[1]-a[1]; d=math.hypot(dx,dy) or 1
        nx,ny=-dy/d,dx/d
        w=(w0+(w1-w0)*i/(n-1))/2
        L.append((x+nx*w,y+ny*w)); R.append((x-nx*w,y-ny*w))
    poly=L[:]
    if cap:
        # end cap semicircle at last point
        x,y=pts[-1]; w=w1/2
        a0=math.atan2(L[-1][1]-y,L[-1][0]-x)
        for k in range(1,12):
            a=a0-math.pi*k/12
            poly.append((x+w*math.cos(a),y+w*math.sin(a)))
    poly+=R[::-1]
    if cap:
        x,y=pts[0]; w=w0/2
        a0=math.atan2(R[0][1]-y,R[0][0]-x)
        for k in range(1,12):
            a=a0-math.pi*k/12
            poly.append((x+w*math.cos(a),y+w*math.sin(a)))
    return poly_path(poly)
def poly_path(poly):
    return "M"+" L".join(f"{x:.2f} {y:.2f}" for x,y in poly)+"Z"
