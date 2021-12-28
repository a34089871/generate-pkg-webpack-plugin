"use strict";var e=require("fs"),t=require("path"),n=require("child_process");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=o(e),i=o(t),r=o(n);const c=(e=new Date)=>e?e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds()):"",a=r.default.execSync("git show -s --format=%H").toString().trim(),u=r.default.execSync("git show -s --format=%cn").toString().trim(),g=r.default.execSync("git show -s --format=%ce").toString().trim(),l=c(new Date(r.default.execSync("git show -s --format=%cd").toString())),f=c(),m={commit:a,commitUserName:u,commitUserMail:g,commitDate:l},p=process.cwd();module.exports=class{options;constructor(e={filename:"package"}){this.options=e}apply(e){const{webpack:t}=e,n=this.handlePkgJson();n&&e.hooks.compilation.tap("GeneratePkgJsonPlugin",(e=>{const o=`${this.options.filename}.json`;if(!this.options.filename)throw new Error("[generate-pkg-webpack-plugin] filename不能为空字符串");if(t){const{RawSource:s}=t.sources;e.emitAsset(o,new s(n))}else e.assets[o]={source:function(){return n},size:function(){return 19}}}))}handlePkgJson(){const e=i.default.join(p,"package.json");try{const t=s.default.readFileSync(e,"utf-8"),n=JSON.parse(t);return n.buildTime=f,n.commitInfo=JSON.stringify(m),JSON.stringify(n,null,2)}catch(e){throw new Error("[generate-pkg-webpack-plugin] 无法获取根目录下package.json")}}};
