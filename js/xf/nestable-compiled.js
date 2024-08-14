/*
 * XenForo jquery.nestable.min.js
 * Copyright 2010-2021 XenForo Ltd.
 * Released under the XenForo License Agreement: https://xenforo.com/license-agreement
 */
/*
 Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 Dual-licensed under the BSD or MIT licenses
*/
'use strict';(function(g,l,k,q){function r(a,c){this.w=g(k);this.el=g(a);this.options=g.extend({},w,c);this.isRtl=(a=this.el.closest("[dir]").attr("dir"))&&"RTL"==a.toUpperCase();this.init()}var x="ontouchstart"in l,t=function(){var a=k.createElement("div"),c=k.documentElement;if(!("pointerEvents"in a.style))return!1;a.style.pointerEvents="auto";a.style.pointerEvents="x";c.appendChild(a);var b=l.getComputedStyle&&"auto"===l.getComputedStyle(a,"").pointerEvents;c.removeChild(a);return!!b}(),w={listNodeName:"ol",
itemNodeName:"li",parentID:0,rootClass:"dd",listClass:"dd-list",itemClass:"dd-item",dragClass:"dd-dragel",handleClass:"dd-handle",collapsedClass:"dd-collapsed",placeClass:"dd-placeholder",noDragClass:"dd-nodrag",emptyClass:"dd-empty",expandBtnHTML:'<button data-action="expand" type="button">Expand</button>',collapseBtnHTML:'<button data-action="collapse" type="button">Collapse</button>',group:0,maxDepth:5,threshold:20};r.prototype={init:function(){var a=this;a.reset();a.el.data("nestable-group",this.options.group);
a.placeEl=g('<div class="'+a.options.placeClass+'"/>');var c=this.el.find(a.options.itemNodeName);g.each(c,function(d,f){a.setParent(g(f))});c.length||this.appendEmptyElement(this.el);a.el.on("click","button",function(d){if(!a.dragEl){var f=g(d.currentTarget);d=f.data("action");f=f.parent(a.options.itemNodeName);"collapse"===d&&a.collapseItem(f);"expand"===d&&a.expandItem(f)}});c=function(d){if("touchstart"==d.type||1==d.which){var f="mousedown"!=d.type,h=g(d.target);if(!h.hasClass(a.options.handleClass)){if(h.closest("."+
a.options.noDragClass).length)return;h=h.closest("."+a.options.handleClass)}!h.length||a.dragEl||!f&&0!==d.button||f&&1!==d.touches.length||(d.preventDefault(),a.dragStart(f?d.touches[0]:d))}};var b=function(d){var f="mousemove"!=d.type;a.dragEl&&(d.preventDefault(),a.dragMove(f?d.touches[0]:d))},e=function(d){var f="mouseup"!=d.type;a.dragEl&&(d.preventDefault(),a.dragStop(f?d.touches[0]:d))};x&&(a.el[0].addEventListener("touchstart",c,!1),l.addEventListener("touchmove",b,!1),l.addEventListener("touchend",
e,!1),l.addEventListener("touchcancel",e,!1));a.el.on("mousedown",c);a.w.on("mousemove",b);a.w.on("mouseup",e)},serialize:function(){var a=this;var c=function(b,e){var d=[];b.children(a.options.itemNodeName).each(function(){var f=g(this),h=g.extend({},f.data());f=f.children(a.options.listNodeName);f.length&&(h.children=c(f,e+1));d.push(h)});return d};return c(a.el.find(a.options.listNodeName).first(),0)},serialise:function(){return this.serialize()},asNestedSet:function(){function a(d,f,h){var m=
h+1;var n=c.listNodeName;var u=c.itemNodeName,p=g(d);d=p.children(n).children(u);0<d.length&&(f++,d.each(function(){m=a(g(this),f,m)}),f--);d=p.attr("data-id");n=p.parent(n).parent(u).attr("data-id")||c.parentID;d&&b.push({id:d,parent_id:n,depth:f,lft:h,rgt:m});return m+1}var c=this.options,b=[],e=1;this.el.find(c.listNodeName).first().children(c.itemNodeName).each(function(){e=a(this,0,e)});return b=b.sort(function(d,f){return d.lft-f.lft})},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,
startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0};this.moving=this.isTouch=!1;this.dragRootEl=this.dragEl=null;this.dragDepth=0;this.hasNewRoot=!1;this.pointEl=null},expandItem:function(a){a.removeClass(this.options.collapsedClass);a.children('[data-action="expand"]').hide();a.children('[data-action="collapse"]').show();a.children(this.options.listNodeName).show()},collapseItem:function(a){a.children(this.options.listNodeName).length&&
(a.addClass(this.options.collapsedClass),a.children('[data-action="collapse"]').hide(),a.children('[data-action="expand"]').show(),a.children(this.options.listNodeName).hide())},expandAll:function(){var a=this;a.el.find(a.options.itemNodeName).each(function(){a.expandItem(g(this))})},collapseAll:function(){var a=this;a.el.find(a.options.itemNodeName).each(function(){a.collapseItem(g(this))})},setParent:function(a){a.children(this.options.listNodeName).length&&(a.prepend(g(this.options.expandBtnHTML)),
a.prepend(g(this.options.collapseBtnHTML)));a.children('[data-action="expand"]').hide()},unsetParent:function(a){a.removeClass(this.options.collapsedClass);a.children("[data-action]").remove();a.children(this.options.listNodeName).remove()},dragStart:function(a){var c=this.mouse,b=g(a.target),e=b.closest(this.options.itemNodeName);this.placeEl.css("height",e.height());c.offsetX=a.offsetX!==q?a.offsetX:a.pageX-b.offset().left;c.offsetY=a.offsetY!==q?a.offsetY:a.pageY-b.offset().top;c.startX=c.lastX=
a.pageX;c.startY=c.lastY=a.pageY;this.dragRootEl=this.el;this.dragEl=g(k.createElement(this.options.listNodeName)).addClass(this.options.listClass+" "+this.options.dragClass);b=e.width();this.dragEl.css("width",b);this.dragEl.data("drag-width",b);e.after(this.placeEl);e[0].parentNode.removeChild(e[0]);e.appendTo(this.dragEl);g(k.body).append(this.dragEl);a={left:a.pageX-c.offsetX,top:a.pageY-c.offsetY};this.isRtl&&(a.left-=this.dragEl.data("drag-width"));this.dragEl.css(a);e=this.dragEl.find(this.options.itemNodeName);
for(a=0;a<e.length;a++)c=g(e[a]).parents(this.options.listNodeName).length,c>this.dragDepth&&(this.dragDepth=c)},dragStop:function(a){a=this.dragEl.children(this.options.itemNodeName).first();a[0].parentNode.removeChild(a[0]);this.placeEl.replaceWith(a);this.dragEl.remove();this.el.trigger("change");this.hasNewRoot&&this.dragRootEl.trigger("change");this.reset()},dragMove:function(a){var c=this.options,b=this.mouse;var e={left:a.pageX-b.offsetX,top:a.pageY-b.offsetY};this.isRtl&&(e.left-=this.dragEl.data("drag-width"));
this.dragEl.css(e);b.lastX=b.nowX;b.lastY=b.nowY;b.nowX=a.pageX;b.nowY=a.pageY;b.distX=b.nowX-b.lastX;b.distY=b.nowY-b.lastY;b.lastDirX=b.dirX;b.lastDirY=b.dirY;b.dirX=0===b.distX?0:0<b.distX?1:-1;b.dirY=0===b.distY?0:0<b.distY?1:-1;e=Math.abs(b.distX)>Math.abs(b.distY)?1:0;if(b.moving){b.dirAx!==e?(b.distAxX=0,b.distAxY=0):(b.distAxX+=Math.abs(b.distX),0!==b.dirX&&b.dirX!==b.lastDirX&&(b.distAxX=0),b.distAxY+=Math.abs(b.distY),0!==b.dirY&&b.dirY!==b.lastDirY&&(b.distAxY=0));b.dirAx=e;if(b.dirAx&&
b.distAxX>=c.threshold){b.distAxX=0;e=this.placeEl.prev(c.itemNodeName);if((this.isRtl?0>b.distX:0<b.distX)&&e.length&&!e.hasClass(c.collapsedClass)){var d=e.find(c.listNodeName).last();var f=this.placeEl.parents(c.listNodeName).length;f+this.dragDepth<=c.maxDepth&&(d.length?(d=e.children(c.listNodeName).last(),d.append(this.placeEl)):(d=g("<"+c.listNodeName+"/>").addClass(c.listClass),d.append(this.placeEl),e.append(d),this.setParent(e)))}if(this.isRtl?0<b.distX:0>b.distX)e=this.placeEl.next(c.itemNodeName),
e.length||(f=this.placeEl.parent(),this.placeEl.closest(c.itemNodeName).after(this.placeEl),f.children().length||this.unsetParent(f.parent()))}d=!1;t||(this.dragEl[0].style.visibility="hidden");this.pointEl=g(k.elementFromPoint(a.pageX-k.body.scrollLeft,a.pageY-(l.pageYOffset||k.documentElement.scrollTop)));t||(this.dragEl[0].style.visibility="visible");this.pointEl.hasClass(c.handleClass)&&(this.pointEl=this.pointEl.closest(c.itemNodeName));if(this.pointEl.hasClass(c.emptyClass))d=!0;else if(!this.pointEl.length||
!this.pointEl.hasClass(c.itemClass))return;e=this.pointEl.closest("."+c.rootClass);var h=this.dragRootEl.data("nestable-id")!==e.data("nestable-id");b.dirAx&&!h&&!d||h&&c.group!==e.data("nestable-group")||(f=this.dragDepth-1+this.pointEl.parents(c.listNodeName).length,f>c.maxDepth||(a=a.pageY<this.pointEl.offset().top+this.pointEl.height()/2,f=this.placeEl.parent(),d?(d=g(k.createElement(c.listNodeName)).addClass(c.listClass),d.append(this.placeEl),this.pointEl.replaceWith(d)):a?this.pointEl.before(this.placeEl):
this.pointEl.after(this.placeEl),f.children().length||this.unsetParent(f.parent()),this.dragRootEl.find(c.itemNodeName).length||this.dragRootEl.find("."+c.emptyClass).length||this.appendEmptyElement(this.dragRootEl),this.dragRootEl=e,h&&(this.hasNewRoot=this.el[0]!==this.dragRootEl[0])))}else b.dirAx=e,b.moving=!0},appendEmptyElement:function(a){a.append('<div class="'+this.options.emptyClass+'"/>')}};var v=0;g.fn.nestable=function(a){var c=this;this.each(function(b){(b=g(this).data("nestable"))?
"string"===typeof a&&"function"===typeof b[a]&&(c=b[a]()):(g(this).data("nestable",new r(this,a)),g(this).data("nestable-id","nestable-uniqueId"+v),v++)});return c||this}})(window.jQuery||window.Zepto,window,document);

