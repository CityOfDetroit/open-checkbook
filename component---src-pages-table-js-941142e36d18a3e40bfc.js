(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{146:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return b});a(245);var n=a(0),r=a.n(n),c=a(160),l=a(459),o=a(251),i=a(461),s=a(249),d=a(164),u=a.n(d),m=a(172),p=a(174);t.default=function(e){var t=e.location,a=e.data,n=[],d=[];if(t.state){var b=t.state.details,f={agencyCode:b.agency,costcenterDesc:b.cc,objectDescShorthand:b.expense,vendorName:b.vendor};n=u.a.filter(a.postgres.allAccountsPayablesList,f),d.push({key:"Home",content:r.a.createElement(c.a,{to:"/"},"Home")},{key:"Agency",content:"Agency",link:!1},{key:""+b.agency,content:""+n[0].agencyDesc,link:!0},{key:"CC",content:"Cost Center",link:!1},{key:""+b.cc,content:""+b.cc,link:!1},{key:"Expense",content:"Expense Category",link:!1},{key:""+b.expense,content:""+b.expense,link:!1},{key:"Vendor",content:"Payee",link:!1},{key:""+b.vendor,content:""+b.vendor,link:!0,active:!0})}else n=a.postgres.allAccountsPayablesList,d.push({key:"Home",content:r.a.createElement(c.a,{to:"/"},"Home")},{key:"Table",content:r.a.createElement(c.a,{to:"/table/"},"All Payments"),active:!0});return r.a.createElement(m.a,null,r.a.createElement(l.a.Row,null,r.a.createElement(l.a.Column,{width:12},r.a.createElement(o.a,{icon:"right angle",sections:d}),r.a.createElement(i.a,{as:"h1"},"Payments Table",r.a.createElement(i.a.Subheader,null,n.length>1e5?"Showing 100 of "+n.length.toLocaleString()+" payments":"Showing "+n.length.toLocaleString()+" payments")),r.a.createElement(s.a,{stackable:!0,striped:!0},r.a.createElement(s.a.Header,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.HeaderCell,null,"Agency"),r.a.createElement(s.a.HeaderCell,null,"Payee"),r.a.createElement(s.a.HeaderCell,{textAlign:"right"},"Payment Amount"),r.a.createElement(s.a.HeaderCell,null,"Check Date"),r.a.createElement(s.a.HeaderCell,null,"Fiscal Year"),r.a.createElement(s.a.HeaderCell,null,"Fund"),r.a.createElement(s.a.HeaderCell,null,"Cost Center"),r.a.createElement(s.a.HeaderCell,null,"Expense Category"),r.a.createElement(s.a.HeaderCell,null,"Expense"))),r.a.createElement(s.a.Body,null,u.a.sampleSize(n,100).sort(function(e,t){return e.checkDate<t.checkDate}).map(function(e,t){return r.a.createElement(s.a.Row,{key:t},r.a.createElement(s.a.Cell,null,e.agencyDesc," ",r.a.createElement(c.a,{to:"/agency/"+e.agencyByAgencyCodeMasked.deptSlug},">>")),r.a.createElement(s.a.Cell,null,e.vendorByVendorNumber.showInStats?r.a.createElement(r.a.Fragment,null,e.vendorName," ",r.a.createElement(c.a,{to:"/vendor/"+e.vendorNumber},">>")):e.vendorName),r.a.createElement(s.a.Cell,{textAlign:"right"},p.a.stringToMoney(e.invoicePaymentDistAmount)),r.a.createElement(s.a.Cell,null,e.checkDate.slice(0,10)),r.a.createElement(s.a.Cell,null,e.fiscalYear),r.a.createElement(s.a.Cell,null,e.fundDesc),r.a.createElement(s.a.Cell,null,e.costcenterDesc),r.a.createElement(s.a.Cell,null,e.objectDescShorthand),r.a.createElement(s.a.Cell,null,e.objectDesc))}))))))};var b="2567351988"},160:function(e,t,a){"use strict";a.d(t,"b",function(){return d});var n=a(0),r=a.n(n),c=a(4),l=a.n(c),o=a(33),i=a.n(o);a.d(t,"a",function(){return i.a}),a.d(t,"c",function(){return o.navigate});a(163);var s=r.a.createContext({}),d=function(e){return r.a.createElement(s.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};d.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},163:function(e,t,a){var n;e.exports=(n=a(169))&&n.default||n},169:function(e,t,a){"use strict";a.r(t);a(36);var n=a(0),r=a.n(n),c=a(4),l=a.n(c),o=a(55),i=a(2),s=function(e){var t=e.location,a=i.default.getResourcesForPathnameSync(t.pathname);return a?r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null};s.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=s},170:function(e){e.exports={data:{site:{siteMetadata:{title:"Open Checkbook Detroit"}}}}},171:function(e,t,a){e.exports=a.p+"static/cod-logo-3c15a0bdecbe50211480e8b9b7a32701.jpg"},172:function(e,t,a){"use strict";var n=a(170),r=a(0),c=a.n(r),l=a(4),o=a.n(l),i=a(183),s=a.n(i),d=a(160),u=a(459),m=a(449),p=a(461),b=a(164),f=a.n(b),h=a(171),g=a.n(h),y=function(e){var t=e.siteTitle;return c.a.createElement(u.a,{padded:!0,stackable:!0,centered:!0},c.a.createElement(u.a.Row,{style:{borderBottom:"5px solid #feb70d"}},c.a.createElement(u.a.Column,{width:12},c.a.createElement("header",null,c.a.createElement("div",{style:{margin:"0 auto",padding:"1rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center",alignContent:"middle",flexWrap:"wrap"}},c.a.createElement("div",{style:{display:"flex",alignItems:"center"}},c.a.createElement("div",{style:{width:"70px"}},c.a.createElement("a",{href:"https://detroitmi.gov/",target:"_blank",rel:"noopener noreferrer"},c.a.createElement(m.a,{src:g.a,style:{padding:0,margin:0,width:"100%",height:"auto"},alt:"city of detroit logo"}))),c.a.createElement(d.a,{className:"header-link",to:"/",style:{color:"black",textDecoration:"none",textAlign:"right"}},c.a.createElement(p.a,{as:"h2",style:{fontWeight:900}},f.a.toUpper(t)))),c.a.createElement(d.a,{to:"/",style:{color:"#004445",textDecoration:"none",marginLeft:"auto",marginRight:"3em",borderBottom:"1px dotted #18252a"}},"HOME"),c.a.createElement(d.a,{to:"/about/",style:{color:"#004445",textDecoration:"none",borderBottom:"1px dotted #18252a",marginRight:"3em"}},"ABOUT"),c.a.createElement(d.a,{to:"/drilldown/",prefetch:!1,style:{color:"#004445",textDecoration:"none",borderBottom:"1px dotted #18252a"}},"CHART"))))))},v=(a(187),function(e){var t=e.children,a=(e.data,e.pageTitle);return c.a.createElement(d.b,{query:"755544856",render:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{title:a+": "+e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},c.a.createElement("link",{href:"https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,900&display=swap",rel:"stylesheet"})),c.a.createElement(y,{siteTitle:e.site.siteMetadata.title}),c.a.createElement(u.a,{padded:!0,stackable:!0,centered:!0},t))},data:n})});v.propTypes={children:o.a.node.isRequired};t.a=v},174:function(e,t,a){"use strict";var n=a(164),r=a.n(n),c=a(200),l=a.n(c),o={stringToMoney:function(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(e))},formatMoney:function(e){return l()(e).format("$0.0a").toUpperCase()},floatToMoney:function(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)},nest:function(e,t){if(!t.length)return e;var a=t[0],n=t.slice(1);return r.a.mapValues(r.a.groupBy(e,a),function(e){return o.nest(e,n)})}};t.a=o},245:function(e,t,a){"use strict";var n=a(11),r=a(27),c=a(25),l=a(19),o=[].sort,i=[1,2,3];n(n.P+n.F*(l(function(){i.sort(void 0)})||!l(function(){i.sort(null)})||!a(246)(o)),"Array",{sort:function(e){return void 0===e?o.call(c(this)):o.call(c(this),r(e))}})},246:function(e,t,a){"use strict";var n=a(19);e.exports=function(e,t){return!!e&&n(function(){t?e.call(null,function(){},1):e.call(null)})}},249:function(e,t,a){"use strict";var n=a(75),r=a.n(n),c=(a(155),a(167)),l=a.n(c),o=a(153),i=a.n(o),s=(a(4),a(0)),d=a.n(s),u=a(180),m=a(256),p=a(257),b=a(152);function f(e){var t=e.children,a=e.className,n=i()(a),c=Object(m.a)(f,e),l=Object(p.a)(f,e);return d.a.createElement(l,r()({},c,{className:n}),t)}f.handledProps=["as","children","className"],f.defaultProps={as:"tbody"},f.propTypes={};var h=f,g=a(258),y=a(221);function v(e){var t=e.active,a=e.children,n=e.className,c=e.collapsing,l=e.content,o=e.disabled,s=e.error,f=e.icon,h=e.negative,g=e.positive,E=e.selectable,j=e.singleLine,O=e.textAlign,k=e.verticalAlign,N=e.warning,C=e.width,w=i()(Object(u.a)(t,"active"),Object(u.a)(c,"collapsing"),Object(u.a)(o,"disabled"),Object(u.a)(s,"error"),Object(u.a)(h,"negative"),Object(u.a)(g,"positive"),Object(u.a)(E,"selectable"),Object(u.a)(j,"single line"),Object(u.a)(N,"warning"),Object(u.d)(O),Object(u.f)(k),Object(u.g)(C,"wide"),n),x=Object(m.a)(v,e),A=Object(p.a)(v,e);return b.a.isNil(a)?d.a.createElement(A,r()({},x,{className:w}),y.a.create(f),l):d.a.createElement(A,r()({},x,{className:w}),a)}v.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],v.defaultProps={as:"td"},v.propTypes={},v.create=Object(g.c)(v,function(e){return{content:e}});var E=v;function j(e){var t=e.children,a=e.className,n=e.content,c=e.fullWidth,l=i()(Object(u.a)(c,"full-width"),a),o=Object(m.a)(j,e),s=Object(p.a)(j,e);return d.a.createElement(s,r()({},o,{className:l}),b.a.isNil(t)?n:t)}j.handledProps=["as","children","className","content","fullWidth"],j.defaultProps={as:"thead"},j.propTypes={};var O=j;function k(e){var t=e.as,a=Object(m.a)(k,e);return d.a.createElement(O,r()({},a,{as:t}))}k.handledProps=["as"],k.propTypes={},k.defaultProps={as:"tfoot"};var N=k;function C(e){var t=e.as,a=e.className,n=e.sorted,c=i()(Object(u.e)(n,"sorted"),a),l=Object(m.a)(C,e);return d.a.createElement(E,r()({},l,{as:t,className:c}))}C.handledProps=["as","className","sorted"],C.propTypes={},C.defaultProps={as:"th"};var w=C;function x(e){var t=e.active,a=e.cellAs,n=e.cells,c=e.children,o=e.className,s=e.disabled,f=e.error,h=e.negative,g=e.positive,y=e.textAlign,v=e.verticalAlign,j=e.warning,O=i()(Object(u.a)(t,"active"),Object(u.a)(s,"disabled"),Object(u.a)(f,"error"),Object(u.a)(h,"negative"),Object(u.a)(g,"positive"),Object(u.a)(j,"warning"),Object(u.d)(y),Object(u.f)(v),o),k=Object(m.a)(x,e),N=Object(p.a)(x,e);return b.a.isNil(c)?d.a.createElement(N,r()({},k,{className:O}),l()(n,function(e){return E.create(e,{defaultProps:{as:a}})})):d.a.createElement(N,r()({},k,{className:O}),c)}x.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],x.defaultProps={as:"tr",cellAs:"td"},x.propTypes={},x.create=Object(g.c)(x,function(e){return{cells:e}});var A=x;function P(e){var t=e.attached,a=e.basic,n=e.celled,c=e.children,o=e.className,s=e.collapsing,f=e.color,g=e.columns,y=e.compact,v=e.definition,E=e.fixed,j=e.footerRow,k=e.headerRow,C=e.headerRows,w=e.inverted,x=e.padded,T=e.renderBodyRow,D=e.selectable,R=e.singleLine,H=e.size,S=e.sortable,B=e.stackable,q=e.striped,F=e.structured,L=e.tableData,M=e.textAlign,U=e.unstackable,z=e.verticalAlign,I=i()("ui",f,H,Object(u.a)(n,"celled"),Object(u.a)(s,"collapsing"),Object(u.a)(v,"definition"),Object(u.a)(E,"fixed"),Object(u.a)(w,"inverted"),Object(u.a)(D,"selectable"),Object(u.a)(R,"single line"),Object(u.a)(S,"sortable"),Object(u.a)(B,"stackable"),Object(u.a)(q,"striped"),Object(u.a)(F,"structured"),Object(u.a)(U,"unstackable"),Object(u.b)(t,"attached"),Object(u.b)(a,"basic"),Object(u.b)(y,"compact"),Object(u.b)(x,"padded"),Object(u.d)(M),Object(u.f)(z),Object(u.g)(g,"column"),"table",o),W=Object(m.a)(P,e),V=Object(p.a)(P,e);if(!b.a.isNil(c))return d.a.createElement(V,r()({},W,{className:I}),c);var J={defaultProps:{cellAs:"th"}},Y=(k||C)&&d.a.createElement(O,null,A.create(k,J),l()(C,function(e){return A.create(e,J)}));return d.a.createElement(V,r()({},W,{className:I}),Y,d.a.createElement(h,null,T&&l()(L,function(e,t){return A.create(T(e,t))})),j&&d.a.createElement(N,null,A.create(j)))}P.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],P.defaultProps={as:"table"},P.propTypes={},P.Body=h,P.Cell=E,P.Footer=N,P.Header=O,P.HeaderCell=w,P.Row=A;t.a=P},251:function(e,t,a){"use strict";var n=a(75),r=a.n(n),c=(a(155),a(199)),l=a.n(c),o=a(153),i=a.n(o),s=(a(4),a(0)),d=a.n(s),u=a(256),m=a(257),p=a(152),b=a(173),f=a.n(b),h=a(166),g=a.n(h),y=a(258),v=a(221);function E(e){var t=e.children,a=e.className,n=e.content,c=e.icon,l=i()("divider",a),o=Object(u.a)(E,e),s=Object(m.a)(E,e);return g()(c)?g()(n)?d.a.createElement(s,r()({},o,{className:l}),p.a.isNil(t)?"/":t):d.a.createElement(s,r()({},o,{className:l}),n):v.a.create(c,{defaultProps:f()({},o,{className:l}),autoGenerateKey:!1})}E.handledProps=["as","children","className","content","icon"],E.propTypes={},E.create=Object(y.c)(E,function(e){return{icon:e}});var j=E,O=a(156),k=a.n(O),N=a(157),C=a.n(N),w=a(158),x=a.n(w),A=a(154),P=a.n(A),T=a(35),D=a.n(T),R=a(159),H=a.n(R),S=a(34),B=a.n(S),q=a(162),F=a.n(q),L=a(180),M=function(e){function t(){var e,a;k()(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return a=x()(this,(e=P()(t)).call.apply(e,[this].concat(r))),B()(D()(a),"computeElementType",function(){var e=a.props,t=e.link,n=e.onClick;if(t||n)return"a"}),B()(D()(a),"handleClick",function(e){return F()(a.props,"onClick",e,a.props)}),a}return H()(t,e),C()(t,[{key:"render",value:function(){var e=this.props,a=e.active,n=e.children,c=e.className,l=e.content,o=e.href,s=i()(Object(L.a)(a,"active"),"section",c),b=Object(u.a)(t,this.props),f=Object(m.a)(t,this.props,this.computeElementType);return d.a.createElement(f,r()({},b,{className:s,href:o,onClick:this.handleClick}),p.a.isNil(n)?l:n)}}]),t}(s.Component);function U(e){var t=e.children,a=e.className,n=e.divider,c=e.icon,o=e.sections,s=e.size,b=i()("ui",s,"breadcrumb",a),f=Object(u.a)(U,e),h=Object(m.a)(U,e);if(!p.a.isNil(t))return d.a.createElement(h,r()({},f,{className:b}),t);var g=[];return l()(o,function(e,t){var a=M.create(e);if(g.push(a),t!==o.length-1){var r="".concat(a.key,"_divider")||!1;g.push(j.create({content:n,icon:c,key:r}))}}),d.a.createElement(h,r()({},f,{className:b}),g)}B()(M,"handledProps",["active","as","children","className","content","href","link","onClick"]),M.propTypes={},M.create=Object(y.c)(M,function(e){return{content:e,link:!0}}),U.handledProps=["as","children","className","divider","icon","sections","size"],U.propTypes={},U.Divider=j,U.Section=M;t.a=U}}]);
//# sourceMappingURL=component---src-pages-table-js-941142e36d18a3e40bfc.js.map