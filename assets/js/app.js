var exports;

function AgentModule(){
  this.agents = [];
  this.addAgents = function(url, state, ipaddress, path, resource){
    var agent = {
      url: url,
      state: state,
      ipaddress: ipaddress,
      path: path,
      resource: resource
    }
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
}
