"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[649],{20649:(t,e,n)=>{n.r(e),n.d(e,{BLOCK_SIZE:()=>S,BroadcastChannelWrapper:()=>R,Contents:()=>m,ContentsAPI:()=>k,DIR_MODE:()=>u,DRIVE_API_PATH:()=>E,DRIVE_SEPARATOR:()=>y,DriveContentsProcessor:()=>D,DriveFS:()=>N,DriveFSEmscriptenNodeOps:()=>I,DriveFSEmscriptenStreamOps:()=>O,FILE:()=>c,FILE_MODE:()=>p,IBroadcastChannelWrapper:()=>l,IContents:()=>o,MIME:()=>h,SEEK_CUR:()=>g,SEEK_END:()=>w,ServiceWorkerContentsAPI:()=>b,instanceOfStream:()=>_});var a=n(64145),s=n(9879),r=n.n(s),i=n(21961);const o=new i.Token("@jupyterlite/contents:IContents");var h,c;!function(t){t.JSON="application/json",t.PLAIN_TEXT="text/plain",t.OCTET_STREAM="octet/stream"}(h||(h={})),function(t){const e=JSON.parse(a.PageConfig.getOption("fileTypes")||"{}");t.getType=function(t,n=null){t=t.toLowerCase();for(const n of Object.values(e))for(const e of n.extensions||[])if(e===t&&n.mimeTypes&&n.mimeTypes.length)return n.mimeTypes[0];return r().getType(t)||n||h.OCTET_STREAM},t.hasFormat=function(t,n){t=t.toLowerCase();for(const a of Object.values(e))if(a.fileFormat===n)for(const e of a.extensions||[])if(e===t)return!0;return!1}}(c||(c={}));const l=new i.Token("@jupyterlite/contents:IBroadcastChannelWrapper"),d="JupyterLite Storage";class m{constructor(t){this.reduceBytesToString=(t,e)=>t+String.fromCharCode(e),this._serverContents=new Map,this._storageName=d,this._storageDrivers=null,this._localforage=t.localforage,this._storageName=t.storageName||d,this._storageDrivers=t.storageDrivers||null,this._ready=new i.PromiseDelegate}async initialize(){await this.initStorage(),this._ready.resolve(void 0)}async initStorage(){this._storage=this.createDefaultStorage(),this._counters=this.createDefaultCounters(),this._checkpoints=this.createDefaultCheckpoints()}get ready(){return this._ready.promise}get storage(){return this.ready.then((()=>this._storage))}get counters(){return this.ready.then((()=>this._counters))}get checkpoints(){return this.ready.then((()=>this._checkpoints))}get defaultStorageOptions(){const t=this._storageDrivers&&this._storageDrivers.length?this._storageDrivers:null;return{version:1,name:this._storageName,...t?{driver:t}:{}}}createDefaultStorage(){return this._localforage.createInstance({description:"Offline Storage for Notebooks and Files",storeName:"files",...this.defaultStorageOptions})}createDefaultCounters(){return this._localforage.createInstance({description:"Store the current file suffix counters",storeName:"counters",...this.defaultStorageOptions})}createDefaultCheckpoints(){return this._localforage.createInstance({description:"Offline Storage for Checkpoints",storeName:"checkpoints",...this.defaultStorageOptions})}async newUntitled(t){var e,n,s;const r=null!==(e=null==t?void 0:t.path)&&void 0!==e?e:"",i=null!==(n=null==t?void 0:t.type)&&void 0!==n?n:"notebook",o=(new Date).toISOString();let l=a.PathExt.dirname(r);const d=a.PathExt.basename(r),m=a.PathExt.extname(r),u=await this.get(l);let p,g="";switch(r&&!m&&u?(l=`${r}/`,g=""):l&&d?(l=`${l}/`,g=d):(l="",g=r),i){case"directory":g=`Untitled Folder${await this._incrementCounter("directory")||""}`,p={name:g,path:`${l}${g}`,last_modified:o,created:o,format:"json",mimetype:"",content:null,size:0,writable:!0,type:"directory"};break;case"notebook":{const t=await this._incrementCounter("notebook");g=g||`Untitled${t||""}.ipynb`,p={name:g,path:`${l}${g}`,last_modified:o,created:o,format:"json",mimetype:h.JSON,content:f.EMPTY_NB,size:JSON.stringify(f.EMPTY_NB).length,writable:!0,type:"notebook"};break}default:{const e=null!==(s=null==t?void 0:t.ext)&&void 0!==s?s:".txt",n=await this._incrementCounter("file"),a=c.getType(e)||h.OCTET_STREAM;let r;r=c.hasFormat(e,"text")||-1!==a.indexOf("text")?"text":-1!==e.indexOf("json")||-1!==e.indexOf("ipynb")?"json":"base64",g=g||`untitled${n||""}${e}`,p={name:g,path:`${l}${g}`,last_modified:o,created:o,format:r,mimetype:a,content:"",size:0,writable:!0,type:"file"};break}}const w=p.path;return await(await this.storage).setItem(w,p),p}async copy(t,e){let n=a.PathExt.basename(t);for(e=""===e?"":`${e.slice(1)}/`;await this.get(`${e}${n}`,{content:!0});){const t=a.PathExt.extname(n),e=n.replace(t,"");n=`${e} (copy)${t}`}const s=`${e}${n}`;let r=await this.get(t,{content:!0});if(!r)throw Error(`Could not find file with path ${t}`);return r={...r,name:n,path:s},await(await this.storage).setItem(s,r),r}async get(t,e){if(""===(t=decodeURIComponent(t.replace(/^\//,""))))return await this._getFolder(t);const n=await this.storage,s=await n.getItem(t),r=await this._getServerContents(t,e),i=s||r;if(!i)return null;if(!(null==e?void 0:e.content))return{size:0,...i,content:null};if("directory"===i.type){const e=new Map;await n.iterate(((n,a)=>{a===`${t}/${n.name}`&&e.set(n.name,n)}));const s=r?r.content:Array.from((await this._getServerDirectory(t)).values());for(const t of s)e.has(t.name)||e.set(t.name,t);const o=[...e.values()];return{name:a.PathExt.basename(t),path:t,last_modified:i.last_modified,created:i.created,format:"json",mimetype:h.JSON,content:o,size:0,writable:!0,type:"directory"}}return i}async rename(t,e){const n=decodeURIComponent(t),s=await this.get(n,{content:!0});if(!s)throw Error(`Could not find file with path ${n}`);const r=(new Date).toISOString(),i=a.PathExt.basename(e),o={...s,name:i,path:e,last_modified:r},h=await this.storage;if(await h.setItem(e,o),await h.removeItem(n),await(await this.checkpoints).removeItem(n),"directory"===s.type){let n;for(n of s.content)await this.rename(a.URLExt.join(t,n.name),a.URLExt.join(e,n.name))}return o}async save(t,e={}){var n;t=decodeURIComponent(t);const s=a.PathExt.extname(null!==(n=e.name)&&void 0!==n?n:""),r=e.chunk,i=!!r&&(r>1||-1===r);let o=await this.get(t,{content:i});if(o||(o=await this.newUntitled({path:t,ext:s,type:"file"})),!o)return null;const h=o.content,l=(new Date).toISOString();if(o={...o,...e,last_modified:l},e.content&&"base64"===e.format){const t=!r||-1===r;if(".ipynb"===s){const n=this._handleChunk(e.content,h,i);o={...o,content:t?JSON.parse(n):n,format:"json",type:"notebook",size:n.length}}else if(c.hasFormat(s,"json")){const n=this._handleChunk(e.content,h,i);o={...o,content:t?JSON.parse(n):n,format:"json",type:"file",size:n.length}}else if(c.hasFormat(s,"text")){const t=this._handleChunk(e.content,h,i);o={...o,content:t,format:"text",type:"file",size:t.length}}else{let n=this._handleBinaryChunk(e.content,h,i);t&&(n=btoa(n)),o={...o,content:n,size:n.length}}}return await(await this.storage).setItem(t,o),o}async delete(t){const e=`${t=decodeURIComponent(t)}/`,n=(await(await this.storage).keys()).filter((n=>n===t||n.startsWith(e)));await Promise.all(n.map(this.forgetPath,this))}async forgetPath(t){await Promise.all([(await this.storage).removeItem(t),(await this.checkpoints).removeItem(t)])}async createCheckpoint(t){var e;const n=await this.checkpoints;t=decodeURIComponent(t);const a=await this.get(t,{content:!0});if(!a)throw Error(`Could not find file with path ${t}`);const s=(null!==(e=await n.getItem(t))&&void 0!==e?e:[]).filter(Boolean);return s.push(a),s.length>5&&s.splice(0,s.length-5),await n.setItem(t,s),{id:""+(s.length-1),last_modified:a.last_modified}}async listCheckpoints(t){return(await(await this.checkpoints).getItem(t)||[]).filter(Boolean).map(this.normalizeCheckpoint,this)}normalizeCheckpoint(t,e){return{id:e.toString(),last_modified:t.last_modified}}async restoreCheckpoint(t,e){t=decodeURIComponent(t);const n=(await(await this.checkpoints).getItem(t)||[])[parseInt(e)];await(await this.storage).setItem(t,n)}async deleteCheckpoint(t,e){t=decodeURIComponent(t);const n=await(await this.checkpoints).getItem(t)||[],a=parseInt(e);n.splice(a,1),await(await this.checkpoints).setItem(t,n)}_handleChunk(t,e,n){const a=decodeURIComponent(escape(atob(t)));return n?e+a:a}_handleBinaryChunk(t,e,n){const a=atob(t).replace(/=+$/,"");return n?e+a:a}async _getFolder(t){const e=new Map,n=await this.storage;await n.iterate(((t,n)=>{n.includes("/")||e.set(t.path,t)}));for(const n of(await this._getServerDirectory(t)).values())e.has(n.path)||e.set(n.path,n);return t&&0===e.size?null:{name:"",path:t,last_modified:new Date(0).toISOString(),created:new Date(0).toISOString(),format:"json",mimetype:h.JSON,content:Array.from(e.values()),size:0,writable:!0,type:"directory"}}async _getServerContents(t,e){const n=a.PathExt.basename(t);let s=(await this._getServerDirectory(a.URLExt.join(t,".."))).get(n);if(!s)return null;if(s=s||{name:n,path:t,last_modified:new Date(0).toISOString(),created:new Date(0).toISOString(),format:"text",mimetype:h.PLAIN_TEXT,type:"file",writable:!0,size:0,content:""},null==e?void 0:e.content)if("directory"===s.type){const e=await this._getServerDirectory(t);s={...s,content:Array.from(e.values())}}else{const e=a.URLExt.join(a.PageConfig.getBaseUrl(),"files",t),r=await fetch(e);if(!r.ok)return null;const i=s.mimetype||r.headers.get("Content-Type"),o=a.PathExt.extname(n);if("notebook"===s.type||c.hasFormat(o,"json")||-1!==(null==i?void 0:i.indexOf("json"))||t.match(/\.(ipynb|[^/]*json[^/]*)$/)){const t=await r.text();s={...s,content:JSON.parse(t),format:"json",mimetype:s.mimetype||h.JSON,size:t.length}}else if(c.hasFormat(o,"text")||-1!==i.indexOf("text")){const t=await r.text();s={...s,content:t,format:"text",mimetype:i||h.PLAIN_TEXT,size:t.length}}else{const t=await r.arrayBuffer(),e=new Uint8Array(t);s={...s,content:btoa(e.reduce(this.reduceBytesToString,"")),format:"base64",mimetype:i||h.OCTET_STREAM,size:e.length}}}return s}async _getServerDirectory(t){const e=this._serverContents.get(t)||new Map;if(!this._serverContents.has(t)){const n=a.URLExt.join(a.PageConfig.getBaseUrl(),"api/contents",t,"all.json");try{const t=await fetch(n),a=JSON.parse(await t.text());for(const t of a.content)e.set(t.name,t)}catch(t){console.warn(`don't worry, about ${t}... nothing's broken. If there had been a\n          file at ${n}, you might see some more files.`)}this._serverContents.set(t,e)}return e}async _incrementCounter(t){var e;const n=await this.counters,a=(null!==(e=await n.getItem(t))&&void 0!==e?e:-1)+1;return await n.setItem(t,a),a}}var f;!function(t){t.EMPTY_NB={metadata:{orig_nbformat:4},nbformat_minor:4,nbformat:4,cells:[]}}(f||(f={}));const u=16895,p=33206,g=1,w=2;function _(t){return"node"in t}const y=":",E="/api/drive.v1",S=4096,P=new TextEncoder,v=new TextDecoder("utf-8"),C={0:!1,1:!0,2:!0,64:!0,65:!0,66:!0,129:!0,193:!0,514:!0,577:!0,578:!0,705:!0,706:!0,1024:!0,1025:!0,1026:!0,1089:!0,1090:!0,1153:!0,1154:!0,1217:!0,1218:!0,4096:!0,4098:!0};class O{constructor(t){this.fs=t}open(t){const e=this.fs.realPath(t.node);this.fs.FS.isFile(t.node.mode)&&(t.file=this.fs.API.get(e))}close(t){if(!this.fs.FS.isFile(t.node.mode)||!t.file)return;const e=this.fs.realPath(t.node),n=t.flags;let a="string"==typeof n?parseInt(n,10):n;a&=8191;let s=!0;a in C&&(s=C[a]),s&&this.fs.API.put(e,t.file),t.file=void 0}read(t,e,n,a,s){if(a<=0||void 0===t.file||s>=(t.file.data.length||0))return 0;const r=Math.min(t.file.data.length-s,a);return e.set(t.file.data.subarray(s,s+r),n),r}write(t,e,n,a,s){var r;if(a<=0||void 0===t.file)return 0;if(t.node.timestamp=Date.now(),s+a>((null===(r=t.file)||void 0===r?void 0:r.data.length)||0)){const e=t.file.data?t.file.data:new Uint8Array;t.file.data=new Uint8Array(s+a),t.file.data.set(e)}return t.file.data.set(e.subarray(n,n+a),s),a}llseek(t,e,n){let a=e;if(n===g)a+=t.position;else if(n===w&&this.fs.FS.isFile(t.node.mode)){if(void 0===t.file)throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM);a+=t.file.data.length}if(a<0)throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EINVAL);return a}}class I{constructor(t){this.fs=t}node(t){return _(t)?t.node:t}getattr(t){const e=this.node(t);return{...this.fs.API.getattr(this.fs.realPath(e)),mode:e.mode,ino:e.id}}setattr(t,e){const n=this.node(t);for(const[t,a]of Object.entries(e))switch(t){case"mode":n.mode=a;break;case"timestamp":n.timestamp=a;break;default:console.warn("setattr",t,"of",a,"on",n,"not yet implemented")}}lookup(t,e){const n=this.node(t),a=this.fs.PATH.join2(this.fs.realPath(n),e),s=this.fs.API.lookup(a);if(!s.ok)throw this.fs.FS.genericErrors[this.fs.ERRNO_CODES.ENOENT];return this.fs.createNode(n,e,s.mode,0)}mknod(t,e,n,a){const s=this.node(t),r=this.fs.PATH.join2(this.fs.realPath(s),e);return this.fs.API.mknod(r,n),this.fs.createNode(s,e,n,a)}rename(t,e,n){const a=this.node(t),s=this.node(e);this.fs.API.rename(a.parent?this.fs.PATH.join2(this.fs.realPath(a.parent),a.name):a.name,this.fs.PATH.join2(this.fs.realPath(s),n)),a.name=n,a.parent=s}unlink(t,e){this.fs.API.rmdir(this.fs.PATH.join2(this.fs.realPath(this.node(t)),e))}rmdir(t,e){this.fs.API.rmdir(this.fs.PATH.join2(this.fs.realPath(this.node(t)),e))}readdir(t){return this.fs.API.readdir(this.fs.realPath(this.node(t)))}symlink(t,e,n){throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM)}readlink(t){throw new this.fs.FS.ErrnoError(this.fs.ERRNO_CODES.EPERM)}}class k{constructor(t,e,n,a){this._driveName=t,this._mountpoint=e,this.FS=n,this.ERRNO_CODES=a}lookup(t){return this.request({method:"lookup",path:this.normalizePath(t)})}getmode(t){return this.request({method:"getmode",path:this.normalizePath(t)})}mknod(t,e){return this.request({method:"mknod",path:this.normalizePath(t),data:{mode:e}})}rename(t,e){return this.request({method:"rename",path:this.normalizePath(t),data:{newPath:this.normalizePath(e)}})}readdir(t){const e=this.request({method:"readdir",path:this.normalizePath(t)});return e.push("."),e.push(".."),e}rmdir(t){return this.request({method:"rmdir",path:this.normalizePath(t)})}get(t){const e=this.request({method:"get",path:this.normalizePath(t)});if(!e)throw new this.FS.ErrnoError(this.ERRNO_CODES.ENOENT);const n=e.content,a=e.format;switch(a){case"json":case"text":return{data:P.encode(n),format:a};case"base64":{const t=atob(n),e=t.length,s=new Uint8Array(e);for(let n=0;n<e;n++)s[n]=t.charCodeAt(n);return{data:s,format:a}}default:throw new this.FS.ErrnoError(this.ERRNO_CODES.ENOENT)}}put(t,e){switch(e.format){case"json":case"text":return this.request({method:"put",path:this.normalizePath(t),data:{format:e.format,data:v.decode(e.data)}});case"base64":{let n="";for(let t=0;t<e.data.byteLength;t++)n+=String.fromCharCode(e.data[t]);return this.request({method:"put",path:this.normalizePath(t),data:{format:e.format,data:btoa(n)}})}}}getattr(t){const e=this.request({method:"getattr",path:this.normalizePath(t)});return e.atime&&(e.atime=new Date(e.atime)),e.mtime&&(e.mtime=new Date(e.mtime)),e.ctime&&(e.ctime=new Date(e.ctime)),e.size=e.size||0,e}normalizePath(t){return t.startsWith(this._mountpoint)&&(t=t.slice(this._mountpoint.length)),this._driveName&&(t=`${this._driveName}${y}${t}`),t}}class b extends k{constructor(t,e,n,a,s){super(e,n,a,s),this._baseUrl=t}request(t){const e=new XMLHttpRequest;e.open("POST",encodeURI(this.endpoint),!1);try{e.send(JSON.stringify(t))}catch(t){console.error(t)}if(e.status>=400)throw new this.FS.ErrnoError(this.ERRNO_CODES.EINVAL);return JSON.parse(e.responseText)}get endpoint(){return`${this._baseUrl}api/drive`}}class N{constructor(t){this.FS=t.FS,this.PATH=t.PATH,this.ERRNO_CODES=t.ERRNO_CODES,this.API=this.createAPI(t),this.driveName=t.driveName,this.node_ops=new I(this),this.stream_ops=new O(this)}createAPI(t){return new b(t.baseUrl,t.driveName,t.mountpoint,t.FS,t.ERRNO_CODES)}mount(t){return this.createNode(null,t.mountpoint,511|u,0)}createNode(t,e,n,a){const s=this.FS;if(!s.isDir(n)&&!s.isFile(n))throw new s.ErrnoError(this.ERRNO_CODES.EINVAL);const r=s.createNode(t,e,n,a);return r.node_ops=this.node_ops,r.stream_ops=this.stream_ops,r}getMode(t){return this.API.getmode(t)}realPath(t){const e=[];let n=t;for(e.push(n.name);n.parent!==n;)n=n.parent,e.push(n.name);return e.reverse(),this.PATH.join.apply(null,e)}}class D{constructor(t){this.contentsManager=t.contentsManager}async processDriveRequest(t){switch(t.method){case"readdir":return this.readdir(t);case"rmdir":return this.rmdir(t);case"rename":return this.rename(t);case"getmode":return this.getmode(t);case"lookup":return this.lookup(t);case"mknod":return this.mknod(t);case"getattr":return this.getattr(t);case"get":return this.get(t);case"put":return this.put(t)}throw`Drive request ${t.method} does not exist.`}async readdir(t){const e=await this.contentsManager.get(t.path,{content:!0});let n=[];return"directory"===e.type&&e.content&&(n=e.content.map((t=>t.name))),n}async rmdir(t){return await this.contentsManager.delete(t.path),null}async rename(t){return await this.contentsManager.rename(t.path,t.data.newPath),null}async getmode(t){let e;return e="directory"===(await this.contentsManager.get(t.path)).type?u:p,e}async lookup(t){let e;try{e={ok:!0,mode:"directory"===(await this.contentsManager.get(t.path)).type?u:p}}catch(t){e={ok:!1}}return e}async mknod(t){const e=await this.contentsManager.newUntitled({path:a.PathExt.dirname(t.path),type:t.data.mode===u?"directory":"file",ext:a.PathExt.extname(t.path)});return await this.contentsManager.rename(e.path,t.path),null}async getattr(t){const e=await this.contentsManager.get(t.path),n=new Date(0).toISOString();return{dev:1,nlink:1,uid:0,gid:0,rdev:0,size:e.size||0,blksize:S,blocks:Math.ceil(e.size||0/S),atime:e.last_modified||n,mtime:e.last_modified||n,ctime:e.created||n,timestamp:0}}async get(t){const e=await this.contentsManager.get(t.path,{content:!0});let n;return"directory"!==e.type&&(n={content:"json"===e.format?JSON.stringify(e.content):e.content,format:e.format}),n}async put(t){return await this.contentsManager.save(t.path,{content:"json"===t.data.format?JSON.parse(t.data.data):t.data.data,type:"file",format:t.data.format}),null}}class R{constructor(t){this.isDisposed=!1,this._onMessage=async t=>{if(!this._channel)return;const e=t.data;if("broadcast.ts"!==(null==e?void 0:e.receiver))return;const n=await this._driveContentsProcessor.processDriveRequest(e);this._channel.postMessage(n)},this._channel=null,this._enabled=!1,this._contents=t.contents,this._driveContentsProcessor=new D({contentsManager:this._contents})}get enabled(){return this._enabled}enable(){this._channel?console.warn("BroadcastChannel already created and enabled"):(this._channel=new BroadcastChannel(E),this._channel.addEventListener("message",this._onMessage),this._enabled=!0)}disable(){this._channel&&(this._channel.removeEventListener("message",this._onMessage),this._channel=null),this._enabled=!1}dispose(){this.isDisposed||(this.disable(),this.isDisposed=!0)}}}}]);
//# sourceMappingURL=649.1a6056f.js.map