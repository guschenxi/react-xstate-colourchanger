
export const grammar = `
<grammar root="final">
   <rule id="final">
      <ruleref uri="#please"/>
      <one-of>
         <item>
            <ruleref uri="#action1"/>
            <ruleref uri="#articleword"/>
            <ruleref uri="#object1"/>
            <tag>out = new Object(); out.object=rules.object1; out.action=rules.action1;</tag>
         </item>
         <item>
            <ruleref uri="#action2"/>
            <ruleref uri="#articleword"/>
            <ruleref uri="#object2"/>
            <tag>out = new Object(); out.object=rules.object2; out.action=rules.action2;</tag>
         </item>
      </one-of>
      <item repeat="0-1">please</item>
   </rule>

   <rule id="object1">
      <one-of> 
         <item> light </item>
         <item> heat </item>
         <item> A C <tag> out = 'air conditioning'; </tag></item>
         <item> air conditioning </item>
      </one-of>
   </rule>
   <rule id="object2">
      <one-of> 
         <item> window </item>
         <item> door </item>
      </one-of>
   </rule>

   <rule id="action1">
      <one-of>
         <item>turn on<tag>out="on";</tag></item>
         <item>turn off<tag>out="off";</tag></item>
      </one-of>
   </rule>
   <rule id="action2">
      <one-of>
         <item>open<tag>out="on";</tag></item>
         <item>close<tag>out="off";</tag></item>
      </one-of>
   </rule>

   <rule id="articleword">
      <item repeat="0-1">the</item>
   </rule>

   <rule id="please">
      <item repeat="0-1">
         <one-of>
            <item>please</item>
            <item>would you please</item>
            <item>can you please</item>
            <item>can you</item>
            <item>can you help me to</item>
         </one-of>
      </item>
   </rule>

</grammar>
`
