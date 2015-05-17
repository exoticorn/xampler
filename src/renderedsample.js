export default class RendererdSample {
    constructor(buffer) {
        this.canvas = document.createElement('canvas');
        let w = 640, h = 64;
        this.canvas.width = w;
        this.canvas.height = h;
        let c = this.canvas.getContext('2d');
        let d = buffer.getChannelData(0);
        for(let x = 0; x < w; ++x) {
            let s = Math.floor(x * d.length / w), e = Math.floor((x + 1) * d.length / w);
            e = Math.max(e, s + 1);
            let min = 1, max = -1;
            for(let i = s; i < e; ++i) {
                min = Math.min(min, d[i]);
                max = Math.max(max, d[i]);
            }
            let y1 = (min * 0.5 + 0.5) * h, y2 = (max * 0.5 + 0.5) * h;
            c.fillRect(x, y1, 1, y2 - y1);
        }
    }
}