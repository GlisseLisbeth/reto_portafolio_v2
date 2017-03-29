var assert = require('assert');
var appTest = require('../assets/js/app.js');
describe("Agents app test", function(){

  var agentModule;
  beforeEach(function(){
    agentModule = new appTest.AgentModule();
  });

  it("addAgents allow you to add agents to the set", function(){
    var countAgents = agentModule.agents.length
    var agent = new appTest.Agent("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent","ubuntu,firefox3,core-duo");
    agentModule.addAgents(agent);
    assert.equal(countAgents+1,agentModule.agents.length);
  });

  it("Given a list of agents must be able print",function(){
    agentModule.agents = [];
    var agent = new appTest.Agent("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent","ubuntu,firefox3,core-duo" );
    agentModule.addAgents(agent);
    var expected = "bjstdmngbgr02.thoughtworks.com|<span>idle|</span><span>192.168.1.2|</span>/var/lib/cruise-agent";
     assert.equal(expected, agentModule.getArray());
  });

  it("addResource allow you to add resources  to the set in determinate agent", function(){
    agentModule.agents = [];
    var agent = new appTest.Agent("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent);
    var agent1 = new appTest.Agent("bjstdmngbgr03.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent1);
    var agent2 = new appTest.Agent("bjstdmngbgr04.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent2);
    var arrayAgent = agentModule.getArray();
    //get the selected item from dom
    var element= "bjstdmngbgr03.thoughtworks.com|<span>idle|</span><span>192.168.1.2|</span>/var/lib/cruise-agent";
    agentModule.agents.resources = [];
    var position = arrayAgent.map(function(e,i) {
      return(e==element)?i:-1;
    }).reduce(function(ant,act){
      return (ant==-1)?act:ant;
    });
    var agentPos = agentModule.agents[position];
    var countResource=agentPos.resources.length;
    agentPos.addElement("core-duo");
    assert.equal(countResource+1, agentPos.resources.length)
  });

  it("deleteResource allow you to delete resource  to the set in determinate agent", function(){
    agentModule.agents = [];
    var agent = new appTest.Agent("bjstdmngbgr02.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent);
    var agent1 = new appTest.Agent("bjstdmngbgr03.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent1);
    var agent2 = new appTest.Agent("bjstdmngbgr04.thoughtworks.com","idle","192.168.1.2", "/var/lib/cruise-agent");
    agentModule.addAgents(agent2);
    var arrayAgent = agentModule.getArray();
    //get the selected item from dom
    var element= "bjstdmngbgr03.thoughtworks.com";
    agentModule.agents.resources = [];
    var position = agentModule.agents.map(function(e,i) {
      return(e.url==element)?i:-1;
    }).reduce(function(ant,act){
      return (ant==-1)?act:ant;
    });
    var agentPos = agentModule.agents[position];
    var countResource=agentPos.resources.length;
    agentPos.addElement("core-duo");
    //delete resource
    agentPos.deleteElement("core-duo");
    assert.equal(countResource, agentPos.resources.length)
  });
});
