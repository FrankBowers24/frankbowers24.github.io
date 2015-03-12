var d3,LabeledPie,topojson,annyang,window,incomePie=new LabeledPie(".tip-info"),statLabels={main:["Income","Race/Ethnicity"],race:["All","Latino","White","African American","Native American","Asian","Pacific Islander","Other Race","Mixed Race"],asian:["All","Asian Indian","Bangladeshi","Cambodian","Mainland Chinese","Filipino","Hmong","Japanese","Korean","Laotian","Pakistani","Taiwanese","Thai","Vietnamese"],birth:["All","California","USA, not California","Foreign"],foreign:["All","Europe","Asia","Africa","Oceania","Latin America","Canada"],age:["All","Under 18","18 to 24","25 to 34","35 to 44","45 to 64","65 and over"],housing:["Single Family Homes","Condominiums"]},pieLabelConfig={income:{labels:["< $25K","$25K - $50K","$50K - $75K","$75K - $100K","$100K - $200K","> $200K"],domain:[0,1,2,3,4,5],range:["#a50026","#f46d43","#fee08b","#d9ef8b","#66bd63","#006837"]},race:{labels:statLabels.race.slice(1),domain:[0,1,2,3,4,5,6,7],range:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]},asian:{labels:statLabels.asian.slice(1),domain:[0,1,2,3,4,5,6,7,8,9,10,11,12],range:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928","#cccccc"]},birth:{labels:statLabels.birth.slice(1),domain:[0,1,2],range:["#1b9e77","#d95f02","#7570b3"]},foreign:{labels:statLabels.foreign.slice(1),domain:[1,2,3,4,5,6],range:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"]},age:{labels:statLabels.age.slice(1),domain:[0,1,2,3,4,5],range:["#a50026","#f46d43","#fee08b","#d9ef8b","#66bd63","#006837"]}},setPieLabels=function(e,t){d3.select(".tip-info").select("svg").remove(),incomePie=new LabeledPie(".tip-info");var a=d3.scale.ordinal().domain(e[t].domain).range(e[t].range);incomePie.setLabels(e[t].labels),incomePie.setColorScale(a),d3.select(".tooltip-overlay").classed("hidden",!0)},setLegendDescription=function(e,t){var a={income:"Percentage of income tax returns with AGI greater than $200,000",race:"Percentage of # race/ethnicity",asian:"Percentage of Asians listed as #",birth:"Percentage of # Born",foreign:"Percentage of Foreign Born from #",age:"Percentage of population age #",sfr:"Median Price of Single Family Homes ($1,000,000's)",condo:"Median Price of Condominiums ($1,000,000's)"},n={income:"IRS Data: AGI reported on 2012 income tax returns",race:"2010 Census: Race/Ethnicity",asian:"2013 ACS: National origin of Asians",birth:"2013 ACS: Place of birth",foreign:"2013 ACS:Regional origin of Foreign Born Population",age:"2013 American Community Survey: Age",sfr:"Zillow: January, 2015",condo:"Zillow: January, 2015"},i={sfr:"Median Price of Single Family Homes",condo:"Median Price of Condominiums"},o=a[e];o.indexOf("#")>=0&&(o=o.replace("#",statLabels[e][t])),d3.select(".legend-description").text(o),d3.select(".tip-description").text(n[e]),e in i&&d3.select(".tooltip-overlay-label").text(i[e])},createComboBoxes=function(){var e=statLabels.race.slice(1),t=d3.select("#race-list").selectAll("option").data(e);t.enter().append("option").attr("value",function(e,t){return t+1}).text(function(e){return e});var a=d3.select("#asian-list").selectAll("option").data(statLabels.asian);a.enter().append("option").attr("value",function(e,t){return t}).text(function(e){return e});var n=d3.select("#birth-list").selectAll("option").data(statLabels.birth.slice(1));n.enter().append("option").attr("value",function(e,t){return t+1}).text(function(e){return e});var i=d3.select("#foreign-list").selectAll("option").data(statLabels.foreign);i.enter().append("option").attr("value",function(e,t){return t}).text(function(e){return e});var o=d3.select("#age-list").selectAll("option").data(statLabels.age.slice(1));o.enter().append("option").attr("value",function(e,t){return t+1}).text(function(e){return e});var s=d3.select("#housing-list").selectAll("option").data(statLabels.housing);s.enter().append("option").attr("value",function(e,t){return t+1}).text(function(e){return e})};createComboBoxes();var createLegend=function(e,t,a){var n={percent:d3.format("%"),percentPointOne:d3.format("2.1%"),price:d3.format("1.1")};d3.select("#legend ul").remove();var i=d3.select("#legend").append("ul").attr("class","list-inline"),o=i.selectAll("li.key").data(e.range()),s=e.range()[e.range().length-1],l=e.invertExtent(s),c=l[0]<.1;o.enter().append("li").attr("class","key").style("border-top-color",String).text(function(a){var i,o=e.invertExtent(a);return i="sfr"===t||"condo"===t?(o[0]/1e6).toFixed(2):c?n.percentPointOne(o[0]):n.percent(o[0])}),setLegendDescription(t,a)},zipCodeMap=function(e,t){function a(e,t){var a=e.properties.GEOID10,n=t[a][L];return n?-1===S?+n[0]:+n[S]/+n[0]:null}function n(e){return e.properties.GEOID10+": "+e.properties.city}function i(e,t,a){a=a||t[e.properties.GEOID10][L];var n=a.slice(1);if(-1===S){d3.select(".tooltip-overlay").classed("hidden",!1),d3.select(".tip-description").classed("hidden",!1);var i=a[0]?"$"+a[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):a[0];d3.select(".tooltip-overlay-text").text(i?i:"No Data")}else+a[0]>0?(d3.select(".tip-info").classed("hidden",!1),d3.select(".tip-description").classed("hidden",!1),incomePie.change(n)):(d3.select(".tip-info").classed("hidden",!0),d3.select(".tip-description").classed("hidden",!1))}function o(e){var t=topojson.feature(e,e.objects.Bay_Area),a=t.features.filter(function(e){return"94560"===e.properties.GEOID10})[0];s(a)}function s(e,t){var a=h.centroid(e),n=v.translate();v.translate([n[0]-a[0]+u/2,n[1]-a[1]+f/2]),m.translate(v.translate()),t?y.selectAll("path").transition().duration(1e3).attr("d",h):y.selectAll("path").attr("d",h)}function l(){}function c(){v.translate(d3.event.translate).scale(d3.event.scale),y.selectAll("path").attr("d",h)}function d(){var e=(d3.select(".selected"),d3.select(".selected").datum()),t=h.bounds(e),a=(t[1][0]-t[0][0],t[1][1]-t[0][1],(t[0][0]+t[1][0])/2),n=(t[0][1]+t[1][1])/2,i=b,o=[u/2-i*a,f/2-i*n];y.transition().duration(750).call(m.translate(o).scale(i).event)}var r,p,u=650,f=1e3,g=39321.6,b=91750.4,v=d3.geo.albersUsa().scale(39321.6).translate([u/2,f/2]),h=d3.geo.path().projection(v),m=d3.behavior.zoom().translate(v.translate()).scale(v.scale()).scaleExtent([g,b]).on("zoom",c),C=d3.scale.quantize().range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]),y=d3.select(".right-side").append("svg").attr("width",u).attr("height",f).call(m),S=6,L="income",A=function(){var e,t={},a=topojson.feature(p,p.objects.Bay_Area);return a.features.forEach(function(a){for(e in a.properties)t[a.properties[e]]=!0}),Object.keys(t)},M=function(e){L=e},z=function(e){S=e},x=function(){var t=topojson.feature(p,p.objects.Bay_Area);C.domain(d3.extent(t.features,function(e){return a(e,r)})),e(C,L,S)},P=function(e){var t=a(e,r);return t?C(t):"#ccc"},D=function(){x(),y.selectAll("path").transition().duration(1e3).attr("fill",function(e){return P(e)})},B=function(e,t){var a,o,l,c,d=[],u=[],f=0,g=topojson.feature(p,p.objects.Bay_Area);g.features.forEach(function(a){a.properties[e]===t&&d.push(a)}),d.length>0&&(d3.selectAll(".selected").classed("selected",!1),d.forEach(function(e){for(o=e.properties.GEOID10,l=r[o][L],f=+l[0]>0?f+1:f,c=0;c<l.length;c++)u[c]=u[c]||0,u[c]+=+l[c]}),a=d.length>1?t:n(d[0]),d3.select(".tip-location").text(a),-1===S&&f>0&&(u[0]=(+u[0]/f).toFixed(0)),i(null,r,u)),y.selectAll("path")[0].forEach(function(a){a=d3.select(a),a.datum().properties[e]===t&&a.classed("selected",!0)}),d.length>0&&(u=d[0],s(u,!0))};return d3.json("data/allStats.json",function(e){r=e,d3.json("Bay_Area_Cities_topo.json",function(e){p=e;var t=[];x(),y.selectAll("path").data(topojson.feature(e,e.objects.Bay_Area).features).enter().append("path").attr("d",h).attr("stroke","black").attr("fill",function(e){return P(e)}).on("click",function(e){d3.selectAll(".selected").classed("selected",!1),d3.select(this).classed("selected",!0),d3.select(".tip-location").text(n(e)),i(e,r),t=[d3.event.x,d3.event.y]}).on("mousemove",l).append("svg:title").text(function(e){return n(e)}),o(e),d3.select(".right-side").on("click",function(){d3.event.x!==t[0]&&d3.event.y!==t[1]&&(d3.selectAll(".selected").classed("selected",!1),d3.select(".tip-info").classed("hidden",!0),d3.select(".tip-description").classed("hidden",!0),d3.select(".tip-location").text(""),d3.select(".tooltip-overlay").classed("hidden",!0)),t=[]})})}),t(pieLabelConfig,"income"),{getPropertyValues:A,setStatType:M,setStatIndex:z,updateStats:D,selectByData:B,zoomOut:d}}(createLegend,setPieLabels),getSelectionTitle=function(){var e=d3.select(".tip-location").text().split(":")[0];return e},selectByData=function(e){var t=e.match(/[0-9]/)?"GEOID10":"city";zipCodeMap.selectByData(t,e)};d3.select("#zoom-out").on("click",function(){window.event.stopPropagation(),zipCodeMap.zoomOut()});var gotoVoiceCommand=function(e){$("#select-input").val(e),selectByData(e)},showMeVoiceCommand=function(e){var t=0;"income"===e?t=0:"race"===e&&(t=1),$("#stat-list").val(t),$("#stat-list").trigger("change")},enableVoiceCommands=function(){var e={"go to *place":gotoVoiceCommand,"show me *stat":showMeVoiceCommand};annyang&&(console.log(annyang),annyang.start(),annyang.debug(),annyang.addCommands(e))};enableVoiceCommands(),$("#stat-list").on("change",function(){var e=+d3.select("#stat-list").node().value,t=+d3.select("#race-list").node().value,a=+d3.select("#birth-list").node().value,n=(+d3.select("#foreign-list").node().value,+d3.select("#age-list").node().value),i=+d3.select("#housing-list").node().value;d3.select("#race-list").classed("hidden",1!==e),d3.select("#asian-list").classed("hidden",1!==e||5!==t),d3.select("#birth-list").classed("hidden",2!==e),d3.select("#foreign-list").classed("hidden",2!==e||3!==a),d3.select("#age-list").classed("hidden",3!==e),d3.select("#housing-list").classed("hidden",4!==e),0===e?(zipCodeMap.setStatType("income"),zipCodeMap.setStatIndex(6),setPieLabels(pieLabelConfig,"income"),selectByData(getSelectionTitle())):1===e?5===t?selectAsian():(zipCodeMap.setStatType("race"),zipCodeMap.setStatIndex(t),setPieLabels(pieLabelConfig,"race"),selectByData(getSelectionTitle())):2===e?3===a?selectForeign():(zipCodeMap.setStatType("birth"),zipCodeMap.setStatIndex(a),setPieLabels(pieLabelConfig,"birth"),selectByData(getSelectionTitle())):3===e?(zipCodeMap.setStatType("age"),zipCodeMap.setStatIndex(n),setPieLabels(pieLabelConfig,"age"),selectByData(getSelectionTitle())):4===e&&(d3.select(".tooltip-overlay").classed("hidden",!1),zipCodeMap.setStatType(1===i?"sfr":"condo"),zipCodeMap.setStatIndex(-1),selectByData(getSelectionTitle())),zipCodeMap.updateStats()}),d3.select("#race-list").on("change",function(){var e=+d3.select("#race-list").node().value;d3.select("#asian-list").classed("hidden",5!==e),5===e?selectAsian():(zipCodeMap.setStatType("race"),zipCodeMap.setStatIndex(e),setPieLabels(pieLabelConfig,"race"),selectByData(getSelectionTitle())),zipCodeMap.updateStats()});var selectAsian=function(){var e=+d3.select("#asian-list").node().value;0===e?(zipCodeMap.setStatType("race"),zipCodeMap.setStatIndex(5),setPieLabels(pieLabelConfig,"race"),selectByData(getSelectionTitle())):(zipCodeMap.setStatType("asian"),zipCodeMap.setStatIndex(e),setPieLabels(pieLabelConfig,"asian"),selectByData(getSelectionTitle()))};d3.select("#asian-list").on("change",function(){selectAsian(),zipCodeMap.updateStats()});var selectForeign=function(){var e=+d3.select("#foreign-list").node().value;0===e?(zipCodeMap.setStatType("birth"),zipCodeMap.setStatIndex(3),setPieLabels(pieLabelConfig,"birth"),selectByData(getSelectionTitle())):(zipCodeMap.setStatType("foreign"),zipCodeMap.setStatIndex(e),setPieLabels(pieLabelConfig,"foreign"),selectByData(getSelectionTitle()))};d3.select("#foreign-list").on("change",function(){selectForeign(),zipCodeMap.updateStats()}),d3.select("#birth-list").on("change",function(){var e=+d3.select("#birth-list").node().value;d3.select("#foreign-list").classed("hidden",3!==e),3===e?selectForeign():(zipCodeMap.setStatType("birth"),zipCodeMap.setStatIndex(e),setPieLabels(pieLabelConfig,"birth"),selectByData(getSelectionTitle())),zipCodeMap.updateStats()}),d3.select("#age-list").on("change",function(){var e=+d3.select("#age-list").node().value;zipCodeMap.setStatType("age"),zipCodeMap.setStatIndex(e),setPieLabels(pieLabelConfig,"age"),selectByData(getSelectionTitle()),zipCodeMap.updateStats()}),d3.select("#housing-list").on("change",function(){var e=+d3.select("#housing-list").node().value;zipCodeMap.setStatType(1===e?"sfr":"condo"),zipCodeMap.setStatIndex(-1),selectByData(getSelectionTitle()),zipCodeMap.updateStats()}),d3.select("#select-button").on("click",function(){window.event.stopPropagation();var e=d3.select("#select-input").node().value,t=e.match(/[0-9]/)?"GEOID10":"city";zipCodeMap.selectByData(t,e)}),$("#select-input").on("propertychange",function(){window.event.stopPropagation(),window.event.preventDefault();var e=d3.select("#select-input").node().value,t=e.match(/[0-9]/)?"GEOID10":"city";return zipCodeMap.selectByData(t,e),!1}),$("#select-input").bind("input propertychange",function(e){e.stopPropagation(),window.event.preventDefault();var t=d3.select("#select-input").node().value,a=t.match(/[0-9]/)?"GEOID10":"city";return zipCodeMap.selectByData(a,t),!1}),$("#select-input").on("val.changed",function(e){e.stopPropagation();var t=d3.select("#select-input").node().value,a=t.match(/[0-9]/)?"GEOID10":"city";zipCodeMap.selectByData(a,t)}),$(document).ready(function(){$(window).keydown(function(e){return 13==e.keyCode?(e.preventDefault(),!1):void 0})}),$("#select-input").autoComplete({minChars:1,source:function(e,t){e=e.toLowerCase();var a,n=zipCodeMap.getPropertyValues(),i=[];for(a=0;a<n.length;a++)~n[a].toLowerCase().indexOf(e)&&i.push(n[a]);t(i)}});