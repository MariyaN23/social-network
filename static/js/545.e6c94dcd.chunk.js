"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[545],{7545:function(e,s,a){a.r(s),a.d(s,{default:function(){return B}});var n=a(8281),i=(a(2791),"Dialogs_dialogs__D6ITN"),t="Dialogs_dialogsItems__vi0aE",r="Dialogs_messages__TMPGG",d="Dialogs_backBtn__Vr9rf",l="Dialogs_sendForm__d1Smt",o="Dialogs_field__zRC7J",g={item:"DialogItem_item__ItviF"},c=a(1087),u=a(184),m=function(e){var s="".concat(e.id);return(0,u.jsx)("div",{className:g.item,children:(0,u.jsx)(c.OL,{to:s,className:g.active,children:e.name})})},_="Message_messageWrapper__ILW8q",h="Message_message__vWHhs",j=function(e){return(0,u.jsx)("div",{className:_,children:(0,u.jsx)("div",{className:h,children:e.message})})},v=a(7689),x=a(5705),f=function(e){return{}},M=function(e){var s;return e?e.length>100&&(s="Message is too large"):s="Message required",s},w=function(e){return(0,u.jsx)(x.J9,{initialValues:{newMessageBody:""},validate:f,onSubmit:function(s,a){var n={newMessageBody:s.newMessageBody};e.sendMessage(n.newMessageBody),a.resetForm(),a.setSubmitting(!1)},children:function(e){var s=e.values,a=e.handleChange,n=e.handleBlur,i=e.handleSubmit,t=e.isSubmitting,r=e.errors;return(0,u.jsxs)("form",{onSubmit:i,className:l,children:[(0,u.jsx)(x.gN,{type:"text",name:"newMessageBody",placeholder:"Write new message",onChange:a,onBlur:n,value:s.newMessageBody,className:o,validate:M}),"Message is too large"===r.newMessageBody&&(0,u.jsx)("div",{children:r.newMessageBody}),(0,u.jsx)("button",{type:"submit",disabled:t,children:"Send Message"})]})}})},b=a(2353),p=a(7781),y=a(2895),B=(0,p.qC)((0,b.$j)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(s){e((0,n.$)(s))}}})),y.F)((function(e){var s=e.dialogsPage.dialogs.map((function(e){return(0,u.jsx)(m,{name:e.name,id:e.id},e.id)})),a=e.dialogsPage.messages.map((function(e){return(0,u.jsx)(j,{message:e.message},e.id)}));return(0,u.jsx)("div",{className:i,children:(0,u.jsxs)(v.Z5,{children:[(0,u.jsx)(v.AW,{path:"",element:(0,u.jsx)("div",{className:t,children:s})}),(0,u.jsx)(v.AW,{path:"/*",element:(0,u.jsxs)("div",{className:r,children:[(0,u.jsx)("button",{className:d,children:(0,u.jsx)(c.OL,{to:"/dialogs",children:"Back"})}),(0,u.jsx)("div",{children:a}),(0,u.jsx)(w,{sendMessage:e.sendMessage})]})})]})})}))}}]);
//# sourceMappingURL=545.e6c94dcd.chunk.js.map