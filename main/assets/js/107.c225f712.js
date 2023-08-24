(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{730:function(e,t,o){"use strict";o.r(t);var a=o(1),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"ibc-applications"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#ibc-applications"}},[e._v("#")]),e._v(" IBC Applications")]),e._v(" "),o("p",{attrs:{synopsis:""}},[e._v("Learn how to build custom IBC application modules that enable packets to be sent to and received from other IBC-enabled chains.")]),e._v(" "),o("p",[e._v("This document serves as a guide for developers who want to write their own Inter-blockchain Communication Protocol (IBC) applications for custom use cases.")]),e._v(" "),o("p",[e._v("Due to the modular design of the IBC protocol, IBC application developers do not need to concern themselves with the low-level details of clients, connections, and proof verification. Nevertheless, an overview of these low-level concepts can be found in "),o("RouterLink",{attrs:{to:"/ibc/overview.html"}},[e._v("the Overview section")]),e._v(".\nThe document goes into detail on the abstraction layer most relevant for application developers (channels and ports), and describes how to define your own custom packets, "),o("code",[e._v("IBCModule")]),e._v(" callbacks and more to make an application module IBC ready.")],1),e._v(" "),o("p",[o("strong",[e._v("To have your module interact over IBC you must:")])]),e._v(" "),o("ul",[o("li",[e._v("implement the "),o("code",[e._v("IBCModule")]),e._v(" interface, i.e.:\n"),o("ul",[o("li",[e._v("channel (opening) handshake callbacks")]),e._v(" "),o("li",[e._v("channel closing handshake callbacks")]),e._v(" "),o("li",[e._v("packet callbacks")])])]),e._v(" "),o("li",[e._v("bind to a port(s)")]),e._v(" "),o("li",[e._v("add keeper methods")]),e._v(" "),o("li",[e._v("define your own packet data and acknowledgement structs as well as how to encode/decode them")]),e._v(" "),o("li",[e._v("add a route to the IBC router")])]),e._v(" "),o("p",[e._v("The following sections provide a more detailed explanation of how to write an IBC application\nmodule correctly corresponding to the listed steps.")]),e._v(" "),o("h2",{attrs:{id:"pre-requisites-readings"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisites-readings"}},[e._v("#")]),e._v(" Pre-requisites Readings")]),e._v(" "),o("ul",[o("li",{attrs:{prereq:""}},[o("RouterLink",{attrs:{to:"/ibc/overview.html"}},[e._v("IBC Overview")]),e._v(")")],1),e._v(" "),o("li",{attrs:{prereq:""}},[o("RouterLink",{attrs:{to:"/ibc/integration.html"}},[e._v("IBC default integration")])],1)]),e._v(" "),o("h2",{attrs:{id:"working-example"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#working-example"}},[e._v("#")]),e._v(" Working example")]),e._v(" "),o("p",[e._v("For a real working example of an IBC application, you can look through the "),o("code",[e._v("ibc-transfer")]),e._v(" module\nwhich implements everything discussed in this section.")]),e._v(" "),o("p",[e._v("Here are the useful parts of the module to look at:")]),e._v(" "),o("p",[o("a",{attrs:{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/keeper/genesis.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Binding to transfer\nport"),o("OutboundLink")],1)]),e._v(" "),o("p",[o("a",{attrs:{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/keeper/relay.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sending transfer\npackets"),o("OutboundLink")],1)]),e._v(" "),o("p",[o("a",{attrs:{href:"https://github.com/cosmos/ibc-go/blob/main/modules/apps/transfer/ibc_module.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Implementing IBC\ncallbacks"),o("OutboundLink")],1)]),e._v(" "),o("h2",{attrs:{hide:"",id:"next"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#next"}},[e._v("#")]),e._v(" Next")]),e._v(" "),o("p",{attrs:{hide:""}},[e._v("Learn about "),o("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/building-modules/01-intro.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("building modules"),o("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);