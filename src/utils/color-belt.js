function Belt() {
    var c = document.getElementsByTagName('canvas')[0],
    x = c.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    w = window.innerWidth,
    h = window.innerHeight,
    f = 90, // InitialDistance
    q,
    z = Math.random,
    r = 0,
    u = Math.PI * 2,
    v = Math.cos

  c.width = w * pr
  c.height = h * pr
  x.scale(pr, pr) // Synchronization with devicePixelRatio
  x.globalAlpha = 0.6 // gloabalAlpha set or return the opacity-value of draw

  function i() {
    x.clearRect(0, 0, w, h) // clear all rect
    q = [
      { x: 0, y: h * 0.7 + f },
      { x: 0, y: h * 0.7 - f }
    ]
    while (q[1].x < w + f) d(q[0], q[1]) // w + f
  }

  function d(i, j) {
    x.beginPath()
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)
    var k = j.x + (z() * 2 - 0.25) * f,
      // x->[-0.25 * f, 1.75 * f]
      // x_average = 0.75 * 90 = 67.5
      // number_rects = 1080 / 67.5 = 16
      n = y(j.y)
    /*When k < 0:
     *The first rect will be invisable, it is in the window's left.
     *So we can see the first line on the window sometimes changes the initial position.
     */
    x.lineTo(k, n)
    x.closePath()
    r -= u / -50
    x.fillStyle =
      '#' +
      (
        ((v(r) * 127 + 128) << 16) |
        ((v(r + u / 3) * 127 + 128) << 8) |
        (v(r + (u / 3) * 2) * 127 + 128)
      ).toString(16)

    x.fill()
    q[0] = q[1] // old point -> new q[0]
    q[1] = { x: k, y: n } // new point(k, n) -> new q[1]
    // constant line
  }

  function y(p) {
    var t = p + (z() * 2 - 1.1) * f
    return t > h || t < 0 ? y(p) : t
  }
  document.onclick = i
  i()
}
export default Belt;
