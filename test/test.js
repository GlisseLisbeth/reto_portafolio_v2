var assert = require('assert');
var appTest = require('../assets/js/appAgent.js');
describe("Agents app test", function(){

  var agentModule;
  beforeEach(function(){
    agentModule = new appTest.AgentModule();
  });

  it("addAgents allow you to add agents to the set", function(){
    var countAgents = agentModule.agents.length;
    agentModule.addAgents("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent","ubuntu,firefox3,core-duo" );
    assert.equal(countAgents+1,agentModule.agents.length);
  });

  it("Given a list of agents must be able print",function(){
    agentModule.agents = [];
    agentModule.addAgents("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    var expected = "bjstdmngbgr02.thoughtworks.com|<span>idle|</span><span>192.168.1.2|</span>/var/lib/cruise-agent";
    assert.equal(expected, agentModule.getArray());
  });
});
