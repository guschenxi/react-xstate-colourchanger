export const grammar = `
<grammar root="final">
   <rule id="final">
      <one-of>
         <item>to <ruleref uri="#do"/> is to <ruleref uri="#be"/><tag>out="Socrates";</tag> </item>
         <item>to <ruleref uri="#be"/> is to <ruleref uri="#do"/><tag>out="Sartre";</tag> </item>
         <item><ruleref uri="#do"/><ruleref uri="#be"/><ruleref uri="#do"/><ruleref uri="#be"/><ruleref uri="#do"/><tag>out="Sinatra";</tag></item>
         <item>mushrooms</item>
      </one-of>
   </rule>

   <rule id="do">
      <one-of>
         <item>do</item>
      </one-of>
   </rule>

   <rule id="be">
      <one-of>
         <item>be</item>
      </one-of>
   </rule>

</grammar>
`
