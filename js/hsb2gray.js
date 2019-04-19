// 输出r,g,b范围为[0,255],可根据需求做相应调整
function hsb2rgb(h,s,v){
	var s = s/100;
	var v = v/100;
	var h1 = Math.floor(h/60) % 6;
	var f = h / 60 - h1;
	var p = v * (1-s);
	var q = v * (1-f*s);
	var t = v * (1-(1-f) * s);
	var r, g, b;
	switch(h1){
		case 0:
			r=v;
			g=t;
			b=p;
			break;
		case 1:
			r=q;
			g=v;
			b=p;
			break;
		case 2:
			r=p;
			g=v;
			b=t;
			break;
		case 3:
			r=p;
			g=q;
			b=v;
			break;
		case 4:
			r=t;
			g=p;
			b=v;
			break;
		case 5:
			r=v;
			g=p;
			b=q;
			break;
	}
	return [Math.round(r*255),Math.round(g*255),Math.round(b*255)];
}
// r,g,b范围为[0,255],转换成h范围为[0,360]
// s,v为百分比形式，范围是[0,100],可根据需求做相应调整
function rgb2hsb(r,g,b){
	r=r/255;
	g=g/255;
	b=b/255;
	var h,s,v;
	var min=Math.min(r,g,b);
	var max=v=Math.max(r,g,b);
	var l=(min+max)/2;
	var difference = max-min;

	if(max==min){
		h=0;
	}else{
		switch(max){
			case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
			case g: h=2.0+(b-r)/difference;break;
			case b: h=4.0+(r-g)/difference;break;
		}
		h=Math.round(h*60);
	}
	if(max==0){
		s=0;
	}else{
		s=1-min/max;
	}
	s=Math.round(s*100);
	v=Math.round(v*100);
	return [h,s,v];
}

function toGray(r, g, b) {
		return r*0.3+g*0.59+b*0.11
}
function rgb2gray(r, g, b) {
	var rgbColor = [r, g, b];
	var gray = toGray.apply(null, rgbColor);
	var hsbGray = rgb2hsb(gray, gray, gray);
	return hsbGray[2];
}
/**
 * 
 * @param {Array<number> | number} h 
 * @param {number} s 
 * @param {number} b 
 * @return {number}
 */
function hsb2gray(h, s, b) {
	var hsbColor = [h, s, b];
	var rgbColor = hsb2rgb.apply(null, hsbColor);
	return rbg2gray.apply(null, rgbColor);
}

