(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{715:function(e,t,a){"use strict";a.r(t);var s=a(1),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"migrating-from-ibc-go-v1-to-v2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#migrating-from-ibc-go-v1-to-v2"}},[e._v("#")]),e._v(" Migrating from ibc-go v1 to v2")]),e._v(" "),a("p",[e._v("This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.\nAny changes that must be done by a user of ibc-go should be documented here.")]),e._v(" "),a("p",[e._v("There are four sections based on the four potential user groups of this document:")]),e._v(" "),a("ul",[a("li",[e._v("Chains")]),e._v(" "),a("li",[e._v("IBC Apps")]),e._v(" "),a("li",[e._v("Relayers")]),e._v(" "),a("li",[e._v("IBC Light Clients")])]),e._v(" "),a("p",[a("strong",[e._v("Note:")]),e._v(" ibc-go supports golang semantic versioning and therefore all imports must be updated to bump the version number on major releases.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Z2l0aHViLmNvbS9jb3Ntb3MvaWJjLWdvIC0mZ3Q7IGdpdGh1Yi5jb20vY29zbW9zL2liYy1nby92Mgo="}}),e._v(" "),a("h2",{attrs:{id:"chains"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chains"}},[e._v("#")]),e._v(" Chains")]),e._v(" "),a("ul",[a("li",[e._v("No relevant changes were made in this release.")])]),e._v(" "),a("h2",{attrs:{id:"ibc-apps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ibc-apps"}},[e._v("#")]),e._v(" IBC Apps")]),e._v(" "),a("p",[e._v("A new function has been added to the app module interface:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gTmVnb3RpYXRlQXBwVmVyc2lvbiBwZXJmb3JtcyBhcHBsaWNhdGlvbiB2ZXJzaW9uIG5lZ290aWF0aW9uIGdpdmVuIHRoZSBwcm92aWRlZCBjaGFubmVsIG9yZGVyaW5nLCBjb25uZWN0aW9uSUQsIHBvcnRJRCwgY291bnRlcnBhcnR5IGFuZCBwcm9wb3NlZCB2ZXJzaW9uLgovLyBBbiBlcnJvciBpcyByZXR1cm5lZCBpZiB2ZXJzaW9uIG5lZ290aWF0aW9uIGNhbm5vdCBiZSBwZXJmb3JtZWQuIEZvciBleGFtcGxlLCBhbiBhcHBsaWNhdGlvbiBtb2R1bGUgaW1wbGVtZW50aW5nIHRoaXMgaW50ZXJmYWNlCi8vIG1heSBkZWNpZGUgdG8gcmV0dXJuIGFuIGVycm9yIGluIHRoZSBldmVudCBvZiB0aGUgcHJvcG9zZWQgdmVyc2lvbiBiZWluZyBpbmNvbXBhdGlibGUgd2l0aCBpdCdzIG93bgpOZWdvdGlhdGVBcHBWZXJzaW9uKAogIGN0eCBzZGsuQ29udGV4dCwKICBvcmRlciBjaGFubmVsdHlwZXMuT3JkZXIsCiAgY29ubmVjdGlvbklEIHN0cmluZywKICBwb3J0SUQgc3RyaW5nLAogIGNvdW50ZXJwYXJ0eSBjaGFubmVsdHlwZXMuQ291bnRlcnBhcnR5LAogIHByb3Bvc2VkVmVyc2lvbiBzdHJpbmcsCikgKHZlcnNpb24gc3RyaW5nLCBlcnIgZXJyb3IpCg=="}}),e._v(" "),a("p",[e._v("This function should perform application version negotiation and return the negotiated version. If the version cannot be negotiated, an error should be returned. This function is only used on the client side.")]),e._v(" "),a("h3",{attrs:{id:"sdk-result-removed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sdk-result-removed"}},[e._v("#")]),e._v(" "),a("code",[e._v("sdk.Result")]),e._v(" removed")]),e._v(" "),a("p",[a("code",[e._v("sdk.Result")]),e._v(" has been removed as a return value in the application callbacks. Previously it was being discarded by core IBC and was thus unused.")]),e._v(" "),a("h2",{attrs:{id:"relayers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#relayers"}},[e._v("#")]),e._v(" Relayers")]),e._v(" "),a("p",[e._v("A new gRPC has been added to 05-port, "),a("code",[e._v("AppVersion")]),e._v(". It returns the negotiated app version. This function should be used for the "),a("code",[e._v("ChanOpenTry")]),e._v(" channel handshake step to decide upon the application version which should be set in the channel.")]),e._v(" "),a("h2",{attrs:{id:"ibc-light-clients"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ibc-light-clients"}},[e._v("#")]),e._v(" IBC Light Clients")]),e._v(" "),a("ul",[a("li",[e._v("No relevant changes were made in this release.")])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);