'use strict';!function(c,e,f,g){XF.Nestable=XF.Element.newHandler({options:{rootClass:"nestable-container",listClass:"nestable-list",itemClass:"nestable-item",handleClass:"nestable-handle",dragClass:"nestable-dragel",collapsedClass:"nestable-collapsed",placeClass:"nestable-placeholder",noDragClass:"nestable-nodrag",emptyClass:"nestable-empty",classSuffix:"",maxDepth:1E4,groupId:null,parentId:null,valueInput:'| input[type="hidden"]',valueFunction:"asNestedSet"},$valueInput:null,init:function(){if(this.options.classSuffix){var a=
this;c.each(this.options,function(b,d){0<=b.indexOf("Class")&&(a.options[b]=d+a.options.classSuffix)})}this.$valueInput=XF.findRelativeIf(this.options.valueInput,this.$target);if(!this.$valueInput.length)return console.error("No value input found matching selector %s",this.options.valueInput),!1;if(1<this.$valueInput.length)return console.error("Value input (%s) matched too many inputs",this.options.valueInput),!1;null===this.options.groupId&&(this.options.groupId=0);null===this.options.parentId&&
(this.options.parentId=0);this.$target.nestable({rootClass:this.options.rootClass,listClass:this.options.listClass,itemClass:this.options.itemClass,handleClass:this.options.handleClass,dragClass:this.options.dragClass,collapsedClass:this.options.collapsedClass,placeClass:this.options.placeClass,noDragClass:this.options.noDragClass,emptyClass:this.options.emptyClass,expandBtnHTML:'<button type="button" class="nestable-button" data-action="expand">\t<i class="far fa-plus-square" aria-hidden="true"></i></button>',
collapseBtnHTML:'<button type="button" class="nestable-button" data-action="collapse"><i class="far fa-minus-square" aria-hidden="true"></i></button>',maxDepth:this.options.maxDepth,group:this.options.groupId,parentID:this.options.parentId});this.$target.on("change",XF.proxy(this,"change"));this.change()},change:function(a){this.$valueInput.val(JSON.stringify(this.$target.nestable(this.options.valueFunction)))}});XF.Element.register("nestable","XF.Nestable")}(jQuery,window,document);