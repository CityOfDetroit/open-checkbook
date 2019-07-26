(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{150:function(e,t,a){"use strict";a.r(t);a(192),a(76),a(56),a(37),a(181);var n=a(0),r=a.n(n),l=a(155),o=a(459),c=a(248),m=a(249),i=a(458),u=a(297),s=a(163),d=a.n(s),p=a(171),y=(a(77),a(415),a(247)),E=a(172),g=function(e){var t=e.vendor,a=e.grouped,n=e.link,o=e.number;return r.a.createElement("div",null,t," ",n?r.a.createElement(l.a,{to:"/vendor/"+o},">>"):null,r.a.createElement("p",{style:{fontWeight:500}},a[t].length," payments for ",E.a.floatToMoney(a[t].reduce(function(e,t){return e+parseFloat(t.invoicePaymentDistAmount)},0))))},f=function(e){var t=e.tableData,a=e.payments,n=e.show,l=d()(a).groupBy("vendorName").value();return r.a.createElement(y.a,null,r.a.createElement(y.a.Header,null,r.a.createElement(y.a.Row,null,r.a.createElement(y.a.HeaderCell,null,"Payee"),r.a.createElement(y.a.HeaderCell,null,"Total Payments"),r.a.createElement(y.a.HeaderCell,null,"Fund"),r.a.createElement(y.a.HeaderCell,null,"Cost Center"),r.a.createElement(y.a.HeaderCell,null,"Expense Category"),r.a.createElement(y.a.HeaderCell,null,"Expense"))),r.a.createElement(y.a.Body,null,Object.keys(t).map(function(e,a){return r.a.createElement(r.a.Fragment,null,Object.keys(t[e]).map(function(o,c){return r.a.createElement(y.a.Row,{key:a+c,style:{backgroundColor:a%2==0?"white":"#F9FAFB"}},0===c?r.a.createElement(y.a.Cell,{rowSpan:Object.keys(t[e]).length,content:r.a.createElement(g,{vendor:e,grouped:l,link:n[e],number:t[e][Object.keys(t[e])[0]][0].vendorNumber}),style:{fontWeight:600},verticalAlign:"top"}):null,r.a.createElement(y.a.Cell,{verticalAlign:"top",textAlign:"right",content:E.a.floatToMoney(t[e][o].reduce(function(e,t){return e+t.amount},0))}),r.a.createElement(y.a.Cell,{verticalAlign:"top",content:o.split(",")[0]}),r.a.createElement(y.a.Cell,{verticalAlign:"top",content:o.split(",")[1]}),r.a.createElement(y.a.Cell,{verticalAlign:"top",content:o.split(",")[2]}),r.a.createElement(y.a.Cell,{verticalAlign:"top",content:o.split(",")[3]}))}))})))},h=a(178);a.d(t,"query",function(){return v});t.default=function(e){var t=e.data.postgres.agency[0],a=t.accountsPayablesByAgencyCodeMaskedList,n=[{key:"Home",content:r.a.createElement(l.a,{to:"/"},"Home")},{key:"Agency",content:"Agency",link:!1},{key:""+t.deptName,content:r.a.createElement(l.a,{to:"/agency/"+t.deptSlug},t.deptNameShorthand),active:!0}],s=d()(a).groupBy("vendorName").map(function(e,t){return{name:t,number:e[0].vendorNumber,numPayments:e.length,sumPayments:e.reduce(function(e,t){return e+parseFloat(t.invoicePaymentDistAmount)},0)}}).orderBy(["sumPayments","name"],["desc","asc"]).value(),y=d()(a).groupBy("costcenterDesc").map(function(e,t){return{name:t,numPayments:e.length,sumPayments:e.reduce(function(e,t){return e+parseFloat(t.invoicePaymentDistAmount)},0)}}).orderBy(["sumPayments","name"],["desc","asc"]).value(),g=d()(a).groupBy("objectDescShorthand").map(function(e,t){return{name:t,numPayments:e.length,sumPayments:e.reduce(function(e,t){return e+parseFloat(t.invoicePaymentDistAmount)},0)}}).orderBy(["sumPayments","name"],["desc","asc"]).value(),v=d()(a).map(function(e){return{vendorName:e.vendorName,vendorNumber:e.vendorNumber,amount:parseFloat(e.invoicePaymentDistAmount),categories:e.fundDesc+","+e.costcenterDesc+","+e.objectDescShorthand+","+e.objectDesc}}).value(),b=E.a.nest(v,["vendorName","categories"]),C={verticalAlign:"bottom",margin:0,display:"table-cell",height:"50px"},w=d()(a).groupBy("vendorName").value(),x={};return Object.keys(w).forEach(function(e){var t=w[e].map(function(e){return e.vendorByVendorNumber.showInStats});x[e]=!t.some(function(e){return!1===e})}),r.a.createElement(p.a,{pageTitle:t.deptName},r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:12},r.a.createElement(c.a,{basic:!0},r.a.createElement(m.a,{icon:"right angle",sections:n}),r.a.createElement(i.a,{as:"h2"},t.deptName,r.a.createElement(i.a.Subheader,null,E.a.stringToMoney(t.totalAmount)," total payments in fiscal year 2017-2018"))))),r.a.createElement(o.a.Row,{columns:3},r.a.createElement(o.a.Column,{width:4},r.a.createElement(c.a,{basic:!0},r.a.createElement(i.a,{as:"h3",style:C},"Top Payees"),r.a.createElement(u.a,{divided:!0,ordered:!0,relaxed:!0},s.slice(0,5).map(function(e,t){return r.a.createElement(u.a.Item,{key:t},r.a.createElement(u.a.Content,null,r.a.createElement(u.a.Header,null,e.name," ",x[e.name]?r.a.createElement(l.a,{to:"/vendor/"+e.number},">>"):null),r.a.createElement(u.a.Description,null,E.a.floatToMoney(e.sumPayments))))})))),r.a.createElement(o.a.Column,{width:4},r.a.createElement(c.a,{basic:!0},r.a.createElement(i.a,{as:"h3",style:C},"Top Cost Centers"),r.a.createElement(u.a,{divided:!0,ordered:!0,relaxed:!0},y.slice(0,5).map(function(e,t){return r.a.createElement(u.a.Item,{key:t},r.a.createElement(u.a.Content,null,r.a.createElement(u.a.Header,null,e.name),r.a.createElement(u.a.Description,null,E.a.floatToMoney(e.sumPayments))))})))),r.a.createElement(o.a.Column,{width:4},r.a.createElement(c.a,{basic:!0},r.a.createElement(i.a,{as:"h3",style:C},"Total Payments by Expense Category"),r.a.createElement(u.a,{divided:!0,relaxed:!0},g.map(function(e,t){return r.a.createElement(u.a.Item,{key:t},r.a.createElement(u.a.Content,null,r.a.createElement(u.a.Header,null,e.name),r.a.createElement(u.a.Description,null,E.a.floatToMoney(e.sumPayments))))}))))),r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:12},r.a.createElement(c.a,{basic:!0},r.a.createElement(i.a,{as:"h3",floated:"left",textAlign:"left"},"Summary of All Payments",r.a.createElement(i.a.Subheader,null,a.length.toLocaleString()," payments made to ",s.length.toLocaleString()," payees")),r.a.createElement(f,{tableData:b,payments:a,show:x})))),r.a.createElement(h.a,null))};var v="2889817036"},155:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),l=a(4),o=a.n(l),c=a(33),m=a.n(c);a.d(t,"a",function(){return m.a}),a.d(t,"c",function(){return c.navigate});a(162);var i=r.a.createContext({}),u=function(e){return r.a.createElement(i.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},162:function(e,t,a){var n;e.exports=(n=a(168))&&n.default||n},168:function(e,t,a){"use strict";a.r(t);a(36);var n=a(0),r=a.n(n),l=a(4),o=a.n(l),c=a(55),m=a(2),i=function(e){var t=e.location,a=m.default.getResourcesForPathnameSync(t.pathname);return a?r.a.createElement(c.a,Object.assign({location:t,pageResources:a},a.json)):null};i.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=i},169:function(e){e.exports={data:{site:{siteMetadata:{title:"Open Checkbook Detroit"}}}}},170:function(e,t,a){e.exports=a.p+"static/cod-logo-3c15a0bdecbe50211480e8b9b7a32701.jpg"},171:function(e,t,a){"use strict";var n=a(169),r=a(0),l=a.n(r),o=a(4),c=a.n(o),m=a(182),i=a.n(m),u=a(155),s=a(459),d=a(448),p=a(458),y=a(163),E=a.n(y),g=a(170),f=a.n(g),h=function(e){var t=e.siteTitle;return l.a.createElement(s.a,{padded:!0,stackable:!0,centered:!0},l.a.createElement(s.a.Row,{style:{borderBottom:"5px solid #feb70d"}},l.a.createElement(s.a.Column,{width:12},l.a.createElement("header",null,l.a.createElement("div",{style:{margin:"0 auto",padding:"1rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center",alignContent:"middle",flexWrap:"wrap"}},l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("div",{style:{width:"70px"}},l.a.createElement("a",{href:"https://detroitmi.gov/",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(d.a,{src:f.a,style:{padding:0,margin:0,width:"100%",height:"auto"},alt:"city of detroit logo"}))),l.a.createElement(u.a,{className:"header-link",to:"/",style:{color:"black",textDecoration:"none",textAlign:"right"}},l.a.createElement(p.a,{as:"h2",style:{fontWeight:900}},E.a.toUpper(t)))),l.a.createElement(u.a,{to:"/",style:{color:"#004445",textDecoration:"none",marginLeft:"auto",marginRight:"3em",borderBottom:"1px dotted #18252a"}},"HOME"),l.a.createElement(u.a,{to:"/about/",style:{color:"#004445",textDecoration:"none",borderBottom:"1px dotted #18252a",marginRight:"3em"}},"ABOUT"),l.a.createElement(u.a,{to:"/drilldown/",prefetch:!1,style:{color:"#004445",textDecoration:"none",borderBottom:"1px dotted #18252a"}},"CHART"))))))},v=(a(186),function(e){var t=e.children,a=(e.data,e.pageTitle);return l.a.createElement(u.b,{query:"755544856",render:function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.a,{title:a+": "+e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]}),l.a.createElement(h,{siteTitle:e.site.siteMetadata.title}),l.a.createElement(s.a,{padded:!0,stackable:!0,centered:!0},t))},data:n})});v.propTypes={children:c.a.node.isRequired};t.a=v},172:function(e,t,a){"use strict";var n=a(163),r=a.n(n),l=a(199),o=a.n(l),c={stringToMoney:function(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(e))},formatMoney:function(e){return o()(e).format("$0.0a").toUpperCase()},floatToMoney:function(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)},nest:function(e,t){if(!t.length)return e;var a=t[0],n=t.slice(1);return r.a.mapValues(r.a.groupBy(e,a),function(e){return c.nest(e,n)})}};t.a=c},178:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(459);t.a=function(){return r.a.createElement(l.a.Row,{style:{background:"#f2f2f2",marginTop:"5em",height:"50px"}},r.a.createElement("span",{style:{width:"50px",marginTop:"-55px"}},r.a.createElement("img",{style:{maxWidth:"100%"},src:"https://detroitmi.gov/themes/custom/detroitmi/logo.png",alt:"City of Detroit logo"})))}}}]);
//# sourceMappingURL=component---src-templates-agency-page-js-3d1c8e3f717566d4f274.js.map