"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","0ad155bca112a60d62684fb444e3a7f5"],["static/css/main.1bc43878.css","c656c374ea82b3d42b10d6b78c4704a8"],["static/js/0.00ca5bdc.chunk.js","6b7153e896f8769e4d1c8e05b8da621e"],["static/js/main.18c1a09d.js","b8c502da102cf61654be2eebfc5d3606"],["static/media/2017-05-10-1.89951949.jpg","89951949bf4fd7cf8fb062b1dc806e66"],["static/media/2017-05-10-1.a30ec0a6.jpg","a30ec0a6f89a2f748e05b6107b39cdd0"],["static/media/2017-05-10.9f697055.jpg","9f697055133cf565a00226ae48257fb3"],["static/media/2017-05-10.abf224a7.jpg","abf224a71c39a83af4290a2520cc7f32"],["static/media/IMG952134.12966d25.jpg","12966d255f389d1e3f13541afe8c9e21"],["static/media/IMG952164.5f17d69c.jpg","5f17d69cb126ce30e558fdaa46aaa990"],["static/media/IMG952164.d6bb3edb.jpg","d6bb3edb29d04a25adc26ac99de74951"],["static/media/IMG952188.618d6fdf.jpg","618d6fdf732597e5b58f20263a586714"],["static/media/IMG952188.83562596.jpg","835625969db52252822f8d15c3068e4e"],["static/media/IMG952403.27154093.jpg","27154093b1d5bbb98aea468b589712d9"],["static/media/IMG952406.5f45856f.jpg","5f45856fd98650e6cdeaafa14d927aad"],["static/media/IMG952406.6526ed4a.jpg","6526ed4a1e1f72440894cb49996aed74"],["static/media/IMG952407.213b6cf2.jpg","213b6cf2290d531a32ab354fc63b2fcb"],["static/media/IMG952407.8442b5e9.jpg","8442b5e91b87dd96de71067f4972ae8a"],["static/media/IMG952925.ef68e9fc.jpg","ef68e9fcc8280b3e157fdca39d891887"],["static/media/IMG952935.5fb4bc1c.jpg","5fb4bc1cae8d2359fe541882e2ee5b58"],["static/media/IMG952935.6875cc04.jpg","6875cc042fac1715eb101979d21b5451"],["static/media/IMG952943.0e637dce.jpg","0e637dcef93dbd7fbe458982d19d12a3"],["static/media/IMG952943.9a95583b.jpg","9a95583be9b2c7f0e9c4772d9e88cf03"],["static/media/IMG953435.ab03a6b6.jpg","ab03a6b6b08585cfa3f81aacc9c1682f"],["static/media/IMG953437.3478842d.jpg","3478842d67685149d36594e421c70013"],["static/media/IMG953437.6537710a.jpg","6537710a18a4eee54e52853a85459555"],["static/media/IMG953513.673ec64b.jpg","673ec64bebdc73cfcf5bd2c2f9c6dbdb"],["static/media/IMG953513.ddb895b4.jpg","ddb895b4fbcb24ac1bf7213baa295713"],["static/media/IMG953514.2da4f3e9.jpg","2da4f3e9a4f631620f98d9e38d4e6a2e"],["static/media/IMG953514.48e159aa.jpg","48e159aafe4e088e11be205e8ebf437f"],["static/media/IMG953531.2ad5f6c7.jpg","2ad5f6c755982152c8a2483b3f2c5555"],["static/media/IMG953531.c53becd5.jpg","c53becd5b1288ac7c02622adffbc114b"],["static/media/IMG953534.947635de.jpg","947635dedbbdefdd179a66cbbab5ea26"],["static/media/IMG953541.31d27b78.jpg","31d27b78e11f80911049138751891f79"],["static/media/IMG953546.95e54d9d.jpg","95e54d9d34b430f971540b8216af5967"],["static/media/IMG953551.b348299d.jpg","b348299dc65ecf515ec6d95c73c7ef5e"],["static/media/IMG953551.d1583e08.jpg","d1583e086cd251aeedb70fa085b433d8"],["static/media/IMG953559.a0cd7ef4.jpg","a0cd7ef4e12e36c3960953919361e634"],["static/media/IMG953559.b66c1091.jpg","b66c1091f4899cdfbc4a0b3034f0d4cc"],["static/media/IMG953560.60ebf630.jpg","60ebf6305e1e3e80d42d09b7bf793146"],["static/media/IMG953560.ec8b2f64.jpg","ec8b2f641858d0fe3ead6ea07baea37b"],["static/media/IMG953596.27c97d0e.jpg","27c97d0ed88cafeb7300a30e8ada5dd0"],["static/media/IMG953596.f3b6bc05.jpg","f3b6bc0595120453dba90f97f50e2d49"],["static/media/IMG953597.82ae0df8.jpg","82ae0df8784f00c9e3a0f3c64e5cbbc7"],["static/media/IMG953597.b5088261.jpg","b5088261a839ee27d48ee718d833880f"],["static/media/IMG953673.ca3d77a7.jpg","ca3d77a7bd7b3e69cdc072b939a6c90c"],["static/media/IMG953712.d1946565.jpg","d1946565fb6cd72802a09b3fa8168869"],["static/media/IMG953713.35a25cec.jpg","35a25cecfa2a6a37456553d417dac9fa"],["static/media/fontello.2025e2a4.woff","2025e2a4c2b80f9da97812baa80f5ef4"],["static/media/fontello.3b4a16cb.eot","3b4a16cb8fb0b5abc9f83db44bfe0993"],["static/media/fontello.3dcd88c3.ttf","3dcd88c3fd52fe5bb8e4bd38f98cafeb"],["static/media/fontello.4c4c52fb.woff2","4c4c52fb1134505a04a848a90f0bb055"],["static/media/fontello.68d1b557.svg","68d1b557cdb7d25fae56dfbbd19cb359"],["static/media/glyphicons-halflings-regular.448c34a5.woff2","448c34a56d699c29117adc64c43affeb"],["static/media/glyphicons-halflings-regular.89889688.svg","89889688147bd7575d6327160d64e760"],["static/media/glyphicons-halflings-regular.e18bbf61.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["static/media/glyphicons-halflings-regular.f4769f9b.eot","f4769f9bdb7466be65088239c12046d1"],["static/media/glyphicons-halflings-regular.fa277232.woff","fa2772327f55d8198301fdb8bcfc8158"],["static/media/large_blueberries_one_sitting_on_nickle.92410a9d.jpg","92410a9d3a731c2b06acf4597a9bd0d9"],["static/media/logo.4a19890f.png","4a19890f432aed764b6e32067df507d3"],["static/media/package_of_blueberries.5b356cd2.jpg","5b356cd2edf197b2a3fb0ad0a2f0660e"],["static/media/photo10_lg.bf9f70aa.jpg","bf9f70aae5e7fd5d9efd72ec06d30622"],["static/media/photo11_lg.d57205e5.jpg","d57205e591d2d745855e06c0e17a9171"],["static/media/photo11_lg.e2086031.jpg","e20860316994266384aa2a32dfcdbb6f"],["static/media/photo12_lg.7dcfcf2e.jpg","7dcfcf2e4ac13540820299c32fa1c0e0"],["static/media/photo12_lg.8eace424.jpg","8eace424f9e71714d59a92b8dad003f7"],["static/media/photo13_lg.19c86c00.jpg","19c86c000ec6b46b1b19008ff8f572c6"],["static/media/photo13_lg.30d3392d.jpg","30d3392d6cece48ae9e1588f06b59686"],["static/media/photo14_lg.054fef20.jpg","054fef20f764c8af184cc4fbe1009a2d"],["static/media/photo14_lg.3dcc9a06.jpg","3dcc9a069ac8f5f3097a67b021a1f113"],["static/media/photo15_lg.4d7ef3fe.jpg","4d7ef3fe069b5532a989ccc1929fbfcc"],["static/media/photo16_lg.bbb739ae.jpg","bbb739aea9f8daac8b7a2b9c5788dc79"],["static/media/photo16_lg.cd145fe2.jpg","cd145fe2a59b8bc447508205b574d310"],["static/media/photo17_lg.1665564c.jpg","1665564caa25a91f1d3e885842bab3e5"],["static/media/photo17_lg.aaf3436b.jpg","aaf3436bcf9dde0d7bb94efea4d68fa1"],["static/media/photo18_lg.1521e5e9.jpg","1521e5e9cd301326299fdd0f52f2b848"],["static/media/photo18_lg.90d98e65.jpg","90d98e6574c1443566663ce0ad428a6f"],["static/media/photo19_lg.d131accb.jpg","d131accbff4690b9908f17b258f12c40"],["static/media/photo1_lg.39d8c5e2.jpg","39d8c5e2c5a3c0ba4257fd71dea2341c"],["static/media/photo20_lg.37323ffd.jpg","37323ffd7bff0d7be6fcd66fb0059430"],["static/media/photo20_lg.7b9ce3b5.jpg","7b9ce3b5d516dbcdb18eb6ff6fb79afd"],["static/media/photo21_lg.b2385bc2.jpg","b2385bc248c26b5b9a468ecc507988b3"],["static/media/photo21_lg.f2168442.jpg","f2168442189e6ad602c3d025b887f1e0"],["static/media/photo22_lg.1df57c34.jpg","1df57c34ffb5f3f214e311fca06b2719"],["static/media/photo22_lg.bc982699.jpg","bc9826996ca99d88357fad8c85b657d2"],["static/media/photo23_lg.c1d54243.jpg","c1d542431c8b9c44ce4a24034f3e5da2"],["static/media/photo23_lg.c6943fad.jpg","c6943fad919d45fb40354c2d357a9688"],["static/media/photo2_lg.3ecb2e80.jpg","3ecb2e80e5edd43a1691625df4139626"],["static/media/photo2_lg.e107cc88.jpg","e107cc88e4daf45d2480b839a3185ae5"],["static/media/photo3_lg.ba0138b7.jpg","ba0138b76347ea2b78be9619b4f73599"],["static/media/photo3_lg.c6ccbde2.jpg","c6ccbde2b2f72999d891e565a1b66529"],["static/media/photo4_lg.5b2cdfd2.jpg","5b2cdfd285a3f0c77383296bfd478a50"],["static/media/photo4_lg.95e202a8.jpg","95e202a841bbe96eac8138412be2d377"],["static/media/photo8_lg.28855bb5.jpg","28855bb5d424e973d0d4b54cd903e977"],["static/media/photo9_lg.5a2c1715.jpg","5a2c17156706551b6a1ee4326b6bd7f6"],["static/media/rows_of_blueberries.3c9df54b.jpg","3c9df54b69997f9eae9c1cf560a69b1e"],["static/media/truck.d5c89422.jpg","d5c89422533d35c0b9bd711e72aa550c"],["static/media/two_buckets_of_blueberries.c6487316.jpg","c6487316421b66c94d49c0032770e318"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var d=new URL(e);return t&&d.pathname.match(t)||(d.search+=(d.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),d.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),d=createCacheKey(t,hashParamName,c,/\.\w{8}\./);return[t.toString(),d]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);a=urlsToCacheKeys.has(c);a||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(c=new URL("/kkblueberries/index.html",self.location).toString(),a=urlsToCacheKeys.has(c)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});