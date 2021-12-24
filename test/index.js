const findStr = (str) => {
  const list = str
  const map = new Map()

  const arr = list.split(',')

  arr.forEach(val => {
    map.set(val, true)
  })
  console.log(map)

  return (val) => map.get(val)
}
const str1 = 'html,body,base,head,link,meta,style,title,' +
'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
'embed,object,param,source,canvas,script,noscript,del,ins,' +
'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
'output,progress,select,textarea,' +
'details,dialog,menu,menuitem,summary,' +
'content,element,shadow,template,blockquote,iframe,tfoot'

const isTag = findStr(str1)

console.log(String(isTag))
console.time()
const a = isTag('div')
console.log(a)
console.timeEnd()
