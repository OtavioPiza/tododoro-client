(this.webpackJsonptododoro=this.webpackJsonptododoro||[]).push([[0],{155:function(e,t,n){},164:function(e,t,n){},165:function(e,t,n){},171:function(e,t,n){},172:function(e,t,n){"use strict";n.r(t);var r,a=n(0),c=n.n(a),i=n(34),o=n.n(i),s=n(123),u=n(11),l=n(12),d=n.n(l),j=n(2),b=n(19),h=n(4),f=n(53),O=n.n(f),p="/api/auth",x="/api/task",v=function(){var e=Object(b.a)(d.a.mark((function e(t,n,r,a,c){var i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("".concat(p,"/register"),{email:t,firstName:n,lastName:r,username:a,password:c});case 2:return i=e.sent,e.abrupt("return",{status:i.status,data:i.data});case 4:case"end":return e.stop()}}),e)})));return function(t,n,r,a,c){return e.apply(this,arguments)}}(),m=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("".concat(p,"/verify"),{code:n},{headers:{Authorization:t}});case 2:return r=e.sent,e.abrupt("return",{status:r.status,data:r.data});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),k=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("".concat(p,"/login"),{username:t,password:n});case 2:return r=e.sent,e.abrupt("return",{status:r.status,data:r.data});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),g=function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("".concat(x),{headers:{Authorization:t}});case 2:return n=e.sent,e.abrupt("return",{status:n.status,data:n.data});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(b.a)(d.a.mark((function e(t,n,r){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.post("".concat(x),{title:n,description:r},{headers:{Authorization:t}});case 2:return a=e.sent,e.abrupt("return",{status:a.status,data:a.data});case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),y=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.delete("".concat(x),{headers:{Authorization:t},data:{id:n}});case 2:return r=e.sent,e.abrupt("return",{status:r.status,data:r.data});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),C=n(1);try{r=localStorage.getItem("auth")?JSON.parse(localStorage.getItem("auth")):{token:null,verified:null,username:null}}catch(re){r={token:null,verified:null,username:null}}var S=Object(a.createContext)({register:function(){},verify:function(){},login:function(){},logout:function(){},token:function(){return!1},verified:function(){return!1},username:function(){return!1}}),T=function(e){var t=e.children,n=Object(a.useState)(r),c=Object(h.a)(n,2),i=c[0],o=c[1];Object(a.useEffect)((function(){localStorage.setItem("auth",JSON.stringify(i))}),[i]);var s=function(){var e=Object(b.a)(d.a.mark((function e(t,n,r,a,c,s){var u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c===s){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,v(t,n,r,a,c);case 4:201===(u=e.sent).status&&o(Object(j.a)(Object(j.a)({},i),{},{token:u.data.token,verified:!1,username:a}));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,a,c,i){return e.apply(this,arguments)}}(),u=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i.token){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,m(i.token,t);case 4:200===e.sent.status&&o(Object(j.a)(Object(j.a)({},i),{},{verified:!0}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}throw{response:{status:401}};case 2:return e.next=4,k(t,n);case 4:200===(r=e.sent).status&&o(Object(j.a)(Object(j.a)({},i),{},{token:r.data.token,verified:r.data.verified,username:t}));case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(C.jsx)(S.Provider,{value:{register:s,verify:u,login:l,logout:function(){o({token:null,verified:null,username:null})},token:i.token,verified:i.verified,username:i.username},children:t})},I=S,H=n(206),W=n(198),D=n(199),E=n(114),G=n(211),B=n(205),N=n(117),q=(n(155),function(){var e=Object(a.useContext)(I);return e.token=e.token?e.token:null,e.verified=e.verified?e.verified:null,e.username=e.username?e.username:null,Object(C.jsx)(H.a,{bg:"light",expand:"md",id:"navbar",children:Object(C.jsxs)(W.a,{children:[Object(C.jsx)(H.a.Brand,{href:"/",id:"brand",children:"TodoDoro"}),Object(C.jsx)(H.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(C.jsxs)(H.a.Collapse,{id:"basic-navbar-nav",children:[Object(C.jsx)(W.a,{children:Object(C.jsxs)(D.a,{children:[Object(C.jsx)(E.a,{md:"auto",children:Object(C.jsx)(G.a.Link,{href:"/",children:"Home"})}),Object(C.jsx)(E.a,{md:"auto",children:Object(C.jsx)(G.a.Link,{href:"/",children:"Tasks"})}),e.token&&e.username&&Object(C.jsx)(E.a,{md:"auto",children:Object(C.jsxs)(B.a,{title:"Account",children:[Object(C.jsxs)(B.a.Item,{children:["Hello, ",e.username]}),e.verified||Object(C.jsx)(B.a.Item,{children:"Verify"}),Object(C.jsx)(B.a.Item,{children:"Settings"})]})})]})}),e.token?"":Object(C.jsx)(G.a.Link,{href:"/register",children:"Register"}),Object(C.jsx)(N.a,{id:"button",variant:"outline-danger",href:e.token?"":"/login",onClick:e.token?e.logout:function(){},children:e.token?"Logout":"Login"})]})]})})}),R=n(213),L=n(208),A=(n(93),n(214)),P=n(207),z=n(118),J=function(){var e=Object(a.useContext)(I);e.token=e.token?e.token:null,e.verified=e.verified?e.verified:null,e.username=e.username?e.username:null;var t=Object(z.useStateIfMounted)(!1),n=Object(h.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(null),o=Object(h.a)(i,2),s=o[0],l=o[1],j=Object(a.useState)(null),f=Object(h.a)(j,2),O=f[0],p=f[1],x=Object(a.useState)(""),v=Object(h.a)(x,2),m=v[0],k=v[1],g=function(){var t=Object(b.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!r){t.next=3;break}return t.abrupt("return");case 3:return c(!0),t.prev=4,t.next=7,e.login(s,O);case 7:t.next=13;break;case 9:t.prev=9,t.t0=t.catch(4),401===t.t0.response.status?k("Invalid username or password"):k("Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!"),setTimeout((function(){k("")}),5e3);case 13:c(!1);case 14:case"end":return t.stop()}}),t,null,[[4,9]])})));return function(e){return t.apply(this,arguments)}}();return e.token&&!e.verified?Object(C.jsx)(u.a,{to:"/verify"}):e.token&&e.verified?Object(C.jsx)(u.a,{to:"/tasks"}):Object(C.jsxs)(D.a,{children:[Object(C.jsx)(E.a,{}),Object(C.jsxs)(E.a,{xs:"auto",children:[Object(C.jsx)(R.a,{id:"card",children:Object(C.jsx)(W.a,{id:"container",children:Object(C.jsxs)(L.a,{children:[Object(C.jsx)("h3",{children:"Welcome back!"}),Object(C.jsx)(L.a.Group,{controlId:"username",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Enter username",onChange:function(e){return l(e.target.value)},required:!0})}),Object(C.jsx)(L.a.Group,{className:"mb-3",controlId:"password",id:"in",children:Object(C.jsx)(L.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return p(e.target.value)},required:!0})}),Object(C.jsxs)("div",{id:"buttonHolder",children:[Object(C.jsx)(N.a,{id:"button",variant:"danger",type:"submit",onClick:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:"Login"}),r&&Object(C.jsx)(A.a,{color:"inherit"})]})]})})}),Object(C.jsx)("div",{id:"alertDiv",children:m&&Object(C.jsx)(P.a,{id:"alert",open:m&&!0,onClose:function(){return k("")},severity:"error",sx:{borderRadius:"1rem",marginTop:"5px",maxWidth:"100%"},children:m})})]}),Object(C.jsx)(E.a,{})]})},F=function(){var e=Object(a.useContext)(I);e.token=e.token?e.token:null,e.verified=e.verified?e.verified:null,e.username=e.username?e.username:null;var t=Object(a.useState)(!1),n=Object(h.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(""),o=Object(h.a)(i,2),s=o[0],l=o[1],j=Object(a.useState)(null),f=Object(h.a)(j,2),O=f[0],p=f[1],x=Object(a.useState)(null),v=Object(h.a)(x,2),m=v[0],k=v[1],g=Object(a.useState)(null),w=Object(h.a)(g,2),y=w[0],S=w[1],T=Object(a.useState)(null),H=Object(h.a)(T,2),G=H[0],B=H[1],q=Object(a.useState)(null),z=Object(h.a)(q,2),J=z[0],F=z[1],M=Object(a.useState)(null),V=Object(h.a)(M,2),Y=V[0],Z=V[1],K=function(){var t=Object(b.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!r){t.next=3;break}return t.abrupt("return");case 3:if(J===Y){t.next=7;break}return l("Passwords don't match"),setTimeout((function(){l("")}),5e3),t.abrupt("return");case 7:if(!(J.length<8)){t.next=11;break}return l("Password should be at least 8 characters long"),setTimeout((function(){l("")}),5e3),t.abrupt("return");case 11:if(String(G).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){t.next=15;break}return l("Invalid email"),setTimeout((function(){l("")}),5e3),t.abrupt("return");case 15:return c(!0),t.prev=16,t.next=19,e.register(G,m,y,O,J,Y);case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(16),400===t.t0.response.status?t.t0.response.data.includes("email: Error")&&t.t0.response.data.includes("username: Error")?l("Both the username and email have to be unique"):t.t0.response.data.includes("email: Error")?l("This email is already taken"):t.t0.response.data.includes("username: Error")?l("This username is already taken"):l("Invalid email"):l("Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!"),setTimeout((function(){l("")}),5e3);case 25:c(!1);case 26:case"end":return t.stop()}}),t,null,[[16,21]])})));return function(e){return t.apply(this,arguments)}}();return e.token&&!e.verified?Object(C.jsx)(u.a,{to:"/verify"}):e.token&&e.verified?Object(C.jsx)(u.a,{to:"/tasks"}):Object(C.jsxs)(D.a,{children:[Object(C.jsx)(E.a,{}),Object(C.jsxs)(E.a,{xs:"auto",children:[Object(C.jsx)(R.a,{id:"card",children:Object(C.jsx)(W.a,{id:"container",children:Object(C.jsxs)(L.a,{children:[Object(C.jsx)("h3",{children:"Welcome to TodoDoro!"}),Object(C.jsx)("p",{children:"We can't wait to have you with us! Fill out with your information and we'll be done in no time."}),Object(C.jsxs)(L.a.Group,{controlId:"email",id:"in",children:[Object(C.jsx)(L.a.Control,{placeholder:"Email",onChange:function(e){return B(e.target.value)},type:"email",required:!0}),Object(C.jsx)(L.a.Text,{children:"Please enter a valid email. We will send you a verification code. We will never share your information."})]}),Object(C.jsx)(L.a.Group,{controlId:"firstName",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"First name",onChange:function(e){return k(e.target.value)},required:!0})}),Object(C.jsx)(L.a.Group,{controlId:"lastName",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Last name",onChange:function(e){return S(e.target.value)},required:!0})}),Object(C.jsx)(L.a.Group,{controlId:"username",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Username",onChange:function(e){return p(e.target.value)},required:!0})}),Object(C.jsx)(L.a.Group,{className:"mb-3",controlId:"password",id:"in",children:Object(C.jsx)(L.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return F(e.target.value)},required:!0})}),Object(C.jsx)(L.a.Group,{className:"mb-3",controlId:"passwordConfirm",id:"in",children:Object(C.jsx)(L.a.Control,{type:"password",placeholder:"Retype password",onChange:function(e){return Z(e.target.value)},required:!0})}),Object(C.jsxs)("div",{id:"buttonHolder",children:[Object(C.jsx)(N.a,{id:"button",variant:"danger",type:"submit",onClick:function(e){return K(e)},children:"Register"}),r&&Object(C.jsx)(A.a,{color:"inherit"})]})]})})}),Object(C.jsx)("div",{id:"alertDiv",children:s&&Object(C.jsx)(P.a,{id:"alert",open:s&&!0,onClose:function(){return l("")},severity:"error",sx:{borderRadius:"1rem",marginTop:"5px",maxWidth:"100%"},children:s})})]}),Object(C.jsx)(E.a,{})]})},M=function(){var e=Object(a.useContext)(I);e.token=e.token?e.token:null,e.verified=e.verified?e.verified:null,e.username=e.username?e.username:null;var t=Object(a.useState)(!1),n=Object(h.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(""),o=Object(h.a)(i,2),s=o[0],l=o[1],j=Object(a.useState)(""),f=Object(h.a)(j,2),O=f[0],p=f[1],x=function(){var t=Object(b.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),8===O.length){t.next=4;break}return l("Invalid code!"),t.abrupt("return");case 4:return c(!0),t.prev=5,t.next=8,e.verify(O);case 8:t.next=14;break;case 10:t.prev=10,t.t0=t.catch(5),403===t.t0.response.status&&(t.t0.response.data.includes("code expired")?l("Code expired"):t.t0.response.data.includes("invalid code")?l("Invalid code"):l("Something went wrong when connecting to our servers. We have been notified and are currently working on it. Hang thight!")),setTimeout((function(){l("")}),5e3);case 14:c(!1);case 15:case"end":return t.stop()}}),t,null,[[5,10]])})));return function(e){return t.apply(this,arguments)}}();return e.token&&e.verified?Object(C.jsx)(u.a,{to:"/tasks"}):e.token?Object(C.jsxs)(D.a,{children:[Object(C.jsx)(E.a,{}),Object(C.jsxs)(E.a,{xs:"auto",children:[Object(C.jsx)(R.a,{id:"card",children:Object(C.jsx)(W.a,{id:"container",children:Object(C.jsxs)(L.a,{children:[Object(C.jsx)("h3",{children:"One last step!"}),Object(C.jsx)(L.a.Group,{className:"mb-3",controlId:"password",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Code",onChange:function(e){return p(e.target.value)},required:!0})}),Object(C.jsxs)("div",{id:"buttonHolder",children:[Object(C.jsx)(N.a,{id:"button",variant:"danger",type:"submit",onClick:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:"Verify"}),r&&Object(C.jsx)(A.a,{color:"inherit"})]})]})})}),Object(C.jsx)("div",{id:"alertDiv",children:s&&Object(C.jsx)(P.a,{id:"alert",open:s&&!0,onClose:function(){return l("")},severity:"error",sx:{borderRadius:"1rem",marginTop:"5px",maxWidth:"100%"},children:s})})]}),Object(C.jsx)(E.a,{})]}):Object(C.jsx)(u.a,{to:"/login"})},V=n(49),Y=(n(164),n(209)),Z=n(216),K=n(217),U=n(218),X=n(210),$=(n(165),function(e){var t=e.startHandler,n=e.deleteHandler,r=e.id,a=e.title,c=e.description,i=e.progress;return Object(C.jsx)(R.a,{id:"task",children:Object(C.jsxs)(W.a,{id:"container",children:[Object(C.jsxs)("div",{id:"header",children:[Object(C.jsx)(N.a,{id:"titleButton",variant:"danger",onClick:function(){return t(r)},children:Object(C.jsxs)("div",{id:"titleContainer",children:[Object(C.jsx)(A.a,{color:"inherit",variant:"determinate",value:i,id:"bar",sx:{padding:".2rem"}}),Object(C.jsx)("h5",{children:a})]})}),Object(C.jsx)("button",{id:"delButton",onClick:function(){return n(r)},children:"X"})]}),c&&Object(C.jsx)("p",{children:c})]})})}),Q=n(121),_=n.n(Q),ee=n.p+"static/media/notification.d9cddb63.mp3",te=function(){var e=Object(a.useContext)(I);e.token=e.token?e.token:null,e.verified=e.verified?e.verified:null,e.username=e.username?e.username:null;var t=Object(a.useState)([]),n=Object(h.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(""),o=Object(h.a)(i,2),s=o[0],l=o[1],j=Object(a.useState)(""),f=Object(h.a)(j,2),O=f[0],p=f[1],x=Object(a.useState)(!1),v=Object(h.a)(x,2),m=v[0],k=v[1],S=Object(a.useState)(null),T=Object(h.a)(S,2),H=T[0],G=T[1],B=Object(a.useState)(0),q=Object(h.a)(B,2),z=q[0],J=q[1],F=Object(a.useState)(null),M=Object(h.a)(F,2),Q=M[0],te=M[1],ne=Object(a.useState)(0),re=Object(h.a)(ne,2),ae=re[0],ce=re[1],ie=Object(a.useState)(null),oe=Object(h.a)(ie,2),se=oe[0],ue=oe[1],le=Object(a.useState)(1),de=Object(h.a)(le,2),je=de[0],be=de[1],he=Object(a.useState)(!1),fe=Object(h.a)(he,2),Oe=fe[0],pe=fe[1],xe=Object(a.useState)(""),ve=Object(h.a)(xe,2),me=ve[0],ke=ve[1],ge=Object(a.useState)(""),we=Object(h.a)(ge,2),ye=we[0],Ce=we[1];Object(a.useEffect)((function(){g(e.token).then((function(e){c(e.data)})).catch((function(e){console.log(e),ke("Something went wrong while fetching your tasks")}))}),[]),H&&!se&&setTimeout((function(){100!==z?J(z+1):Te(H)}),15e3),Q&&setTimeout((function(){100!==ae?ce(ae+1):Ie(Q)}),je%4?3e3:9e3);var Se=function(e){H?H===e?Te(H):(ue(H),G(e)):(J(0),G(e))},Te=function(){J(100),pe(!0),G(null),Q&&Ie(Q),ce(0),te(H)},Ie=function(e){pe(!0),be(je%4?je+1:1),ce(100),te(null),ue(e)},He=function(){var t=Object(b.a)(d.a.mark((function t(){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s){t.next=4;break}return ke("Please enter a title"),setTimeout((function(){return ke("")}),5e3),t.abrupt("return");case 4:return k(!0),t.prev=5,t.next=8,w(e.token,s,O||null);case 8:n=t.sent,c(r.concat({id:n.data.id,title:n.data.title,description:n.data.description})),l(""),p(""),Ce("Task created"),t.next=20;break;case 15:t.prev=15,t.t0=t.catch(5),console.log(t.t0),ke("Something went wrong while creating a new task"),setTimeout((function(){return ke("")}),5e3);case 20:k(!1);case 21:case"end":return t.stop()}}),t,null,[[5,15]])})));return function(){return t.apply(this,arguments)}}(),We=function(){var t=Object(b.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,y(e.token,n);case 3:c(r.filter((function(e){return e.id!==n}))),Ce("Task removed"),t.next=12;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0.error),ke("Something went wrong while deleting the task"),setTimeout((function(){return ke("")}),5e3);case 12:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}();return e.token?e.token&&!e.verified?Object(C.jsx)(u.a,{to:"/verify"}):Object(C.jsxs)(D.a,{children:[Object(C.jsx)(E.a,{}),Object(C.jsxs)(E.a,{xs:"auto",children:[r.map((function(e,t){return Object(C.jsx)($,{startHandler:Se,deleteHandler:We,id:e.id,title:e.title,description:e.description,progress:H&&e.id===H?z:100},t)})),Object(C.jsx)(R.a,{id:"create",children:Object(C.jsx)(W.a,{id:"container",children:Object(C.jsxs)(L.a,{children:[Object(C.jsx)("h4",{children:"Create a new task!"}),Object(C.jsx)(L.a.Group,{controlId:"title",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Enter a title",onChange:function(e){return l(e.target.value)},value:s})}),Object(C.jsx)(L.a.Group,{controlId:"description",id:"in",children:Object(C.jsx)(L.a.Control,{placeholder:"Enter a description (optional)",onChange:function(e){return p(e.target.value)},value:O})}),Object(C.jsxs)("div",{id:"buttonHolder",children:[Object(C.jsx)(N.a,{id:"button",variant:"danger",onClick:He,children:"Create"}),m&&Object(C.jsx)(A.a,{color:"inherit"})]})]})})}),Object(C.jsx)("div",{id:"alertDiv",children:me&&Object(C.jsx)(P.a,{id:"alert",open:me&&!0,onClose:function(){return ke("")},severity:"error",sx:{borderRadius:"1rem",marginTop:"5px",maxWidth:"100%"},children:me})})]}),Object(C.jsx)(E.a,{}),Object(C.jsx)(Y.a,{open:!!Q,onClose:function(){return function(){return Ie(Q)}},children:Object(C.jsxs)(Z.a,{sx:{borderRadius:"1rem",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"none",boxShadow:24,p:4},children:[Object(C.jsx)(K.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Time to take a break!"}),Object(C.jsx)(K.a,{id:"modal-modal-description",sx:{mt:2},children:"You have been working hard; take some to chill and recharge. We will notify you when it's time to get back to work."}),Object(C.jsx)("br",{}),Object(C.jsx)("div",{id:"breakBar",children:Object(C.jsx)(U.a,{variant:"determinate",color:"inherit",value:ae})}),Object(C.jsx)("br",{}),Object(C.jsx)("div",{children:Object(C.jsx)(N.a,{variant:"danger",id:"genButton",onClick:function(){return Ie(Q)},children:"Skip Break"})})]})}),Object(C.jsx)(Y.a,{open:!!se,onClose:function(){return function(){return ue(null)}},children:Object(C.jsxs)(Z.a,{sx:{borderRadius:"1rem",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"none",boxShadow:24,p:4},children:[Object(C.jsx)(K.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Did you complete the task?"}),Object(C.jsx)(K.a,{id:"modal-modal-description",sx:{mt:2},children:"Did you complete the task you have been working on".concat(function(e){var t,n=Object(V.a)(r);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(a.id===e)return" (".concat(a.title,")")}}catch(c){n.e(c)}finally{n.f()}}(se),"?")}),Object(C.jsx)("br",{}),Object(C.jsx)(N.a,{style:{marginBottom:".5rem"},variant:"danger",id:"genButton",onClick:function(){We(se).then((function(){ue(null)}))},children:"Yes! Go ahead and remove it."}),Object(C.jsx)(N.a,{variant:"danger",id:"genButton",onClick:function(){ue(null)},children:"No! Keep it there."})]})}),Object(C.jsx)(X.a,{open:!!ye,autoHideDuration:5e3,onClose:function(){return Ce("")},message:ye}),Object(C.jsx)(_.a,{preload:!0,playing:Oe,onEnd:function(){return pe(!1)},src:ee})]}):Object(C.jsx)(u.a,{to:"/login"})},ne=function(){return Object(C.jsxs)(T,{children:[Object(C.jsx)(q,{}),Object(C.jsx)(s.a,{children:Object(C.jsxs)(u.d,{children:[Object(C.jsx)(u.b,{path:"/login",element:Object(C.jsx)(J,{})}),Object(C.jsx)(u.b,{path:"/register",element:Object(C.jsx)(F,{})}),Object(C.jsx)(u.b,{path:"/verify",element:Object(C.jsx)(M,{})}),Object(C.jsx)(u.b,{path:"/tasks",element:Object(C.jsx)(te,{})})]})})]})};n(170),n(171);o.a.render(Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(ne,{})}),document.getElementById("root"))},93:function(e,t,n){}},[[172,1,2]]]);
//# sourceMappingURL=main.efb45120.chunk.js.map