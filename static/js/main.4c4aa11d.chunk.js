(this["webpackJsonpxstate-react-typescript-template"]=this["webpackJsonpxstate-react-typescript-template"]||[]).push([[0],{24:function(t,e,n){},35:function(t,e,n){"use strict";n.r(e);var o=n(23),a=n(10),r=(n(24),n(7),n(20)),c=n(4),i=n(41),s=n(40),p=n(39);function m(t){return Object(c.k)((e=>({type:"SPEAK",value:t})))}function l(){return Object(c.k)("LISTEN")}const d={John:{person:"John Appleseed"},Monica:{person:"Monica Svensson"},Sven:{person:"Sven Svensson"},Jack:{person:"Jack Svensson"}},y={"on Monday":{day:"Monday"},"on Tuesday":{day:"Tuesday"},"on Wednesday":{day:"Wednesday"},"on Thursday":{day:"Thursday"},"on Friday":{day:"Friday"},"on Saturday":{day:"Saturday"},"on Sunday":{day:"Sunday"}},u={yes:{whole_day:!0},no:{whole_day:!1},"whole day":{whole_day:!0},"of course":{whole_day:!0},"no way":{whole_day:!1}},h={"at 8":{time:"8:00"},"at 9":{time:"9:00"},"at 11":{time:"11:00"},"at 10":{time:"10:00"},"at 12":{time:"12:00"},"at 13":{time:"13:00"},"at 14":{time:"14:00"},"at 15":{time:"15:00"},"at 16":{time:"16:00"},"at 17":{time:"17:00"},"at 18":{time:"18:00"}},E={yes:{confirm:!0},confirm:{confirm:!0},no:{confirm:!1},"start over":{confirm:!1}},g={initial:"welcome",id:"appointmentMachine",states:{startover:{entry:m("Ok. starting over."),on:{ENDSPEECH:"welcome"}},stop:{entry:m("Ok. Going back to the root menu."),always:"#root.dm.IntentMachine.welcome"},welcome:{initial:"prompt",on:{ENDSPEECH:"who"},states:{prompt:{entry:m("Let's create an appointment")}}},who:{initial:"prompt",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"welcome",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"person"in(d[t.recResult]||{}),actions:Object(c.b)((t=>({person:d[t.recResult].person}))),target:"day"},{target:".nomatch"}]},states:{prompt:{entry:m("Who are you meeting with?"),on:{ENDSPEECH:"ask"}},ask:{entry:l()},nomatch:{entry:m("Sorry I don't know them. Say for example Monica"),on:{ENDSPEECH:"prompt"}}}},day:{initial:"repeat",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"who",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"day"in(y[t.recResult]||{}),actions:Object(c.b)((t=>({day:y[t.recResult].day}))),target:"whole_day"},{target:".nomatch"}]},states:{repeat:{entry:Object(c.k)((t=>({type:"SPEAK",value:"OK. Meeting with ".concat(t.person,".")}))),on:{ENDSPEECH:"prompt"}},prompt:{entry:Object(c.k)((t=>({type:"SPEAK",value:" On which day is your meeting? "}))),on:{ENDSPEECH:"ask"}},ask:{entry:l()},nomatch:{entry:m("Sorry I don't understand which day you mean. Say for example on Tuesday"),on:{ENDSPEECH:"prompt"}}}},whole_day:{initial:"repeat",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"day",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"whole_day"in(u[t.recResult]||{}),actions:Object(c.b)((t=>({whole_day:u[t.recResult].whole_day}))),target:".choose"},{target:".nomatch"}]},states:{repeat:{entry:Object(c.k)((t=>({type:"SPEAK",value:"OK. Meeting with ".concat(t.person," on ").concat(t.day,".")}))),on:{ENDSPEECH:"prompt"}},prompt:{entry:Object(c.k)((t=>({type:"SPEAK",value:" Will it take the whole day?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:l()},choose:{on:{"":[{target:"#appointmentMachine.time",cond:t=>!1===t.whole_day},{target:"#appointmentMachine.confirm_without_time"}]}},nomatch:{entry:m("Sorry I don't understand. Say yes or no."),on:{ENDSPEECH:"prompt"}}}},time:{initial:"repeat",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"whole_day",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"time"in(h[t.recResult]||{}),actions:Object(c.b)((t=>({time:h[t.recResult].time}))),target:"confirm_with_time"},{target:".nomatch"}]},states:{repeat:{entry:Object(c.k)((t=>({type:"SPEAK",value:"OK. "}))),on:{ENDSPEECH:"prompt"}},prompt:{entry:Object(c.k)((t=>({type:"SPEAK",value:"What time is your meeting?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:l()},nomatch:{entry:m("Sorry I don't understand which time you mean. Say for example at eleven"),on:{ENDSPEECH:"prompt"}}}},confirm_without_time:{initial:"prompt",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"whole_day",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"confirm"in(E[t.recResult]||{}),actions:Object(c.b)((t=>({confirm:E[t.recResult].confirm}))),target:".choose"},{target:".nomatch"}]},states:{prompt:{entry:Object(c.k)((t=>({type:"SPEAK",value:"Do you want me to creat an appointment with ".concat(t.person," on ").concat(t.day," for the whole day?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:l()},choose:{on:{"":[{target:"#appointmentMachine.final",cond:t=>!0===t.confirm},{target:"#appointmentMachine.who",cond:t=>!1===t.confirm}]}},nomatch:{entry:m("Sorry I don't understand. Say yes or no."),on:{ENDSPEECH:"prompt"}}}},confirm_with_time:{initial:"prompt",on:{RECOGNISED:[{target:"stop",cond:t=>"stop"===t.recResult},{target:"time",cond:t=>"go back"===t.recResult},{target:"startover",cond:t=>"start over"===t.recResult},{cond:t=>"confirm"in(E[t.recResult]||{}),actions:Object(c.b)((t=>({confirm:E[t.recResult].confirm}))),target:".choose"},{target:".nomatch"}]},states:{prompt:{entry:Object(c.k)((t=>({type:"SPEAK",value:"Do you want me to creat an appointment with ".concat(t.person," on ").concat(t.day," at ").concat(t.time,"?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:l()},choose:{on:{"":[{target:"#appointmentMachine.final",cond:t=>!0===t.confirm},{target:"#appointmentMachine.who",cond:t=>!1===t.confirm}]}},nomatch:{entry:m("Sorry I don't understand. Say yes or no."),on:{ENDSPEECH:"prompt"}}}},final:{initial:"prompt",states:{prompt:{type:"final",entry:m("Your appointment has been created!")}}}}},S={initial:"welcome",id:"TODOitem",states:{welcome:{initial:"prompt",states:{prompt:{entry:m("Choose an item to do.")}}}}},b={initial:"welcome",id:"Timer",states:{welcome:{initial:"prompt",states:{prompt:{entry:m("Let's set a timer.")}}}}};var O=n(19),w=n(12);function j(t){return Object(c.k)((e=>({type:"SPEAK",value:t})))}Object(p.a)({url:"https://statecharts.io/inspect",iframe:!1});const R=Object(i.a)({id:"root",type:"parallel",states:{dm:{initial:"init",id:"main",states:{init:{on:{CLICK:"IntentMachine"}},IntentMachine:{id:"intent",initial:"welcome",context:{text:void 0,intent:void 0,error:void 0},states:{welcome:{initial:"prompt",on:{ENDSPEECH:"intent"},states:{prompt:{entry:j("Welcome!")}}},intent:{initial:"prompt",on:{RECOGNISED:[{actions:Object(c.b)((t=>({text:t.recResult}))),target:"loading"}]},states:{prompt:{entry:j("What would you like to do?"),on:{ENDSPEECH:"ask"}},ask:{entry:Object(c.k)("LISTEN")}}},loading:{invoke:{id:"getIntent",src:t=>f(t.text),onDone:{target:"success",actions:Object(c.b)({intent:(t,e)=>e.data})},onError:{target:"failure",actions:Object(c.b)({error:(t,e)=>e.data})}}},success:{on:{"":[{target:"more_info",cond:t=>t.intent.intent.confidence<.7},{target:"#root.dm.dmAppointment",cond:t=>"Appointment"===t.intent.intent.name},{target:"#root.dm.TODOitem",cond:t=>"TODOitem"===t.intent.intent.name},{target:"#root.dm.Timer",cond:t=>"Timer"===t.intent.intent.name},{target:"more_info"}]}},failure:{entry:j("I can't figure out what you want me to do."),on:{ENDSPEECH:"intent"}},more_info:{entry:j("I'm not very sure about your intent. Try to specify it."),on:{ENDSPEECH:"intent"}}}},dmAppointment:Object(a.a)({},g),TODOitem:Object(a.a)({},S),Timer:Object(a.a)({},b)}},asrtts:{initial:"idle",states:{idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(c.b)(((t,e)=>({ttsAgenda:e.value})))}}},recognising:{entry:"recStart",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(c.b)(((t,e)=>({recResult:e.value})))],target:".match"},RECOGNISED:"idle"},states:{match:{entry:Object(c.k)("RECOGNISED")}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle"}}}}}},{actions:{recLogResult:t=>{console.log("<< ASR: "+t.recResult)},test:()=>{console.log("test")},logIntent:t=>{console.log("<< NLU intent: "+t.nluData.intent.name)}}}),k=t=>{switch(!0){case t.state.matches({asrtts:"recognising"}):return Object(w.jsx)("button",Object(a.a)(Object(a.a)({type:"button",className:"glow-on-hover",style:{animation:"glowing 20s linear"}},t),{},{children:"Listening..."}));case t.state.matches({asrtts:"speaking"}):return Object(w.jsx)("button",Object(a.a)(Object(a.a)({type:"button",className:"glow-on-hover",style:{animation:"bordering 1s infinite"}},t),{},{children:"Speaking..."}));default:return Object(w.jsx)("button",Object(a.a)(Object(a.a)({type:"button",className:"glow-on-hover"},t),{},{children:"Click to start"}))}};function v(){const t=Object(O.useSpeechSynthesis)({onEnd:()=>{l("ENDSPEECH")}}),e=t.speak,n=t.cancel,a=(t.speaking,Object(O.useSpeechRecognition)({onResult:t=>{l({type:"ASRRESULT",value:t})}})),r=a.listen,c=(a.listening,a.stop),i=Object(s.b)(R,{devTools:!0,actions:{recStart:Object(s.a)((()=>{console.log("Ready to receive a color command."),r({interimResults:!1,continuous:!0})})),recStop:Object(s.a)((()=>{console.log("Recognition stopped."),c()})),changeColour:Object(s.a)((t=>{console.log("Repainting..."),document.body.style.background=t.recResult})),ttsStart:Object(s.a)(((t,n)=>{console.log("Speaking..."),e({text:t.ttsAgenda})})),ttsCancel:Object(s.a)(((t,e)=>{console.log("TTS STOP..."),n()}))}}),p=Object(o.a)(i,3),m=p[0],l=p[1];p[2];return Object(w.jsx)("div",{className:"App",children:Object(w.jsx)(k,{state:m,onClick:()=>l("CLICK")})})}const f=t=>fetch(new Request("https://cors-anywhere.herokuapp.com/https://lt2216-a2.herokuapp.com/model/parse",{method:"POST",headers:{Origin:"http://maraev.me"},body:'{"text": "'.concat(t,'"}')})).then((t=>t.json())),C=document.getElementById("root");r.render(Object(w.jsx)(v,{}),C)}},[[35,1,2]]]);
//# sourceMappingURL=main.4c4aa11d.chunk.js.map