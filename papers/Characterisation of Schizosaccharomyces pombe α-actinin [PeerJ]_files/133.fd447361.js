(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{DG6X:function(e,i,t){"use strict";t.r(i);var n=function(){var e=this,i=e._self._c;return i("div",[i("v-menu",{attrs:{bottom:"",left:"","close-on-content-click":!1,"offset-y":!0,"max-height":e.maxHeight,"z-index":"20000"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[i("v-btn",e._g(e._b({attrs:{text:""}},"v-btn",o,!1),n),[e._v("\n        Journals "),i("v-icon",{attrs:{right:"",dark:""}},[e._v("\n        mdi-chevron-down\n      ")])],1)]}}])},[e._v(" "),i("v-card",{staticClass:"mx-auto pa-4 hideDark",attrs:{elevation:"0"}},[i("v-row",[i("v-col",{attrs:{cols:"12",sm:"4"}},[i("v-list",{staticClass:"journals-list",attrs:{subheader:""}},[i("div",{staticClass:"overline pl-5"},[e._v("Journals")]),e._v(" "),e._l(e.visibleJournals,(function(e){return i("Item",{key:e.text,attrs:{item:e}})})),e._v(" "),i("div",{staticClass:"overline pl-5 pt-2"},[e._v("Hubs")]),e._v(" "),i("v-list-item",{staticClass:"pl-6",attrs:{"three-line":"",href:"/hubs/iabo"}},[i("v-list-item-icon",[i("v-img",{attrs:{src:e.imagePrefix+e.hubImagePath,width:"24"}})],1),e._v(" "),i("v-list-item-content",[i("v-list-item-title",[e._v("\n                  IABO Hub\n                ")]),e._v(" "),i("v-card-subtitle",{staticClass:"pl-0 pt-1"},[e._v("\n                  International Association for Biological Oceanography publications")])],1)],1)],2)],1),e._v(" "),i("v-col",{attrs:{cols:"12",sm:"4"}},[i("div",{staticClass:"overline pl-5 pb-3"},[e._v("Sections")]),e._v(" "),i("v-row",[i("v-col",{staticClass:"pt-0",attrs:{cols:"12"}},[i("v-list",{attrs:{subheader:"",dense:""}},e._l(e.sections,(function(e){return i("Item",{key:e.text,attrs:{item:e}})})),1)],1)],1)],1),e._v(" "),i("v-col",{attrs:{cols:"12",sm:"4"}},[i("div",{staticClass:"overline pl-5"},[e._v("Curated publications")]),e._v(" "),i("v-list",{attrs:{subheader:"",dense:""}},e._l(e.collections,(function(e){return i("Item",{key:e.text,attrs:{item:e}})})),1),e._v(" "),i("v-list",{staticClass:"mb-4",attrs:{subheader:"",dense:""}},[i("div",{staticClass:"overline pl-5"},[e._v("Table of Contents")]),e._v(" "),e._l(e.tableOfContents,(function(e){return i("Item",{key:e.text,attrs:{item:e}})}))],2),e._v(" "),i("v-list",{attrs:{subheader:"",dense:""}},[i("div",{staticClass:"overline pl-5"},[e._v("Overview")]),e._v(" "),e._l(e.overview,(function(e){return i("Item",{key:e.text,attrs:{item:e}})}))],2)],1)],1)],1)],1)],1)};n._withStripped=!0;var o=t("/Twz"),r=t("j4Ki"),s={name:"JournalsNavigationLinks",components:{Item:o.default},props:{maxHeight:{type:String,required:!1,default:function(){return"100vh"}}},computed:{visibleJournals:function(){var e=Date.now();return this.journals.filter((function(i){return!i.showAt||e>i.showAt}))}},data:function(){return{journals:r.b.journals,collections:r.b.collections,tableOfContents:r.b.tableOfContents,sections:r.b.sections,overview:r.b.overview,hubs:[{title:"IABO Hub",subtitle:"International Association for Biological Oceanography publications.",_self:!0,href:"/hubs/iabo",icon:"mdi-jellyfish",iconColor:"cyan darken-1"}]}}},l=(t("n8QH"),t("KHd+")),a=t("ZUTo"),c=t.n(a),d=t("gzZi"),f=t("sK+t"),m=t("mdmw"),u=t("Yq0q"),p=t("Ey0z"),h=t("rdoz"),y=t("iGBT"),k=t("2hOt"),b=t("XSMC"),v=t("NMP6"),g=t("5Emp"),_=t("D9m0"),C=Object(l.a)(s,n,[],!1,null,null,null);i.default=C.exports;c()(C,{VBtn:d.a,VCard:f.a,VCardSubtitle:m.b,VCol:u.a,VIcon:p.a,VImg:h.a,VList:y.a,VListItem:k.a,VListItemContent:b.a,VListItemIcon:v.a,VListItemTitle:b.c,VMenu:g.a,VRow:_.a})},OloM:function(e,i,t){},j4Ki:function(e,i,t){"use strict";t.d(i,"d",(function(){return n})),t.d(i,"e",(function(){return o})),t.d(i,"b",(function(){return r})),t.d(i,"c",(function(){return s})),t.d(i,"a",(function(){return l}));var n=[{title:"Staff Q&A search",icon:"mdi-account-search",href:"/questions/staff/",_self:!0,clickFunction:"toggleStaffQASearchDrawer"},{title:"Ask staff",icon:"mdi-comment-question",href:"/ask/staff/",_self:!0}],o=[{title:"Staff tools",icon:"mdi-wrench",group:"tools",children:[{title:"Editor Community",group:"tools/edcommunity",children:[{key:"edcommunnity-invite",title:"Invited/Create editors",icon:"mdi-account-multiple-plus",href:"/notification/role/list/editors/",_self:!0}]},{title:"Submission lists",group:"tools/submissions",children:[{key:"submissions-check",title:"Check",icon:"mdi-format-list-checks",href:"/submissions/?status=check",_self:!0},{key:"submissions-editor",title:"Editor needed",icon:"mdi-account-alert",href:"/submissions/?status=review_editor",_self:!0},{key:"submissions-new",title:"Review (new)",icon:"mdi-file-outline",href:"/submissions/?status=review_new",_self:!0},{key:"submissions-revised",title:"Review (revised)",icon:"mdi-file-document",href:"/submissions/?status=review_revised",_self:!0},{key:"submissions-accepted",title:"Accepted",icon:"mdi-file-check",href:"/submissions/?status=accepted",_self:!0}]},{title:"Production lists",group:"tools/production",children:[{key:"production-list",title:"Production",icon:"mdi-playlist-check",href:"/production/",_self:!0},{key:"pre-production-list",title:"Pre-production",icon:"mdi-calendar-clock",href:"/production/?status=preproduction",_self:!0},{key:"production-ready",title:"Ready to publish",icon:"mdi-publish",href:"/production/?status=accepted&label=ready-to-publish&order=desc",_self:!0},{key:"production-typesetter-forum",title:"Typesetter forum",icon:"mdi-printer",href:"/forum/publications/",_self:!0},{key:"production-preprints",title:"Preprints",icon:"mdi-file-outline",href:"/preprints-production/",_self:!0}]},{title:"Staff",group:"tools/staff",children:[{key:"staff-checker-dashboard",title:"Checker dashboard",icon:"mdi-view-dashboard",href:"/checker/",_self:!0},{key:"staff-activity-dashboard",title:"Activity dashboard",icon:"mdi-format-list-bulleted-type",href:"/activity-dashboard/",_self:!0},{key:"staff-feedback-dashboard",title:"Feedback moderation",icon:"mdi-comment-check-outline",href:"/staff/moderation/",_self:!0},{key:"staff-collections",title:"Collections",icon:"mdi-archive",href:"/collections/",_self:!0},{key:"staff-collections-admin",title:"Collections Admin",icon:"mdi-pencil-box-multiple-outline",href:"/collections/admin",_self:!0},{key:"staff-bounce-mgmt",title:"Bounce management",icon:"mdi-email-alert",href:"/staff/email-delivery/bounce-mgmt/",_self:!0},{key:"staff-pdf-gen",title:"PDF Generation",icon:"mdi-file-pdf",href:"/staff/pdf-generation-admin/",_self:!0},{key:"staff-editor-papers",title:"Editor paper list",icon:"mdi-format-line-weight",href:"/staff/editor-papers/",_self:!0},{key:"staff-unsubscribe",title:"Unsubscribe",icon:"mdi-account-remove",href:"/staff/unsubscribe/",_self:!0},{key:"staff-discounts",title:"Discount codes",icon:"mdi-currency-usd-off",href:"/campaigns/discounts/",_self:!0},{key:"staff-section-commentary",title:"Section commentary",icon:"mdi-comment-check-outline",href:"/sections/commentary/admin/",_self:!0},{key:"staff-user-search",title:"User search",icon:"mdi-account-search",href:"/staff/find/user/",_self:!0},{key:"staff-user-spam",title:"Curate spam accounts",icon:"mdi-account-cancel",href:"/admin/spam",_self:!0}]},{title:"Business",group:"tools/business",children:[{key:"business-faq",title:"Add public help FAQ",icon:"mdi-comment-question",href:"/ask/faq/",_self:!0},{key:"business-expertrxiv",title:"Edit jobs & collaboration listings",icon:"mdi-briefcase-check",href:"/expertrxiv/admin/",_self:!0},{key:"business-conferences",title:"Conference campaigns",icon:"mdi-airplane-takeoff",href:"/staff/conferences/",_self:!0},{key:"business-mailing",title:"User marketing mailing",icon:"mdi-television-guide",href:"/marketing/authors/",_self:!0},{key:"business-analytics",title:"Analytics dashboard",icon:"mdi-google-analytics",href:"/business-analytics/",_self:!0},{key:"business-newsletter",title:"Send newsletter",icon:"mdi-email-variant",href:"/notify-newsletter/",_self:!0},{key:"business-user-export",title:"User export",icon:"mdi-export",href:"/export/user/",_self:!0},{key:"business-production",title:"Accepted articles",icon:"mdi-file-check",href:"/production/",_self:!0}]},{title:"Admin",group:"tools/admin",children:[{key:"admin-edit-checks",title:"Edit checks",icon:"mdi-table-edit",href:"/admin/checks/",_self:!0},{key:"admin-edit-presets",title:"Edit preset responses",icon:"mdi-format-page-break",href:"/staff/presets/",_self:!0},{key:"admin-invite-editors",title:"Invited/Create editors",icon:"mdi-account-multiple-plus",href:"/notification/role/list/editors/",_self:!0},{key:"admin-institutions",title:"Institutional dashboards",icon:"mdi-school-outline",href:"/institutions/staff-index/",_self:!0},{key:"admin-edit-institutions",title:"Curate institutions",icon:"mdi-checkbox-marked-outline",href:"/admin/institutions/",_self:!0},{key:"admin-featured",title:"Featured articles",icon:"mdi-camera-burst",href:"/featured/",_self:!0},{key:"admin-press",title:"Press Release",icon:"mdi-bullhorn",href:"/marketing/press/",_self:!0},{key:"admin-search-indexes",title:"Search Indexes",icon:"mdi-find-replace",href:"/admin/search/index/",_self:!0},{key:"admin-payments",title:"View/Create Payment",icon:"mdi-currency-btc",href:"/checkout/staff/",_self:!0},{key:"admin-edit-ms-types",title:"Edit Manuscript types",icon:"mdi-shuffle-variant",href:"/staff/manuscript-types/",_self:!0},{key:"admin-gdpr",title:"GDPR compliance",icon:"mdi-check-all",href:"/gdpr/",_self:!0}]},{title:"DevOps",group:"tools/devops",children:[{key:"devops-bounce",title:"Bounce management",icon:"mdi-email-alert",href:"/staff/email-delivery/bounce-mgmt/",_self:!0},{key:"devops-pdf-gen",title:"PDF generation",icon:"mdi-file-pdf",href:"/staff/pdf-generation-admin/",_self:!0},{key:"devops-search-indexes",title:"Search indexes",icon:"mdi-find-replace",href:"/admin/search/index/",_self:!0},{key:"devops-ips",title:"Add institution IPs",icon:"mdi-database-plus",href:"/admin/addip/institutions/",_self:!0},{key:"devops-user-merge",title:"Merge user accounts",icon:"mdi-account-switch",href:"/admin/mergeuser",_self:!0},{key:"devops-user-spam",title:"Curate spam accounts",icon:"mdi-account-cancel",href:"/admin/spam",_self:!0},{key:"devops-user-spam-advanced",title:"Curate spam accounts (list)",icon:"mdi-account-cancel",href:"/admin/spam/list",_self:!0},{key:"devops-edit-receipt",title:"Edit receipt address",icon:"mdi-receipt",href:"/admin/receipt/",_self:!0},{key:"devops-remove-editor",title:"Remove AE",icon:"mdi-account-minus",href:"/admin/editor/remove",_self:!0},{key:"devops-varnish-cache",title:"Varnish cache",icon:"mdi-cached",href:"/ops/cache/index/",_self:!0}]}]}],r={journals:[{type:"link",title:"Open Advances - new series",subtitle:"Addressing the world's biggest challenges",_self:!0,href:"/open-advances",icon:"mdi-lock-open-outline",iconColor:"primary",showAt:Date.UTC(2023,5,13,13,0,0)},{type:"link",title:"PeerJ",subtitle:"Multidisciplinary: Life, Environment, Medicine",_self:!0,href:"/life-environment/",icon:"mdi-dna",iconColor:"primary"},{type:"link",title:"PeerJ Computer Science",subtitle:"Multidisciplinary: AI, quantum, robotics, etc",_self:!0,href:"/computer-science/",icon:"mdi-cube-send",iconColor:"primary"},{type:"link",title:"PeerJ Analytical Chemistry",_self:!0,href:"/analytical-chemistry/",icon:"mdi-scale-balance",iconColor:"primary"},{type:"link",title:"PeerJ Inorganic Chemistry",_self:!0,href:"/inorganic-chemistry/",icon:"mdi-beaker-outline",iconColor:"primary"},{type:"link",title:"PeerJ Materials Science",_self:!0,href:"/materials-science/",icon:"mdi-diamond-stone",iconColor:"primary"},{type:"link",title:"PeerJ Organic Chemistry",_self:!0,href:"/organic-chemistry/",icon:"mdi-molecule",iconColor:"primary"},{type:"link",title:"PeerJ Physical Chemistry",_self:!0,href:"/physical-chemistry/",icon:"mdi-atom",iconColor:"primary"}],collections:[{type:"link",title:"Collections",_self:!0,href:"/collections/",icon:"mdi-folder-open-outline",iconColor:"green darken-1"},{type:"link",title:"Special Issues",_self:!0,href:"/special-issues/",icon:"mdi-file-certificate-outline",iconColor:"green darken-1"}],tableOfContents:[{type:"link",title:"PeerJ - medicine articles",_self:!0,href:"/medicine/",icon:"mdi-heart-pulse",iconColor:"orange darken-1"},{type:"link",title:"PeerJ - biology & life science articles",_self:!0,href:"/biology",icon:"mdi-test-tube",iconColor:"orange darken-1"},{type:"link",title:"PeerJ - environmental science articles",_self:!0,href:"/environment",icon:"mdi-earth",iconColor:"orange darken-1"},{type:"link",title:"PeerJ - general bio",subtitle:"Stats, legal, policy, and education",_self:!0,href:"/general",icon:"mdi-library",iconColor:"orange darken-1"},{type:"link",title:"PeerJ Computer Science",_self:!0,href:"/cs",icon:"mdi-cube-send",iconColor:"orange darken-1"},{type:"link",title:"Preprints",subtitle:"No longer offered",_self:!0,href:"/preprints-toc",icon:"mdi-pencil",iconColor:"orange darken-1"}],sections:[{type:"link",title:"Aquatic biology",_self:!0,href:"/sections/aquatic-biology/",icon:"mdi-jellyfish-outline",iconColor:"secondary darken-1"},{type:"link",title:"Biochemistry, biophysics and molecular biology",_self:!0,href:"/sections/biochemistry-biophysics-molecular-biology/",icon:"mdi-flask-outline",iconColor:"secondary darken-1"},{type:"link",title:"Biodiversity and conservation",_self:!0,href:"/sections/biodiversity-conservation/",icon:"mdi-bee-flower",iconColor:"secondary darken-1"},{type:"link",title:"Bioinformatics and genomics",_self:!0,href:"/sections/bioinformatics-genomics/",icon:"mdi-chart-timeline",iconColor:"secondary darken-1"},{type:"link",title:"Brain, Cognition and Mental Health",_self:!0,href:"/sections/brain-cognition/",icon:"mdi-brain",iconColor:"secondary darken-1"},{type:"link",title:"Cardiovascular and metabolic disorders",_self:!0,href:"/sections/cardiovascular-and-metabolic-disorders/",icon:"mdi-heart-pulse",iconColor:"secondary darken-1"},{type:"link",title:"Ecology",_self:!0,href:"/sections/ecology/",icon:"mdi-chart-bubble",iconColor:"secondary darken-1"},{type:"link",title:"Environmental science",_self:!0,href:"/sections/environ-sci/",icon:"mdi-molecule-co2",iconColor:"secondary darken-1"},{type:"link",title:"Global health",_self:!0,href:"/sections/global-health/",icon:"mdi-pulse",iconColor:"secondary darken-1"},{type:"link",title:"Microbiology",_self:!0,href:"/sections/microbiology/",icon:"mdi-virus-outline",iconColor:"secondary darken-1"},{type:"link",title:"Paleontology and evolutionary science",_self:!0,href:"/sections/paleontology-evolutionary-science/",icon:"mdi-google-downasaur",iconColor:"secondary darken-1"},{type:"link",title:"Plant biology",_self:!0,href:"/sections/plant-biology/",icon:"mdi-flower",iconColor:"secondary darken-1"},{type:"link",title:"Sports Medicine and Rehabilitation",_self:!0,href:"/sections/sports-medicine-and-rehabilitation/",icon:"mdi-run-fast",iconColor:"secondary darken-1"},{type:"link",title:"Zoological science",_self:!0,href:"/sections/zoological-science/",icon:"mdi-owl",iconColor:"secondary darken-1"},{type:"link",title:"Algorithms, Software & Theory",_self:!0,href:"/sections/algorithms-software-and-theory/",icon:"mdi-console",iconColor:"green darken-1"},{type:"link",title:"Artificial Intelligence, Computer Vision & Natural Language Processing",_self:!0,href:"/sections/artificial-intelligence/",icon:"mdi-robot",iconColor:"green darken-1"},{type:"link",title:"Cryptography, Security & Privacy",_self:!0,href:"/sections/cryptography-security-and-privacy/",icon:"mdi-lock",iconColor:"green darken-1"},{type:"link",title:"Data Handling & Mining",_self:!0,href:"/sections/data-handling-and-mining/",icon:"mdi-database",iconColor:"green darken-1"},{type:"link",title:"Human-Computer Interaction",_self:!0,href:"/sections/human-computer-interaction/",icon:"mdi-human",iconColor:"green darken-1"},{type:"link",title:"Systems, Networks & Communication",_self:!0,href:"/sections/systems-networks-and-communication/",icon:"mdi-signal-cellular-3",iconColor:"green darken-1"}],overview:[{type:"link",title:"10 years of publishing",_self:!0,href:"/benefits/peerj-timeline/",icon:"mdi-timeline-text-outline",iconColor:""},{type:"link",title:"What we publish",_self:!0,href:"/about/publications/",icon:"mdi-file-document-outline",iconColor:""},{type:"link",title:"All subject areas",_self:!0,href:"/subjects/",icon:"mdi-tag-multiple-outline",iconColor:""}]},s={information:[{type:"link",title:"Manuscript guidelines",_self:!0,href:"/about/author-instructions/",icon:"mdi-text-box-check-outline",iconColor:"primary"},{type:"link",title:"Editorial board",_self:!0,href:"/academic-boards/",icon:"mdi-account-group-outline",iconColor:"primary"},{type:"link",title:"Open Access fees",_self:!0,href:"/pricing/",icon:"mdi-lock-open-outline",iconColor:"primary"},{type:"link",title:"Memberships vs APCs",_self:!0,href:"/pricing/#apc-membership-pricing",icon:"mdi-account-cash-outline",iconColor:"primary"},{type:"link",title:"Check if your institution has prepaid",_self:!0,href:"/prepaid-publishing/",icon:"mdi-office-building",iconColor:"primary"},{type:"link",title:"Help & FAQs",_self:!0,href:"/help/",icon:"mdi-help-network",iconColor:"primary"}],solutions:[{type:"link",title:"Fast publishing",subtitle:"30 days to first decision (median)",_self:!0,href:"/benefits/fast-publishing",icon:"mdi-av-timer",iconColor:"secondary darken-1"},{type:"link",title:"Indexing and Impact Factor",subtitle:"Indexed in all major Abstracting & Indexing databases",_self:!0,href:"/benefits/indexing-and-impact-factor",icon:"mdi-database-plus",iconColor:"secondary darken-1"},{type:"link",title:"High quality peer review",subtitle:"Traditional peer review updated for the 21st century",_self:!0,href:"/benefits/peer-review-timeline",icon:"mdi-file-account",iconColor:"secondary darken-1"},{type:"link",title:"Global readership",subtitle:"1M monthly readers",_self:!0,href:"/benefits/broad-audience",icon:"mdi-earth",iconColor:"secondary darken-1"},{type:"link",title:"Journal comparison",subtitle:"Feature comparison between PeerJ and other leading journals",_self:!0,href:"/benefits/peerj-feature-comparison/#submission",icon:"mdi-select-compare",iconColor:"secondary darken-1"},{type:"link",title:"View more benefits",_self:!0,href:"/benefits/",icon:"mdi-more",iconColor:"secondary darken-1"}]},l={institutions:[{type:"link",title:"Institutional plans",_self:!0,href:"/pricing/institutions/",icon:"mdi-office-building",iconColor:"primary"},{type:"link",title:"Prepaid institution search",_self:!0,href:"/prepaid-publishing/",icon:"mdi-feature-search-outline",iconColor:"primary"},{type:"link",title:"Case study: Carnegie Mellon University",subtitle:"Read the case study of why CMU joined PeerJ",_self:!0,href:"/institutions/case-studies/16/carnegie-mellon-university/",icon:"mdi-file-document-outline",iconColor:"primary"},{type:"link",title:"Case study: Oregon State University",subtitle:"Oregon State University wanted its researchers to publish their articles at a low cost per author",_self:!0,href:"/institutions/case-studies/19/oregon-state-university/",icon:"mdi-file-document-outline",iconColor:"primary"}],expertrxiv:[{type:"link",title:"Research listings",subtitle:"Jobs, Collaborations, and tasks",_self:!0,href:"/expertrxiv",icon:"mdi-microscope",iconColor:"secondary darken-1",badgeIcon:"mdi-account-multiple",badgeColor:"secondary darken-1",badgeOverlap:!0,badgeOffsetX:"3"},{type:"link",title:"Post a new job or collaboration",_self:!0,href:"/expertrxiv/post",icon:"mdi-briefcase-edit-outline",iconColor:"secondary darken-1"},{type:"link",title:"Latest researcher questions & answers",_self:!0,href:"/questions/?faq=false",icon:"mdi-comment-question-outline",iconColor:"secondary darken-1"},{type:"link",title:"Ask a research question",_self:!0,href:"/ask",icon:"mdi-beaker-question",iconColor:"secondary darken-1"}],participate:[{type:"link",title:"Contributor Rewards",_self:!0,href:"/about/contributor-rewards",icon:"mdi-circle-multiple",iconColor:"orange darken-1"},{type:"link",title:"Volunteer to review",_self:!0,href:"/reviewer-match/register",icon:"mdi-human-handsup",iconColor:"orange darken-1"},{type:"link",title:"View abstracts available to review",_self:!0,href:"/reviewer-match",icon:"mdi-file-find",iconColor:"orange darken-1"},{type:"link",title:"Join Editorial Board",_self:!0,href:"/about/join-editorial-board",icon:"mdi-account-group",iconColor:"orange darken-1"},{type:"link",title:"Resources to spread the word",_self:!0,href:"/spread-the-word/",icon:"mdi-bullhorn",iconColor:"orange darken-1"},{type:"link",title:"Contact us",_self:!0,href:"/about/contact/",icon:"mdi-email",iconColor:"orange darken-1"}],solutions:[{type:"link",title:"Reputation",_self:!0,href:"/benefits/reputation",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"High quality peer review",_self:!0,href:"/benefits/peer-review-timeline",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Fast publishing",_self:!0,href:"/benefits/fast-publishing",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Indexing and Impact Factor",_self:!0,href:"/benefits/indexing-and-impact-factor",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Global readership",_self:!0,href:"/benefits/broad-audience",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Feature comparison",_self:!0,href:"/benefits/peerj-feature-comparison",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Reduced cost publishing",_self:!0,href:"/benefits/reduced-cost-publishing",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Author feedback",_self:!0,href:"/benefits/reduced-cost-publishing",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Early career researcher benefits",_self:!0,href:"/benefits/early-career-researchers",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Senior researcher benefits",_self:!0,href:"/benefits/senior-researchers",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Open review (optional)",_self:!0,href:"/benefits/review-history-and-peer-review",icon:"mdi-av-timer",iconColor:"orange"},{type:"link",title:"Writing a rebuttal/response letter",_self:!0,href:"/benefits/academic-rebuttal-letters",icon:"mdi-av-timer",iconColor:"orange"}]}},n8QH:function(e,i,t){"use strict";t("OloM")}}]);