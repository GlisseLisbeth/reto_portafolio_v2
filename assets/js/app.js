var exports;

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

if(exports != undefined){
  exports.AgentModule = AgentModule;
  exports.Agent = Agent;
}
