var exports;
var stateEliminate = false;
function Agent(url, state, ipaddress, path){
  this.url = url;
  this.state = state;
  this.ipaddress = ipaddress;
  this.path = path;
  this.resources =[];
  this.addElement = function(resource){
    this.resources.push(resource);
  }
  this.deleteElement = function(nameToSearch){
    var position = this.resources.indexOf(nameToSearch);
    this.resources.splice(position,1);
    return stateEliminate = true;
  }
}

function AgentModule(){
  this.agents = [];
  this.addAgents = function(agent){
    this.agents.push(agent);
  }
  this.getArray = function(){
    var all=[];
    this.agents.forEach(function(e){
      all.push(e.url+"|<span>"+e.state+"|</span><span>"+e.ipaddress+"|</span>"+e.path);
    });
    return all;
  }
}

getPosition = function(arrHeaders,element){
  return arrHeaders.map(function(elem,i) {
    return(elem==element)?i:-1;
  }).reduce(function(ant,act){
    return (ant==-1)?act:ant;
  });
}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });
  if(exports != undefined){
    exports.AgentModule = AgentModule;
    exports.Agent = Agent;
  }
